import { cookies } from 'next/headers';

// Simple admin authentication
// In production, use a proper auth system like NextAuth.js

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // In production, use env variable

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_auth');

    if (!authCookie) {
      return false;
    }

    // In production, verify JWT token or session from database
    // For now, simple check
    return authCookie.value === 'authenticated';
  } catch (error) {
    console.error('[admin-auth] Error checking authentication:', error);
    return false;
  }
}

export async function authenticateAdmin(password: string): Promise<boolean> {
  if (password === ADMIN_PASSWORD) {
    try {
      const cookieStore = await cookies();
      cookieStore.set({
        name: 'admin_auth',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
      return true;
    } catch (error) {
      console.error('[admin-auth] Error setting auth cookie:', error);
      return false;
    }
  }

  return false;
}

export async function logoutAdmin(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin_auth');
  } catch (error) {
    console.error('[admin-auth] Error logging out:', error);
  }
}
