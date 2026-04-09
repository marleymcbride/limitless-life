import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

// ============================================================================
// SECURE ADMIN AUTHENTICATION
// ============================================================================
// This implements proper authentication using:
// - Cryptographically signed JWT tokens
// - Server-side secret key
// - Token expiration
// - Secure cookie configuration
//
// To use: Set ADMIN_PASSWORD environment variable to a strong password
// ============================================================================

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

function validateConfig() {
  if (!ADMIN_PASSWORD) {
    throw new Error(
      'ADMIN_PASSWORD environment variable is not set. ' +
      'Please set a strong password before starting the server.'
    );
  }
}

// Secret key for signing tokens - should be set in production
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || ADMIN_PASSWORD // Fallback to ADMIN_PASSWORD for development
);

// Token expiration time (24 hours)
const TOKEN_EXPIRATION = '24h';

// Token issuer
const ISSUER = 'limitless-life-admin';

interface AdminTokenPayload {
  isAdmin: true;
  iat: number;
  exp: number;
  iss: string;
}

/**
 * Create a signed JWT token for admin authentication
 */
async function createAdminToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const token = await new SignJWT({ isAdmin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setIssuer(ISSUER)
    .setExpirationTime(now + 60 * 60 * 24) // 24 hours from now
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify and decode an admin JWT token
 */
async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: ISSUER,
    });

    // Check if the token has the admin claim
    return (payload as AdminTokenPayload).isAdmin === true;
  } catch (error) {
    console.error('[admin-auth] Token verification failed:', error);
    return false;
  }
}

/**
 * Check if the current request has valid admin authentication
 * Reads and verifies the JWT token from the httpOnly cookie
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    validateConfig();
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_auth');

    if (!authCookie) {
      return false;
    }

    // The cookie value should be a JWT token
    return await verifyAdminToken(authCookie.value);
  } catch (error) {
    console.error('[admin-auth] Error checking authentication:', error);
    return false;
  }
}

/**
 * Authenticate an admin user with password
 * On success, sets a secure httpOnly cookie with a signed JWT token
 */
export async function authenticateAdmin(password: string): Promise<boolean> {
  validateConfig();

  // Use constant-time comparison to prevent timing attacks
  if (password.length !== ADMIN_PASSWORD.length) {
    return false;
  }

  // Constant-time comparison
  const passwordBuffer = Buffer.from(password);
  const adminPasswordBuffer = Buffer.from(ADMIN_PASSWORD);

  let result = 0;
  for (let i = 0; i < passwordBuffer.length; i++) {
    result |= passwordBuffer[i] ^ adminPasswordBuffer[i];
  }

  if (result !== 0) {
    return false; // Passwords don't match
  }

  // Password matches - create and set the JWT token
  try {
    const token = await createAdminToken();
    const cookieStore = await cookies();

    cookieStore.set({
      name: 'admin_auth',
      value: token, // Store the JWT token
      httpOnly: true, // Not accessible via JavaScript (prevents XSS)
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CSRF protection
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      // Add priority for modern browsers
      priority: 'high',
    });

    return true;
  } catch (error) {
    console.error('[admin-auth] Error setting auth cookie:', error);
    return false;
  }
}

/**
 * Log out the current admin user by removing the auth cookie
 */
export async function logoutAdmin(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin_auth');
  } catch (error) {
    console.error('[admin-auth] Error logging out:', error);
  }
}
