# Legacy Code Refactoring Guide

## Overview

This guide provides strategies and best practices for refactoring legacy code in the Limitless Life application, ensuring maintainability, type safety, and performance.

## Refactoring Principles

### 1. DRY (Don't Repeat Yourself)

**Problem**: Duplicate logic across multiple files

**Solution**: Extract shared logic into utilities

```typescript
// ❌ Before: Duplicate validation in multiple files
function validateEmail1(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateEmail2(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ✅ After: Single validation function
import { validateEmail } from '@/lib/errorHandler';
validateEmail(email);
```

### 2. Single Responsibility Principle

**Problem**: Functions do too many things

**Solution**: Split into focused, testable units

```typescript
// ❌ Before: Function does multiple things
async function processUser(userId: string) {
  const user = await db.select().from(users).where(eq(users.id, userId));
  const score = calculateScore(user[0]);
  await updateScore(userId, score);
  sendEmail(user[0].email);
  triggerWebhook(user[0]);
}

// ✅ After: Separate concerns
async function getUser(userId: string) {
  const user = await db.select().from(users).where(eq(users.id, userId));
  return user[0];
}

async function processUserScore(userId: string) {
  const user = await getUser(userId);
  const score = calculateScore(user);
  await updateScore(userId, score);
  return score;
}

async function notifyUser(user: User) {
  await sendEmail(user.email);
  await triggerWebhook(user);
}
```

### 3. Type Safety First

**Problem**: Using `any` or loose types

**Solution**: Use proper TypeScript types

```typescript
// ❌ Before: Using any
function processData(data: any) {
  return data.value * 2;
}

// ✅ After: Proper types
interface Data {
  value: number;
}

function processData(data: Data): number {
  return data.value * 2;
}
```

### 4. Error Handling

**Problem**: Silent failures or generic errors

**Solution**: Explicit error types and handling

```typescript
// ❌ Before: Silent failure
function getUser(id: string) {
  try {
    return db.query(`SELECT * FROM users WHERE id = ${id}`);
  } catch {
    return null;
  }
}

// ✅ After: Explicit error handling
import { NotFoundError, logError } from '@/lib/errorHandler';

async function getUser(id: string): Promise<User> {
  try {
    const user = await db.select().from(users).where(eq(users.id, id));
    if (!user) {
      throw new NotFoundError('User', id);
    }
    return user;
  } catch (error) {
    logError(error, 'getUser');
    throw error;
  }
}
```

## Refactoring Checklist

### Before Refactoring

- [ ] Add tests for existing behavior
- [ ] Create feature branch
- [ ] Document current behavior
- [ ] Identify refactoring scope

### During Refactoring

- [ ] Make small, incremental changes
- [ ] Run tests after each change
- [ ] Maintain backward compatibility
- [ ] Update types as you go
- [ ] Add JSDoc comments for public APIs

### After Refactoring

- [ ] All tests pass
- [ ] No new linting errors
- [ ] Performance is not degraded
- [ ] Update documentation
- [ ] Code review completed

## Common Refactoring Patterns

### Extract Function

**When**: Function is too long or does multiple things

**How**:
1. Identify cohesive block of code
2. Extract to new function
3. Give it a descriptive name
4. Add proper types
5. Update tests

```typescript
// ❌ Before: Long function
function processPayment(data: any) {
  // Validate
  if (!data.email) throw new Error('No email');
  if (!data.amount) throw new Error('No amount');

  // Process
  const payment = await stripe.charges.create({
    amount: data.amount * 100,
    currency: 'usd',
    source: data.source,
  });

  // Update database
  await db.insert(payments).values({
    email: data.email,
    amount: data.amount,
    stripeId: payment.id,
  });

  // Send notification
  await sendEmail(data.email, 'Payment received');
  await webhook({ paymentId: payment.id });

  return payment;
}

// ✅ After: Extracted functions
async function processPayment(data: PaymentData): Promise<Payment> {
  validatePaymentData(data);
  const payment = await createStripeCharge(data);
  await recordPayment(payment, data.email);
  await notifyPaymentSuccess(payment, data.email);
  return payment;
}

function validatePaymentData(data: PaymentData): void {
  if (!data.email) throw new ValidationError('Email required');
  if (!data.amount) throw new ValidationError('Amount required');
}

async function createStripeCharge(data: PaymentData): Promise<StripePayment> {
  return await stripe.charges.create({
    amount: data.amount * 100,
    currency: 'usd',
    source: data.source,
  });
}

async function recordPayment(payment: StripePayment, email: string): Promise<void> {
  await db.insert(payments).values({
    email,
    amount: payment.amount / 100,
    stripeId: payment.id,
  });
}

async function notifyPaymentSuccess(payment: StripePayment, email: string): Promise<void> {
  await Promise.all([
    sendEmail(email, 'Payment received'),
    webhook({ paymentId: payment.id }),
  ]);
}
```

### Introduce Parameter Object

**When**: Function has too many parameters

**How**:
1. Group related parameters
2. Create interface for parameters
3. Update function signature
4. Update call sites

```typescript
// ❌ Before: Too many parameters
function createUser(
  email: string,
  firstName: string,
  lastName: string,
  age: number,
  address: string,
  city: string,
  state: string,
  zip: string
) {
  // ...
}

// ✅ After: Parameter object
interface CreateUserParams {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

function createUser(params: CreateUserParams): User {
  // ...
}
```

### Replace Magic Numbers with Constants

**When**: Hard-coded values without meaning

**How**:
1. Identify magic numbers
2. Create named constants
3. Replace magic numbers
4. Add explanatory comments

```typescript
// ❌ Before: Magic numbers
if (score > 70) {
  status = 'hot';
} else if (score > 40) {
  status = 'warm';
} else {
  status = 'cold';
}

setTimeout(() => {
  retry();
}, 1000);

// ✅ After: Named constants
const LEAD_SCORE_HOT_THRESHOLD = 70;
const LEAD_SCORE_WARM_THRESHOLD = 40;
const RETRY_DELAY_MS = 1000;

if (score > LEAD_SCORE_HOT_THRESHOLD) {
  status = 'hot';
} else if (score > LEAD_SCORE_WARM_THRESHOLD) {
  status = 'warm';
} else {
  status = 'cold';
}

setTimeout(() => {
  retry();
}, RETRY_DELAY_MS);
```

### Replace Conditional with Polymorphism

**When**: Complex conditional logic based on type

**How**:
1. Identify type-specific behavior
2. Create interface/base class
3. Implement for each type
4. Replace conditionals with method calls

```typescript
// ❌ Before: Complex conditionals
function sendNotification(user: User, message: string) {
  if (user.preferences.notificationType === 'email') {
    sendEmail(user.email, message);
  } else if (user.preferences.notificationType === 'sms') {
    sendSMS(user.phone, message);
  } else if (user.preferences.notificationType === 'push') {
    sendPush(user.deviceToken, message);
  }
}

// ✅ After: Polymorphism
interface NotificationChannel {
  send(message: string): Promise<void>;
}

class EmailChannel implements NotificationChannel {
  constructor(private email: string) {}

  async send(message: string): Promise<void> {
    await sendEmail(this.email, message);
  }
}

class SMSChannel implements NotificationChannel {
  constructor(private phone: string) {}

  async send(message: string): Promise<void> {
    await sendSMS(this.phone, message);
  }
}

class PushChannel implements NotificationChannel {
  constructor(private deviceToken: string) {}

  async send(message: string): Promise<void> {
    await sendPush(this.deviceToken, message);
  }
}

function getNotificationChannel(user: User): NotificationChannel {
  switch (user.preferences.notificationType) {
    case 'email':
      return new EmailChannel(user.email);
    case 'sms':
      return new SMSChannel(user.phone);
    case 'push':
      return new PushChannel(user.deviceToken);
    default:
      return new EmailChannel(user.email);
  }
}

async function sendNotification(user: User, message: string): Promise<void> {
  const channel = getNotificationChannel(user);
  await channel.send(message);
}
```

### Decompose Conditional

**When**: Complex nested conditionals

**How**:
1. Extract condition to function with descriptive name
2. Use early returns
3. Simplify logic

```typescript
// ❌ Before: Nested conditionals
function calculateDiscount(user: User, cart: Cart): number {
  if (user) {
    if (user.isPremium) {
      if (cart.total > 100) {
        return 0.2;
      } else {
        return 0.1;
      }
    } else {
      if (cart.total > 100) {
        return 0.05;
      } else {
        return 0;
      }
    }
  } else {
    return 0;
  }
}

// ✅ After: Decomposed with early returns
function calculateDiscount(user: User, cart: Cart): number {
  if (!user) return 0;

  if (user.isPremium) {
    return cart.total > 100 ? 0.2 : 0.1;
  }

  return cart.total > 100 ? 0.05 : 0;
}
```

## File Organization

### Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── page.tsx        # Pages
│   └── layout.tsx      # Layouts
├── components/         # React components
│   ├── lazy/          # Lazy-loaded components
│   ├── admin/         # Admin components
│   └── *.tsx          # Feature components
├── lib/              # Utilities and libraries
│   ├── db.ts         # Database client
│   ├── analytics.ts  # Analytics functions
│   └── *.ts          # Other utilities
├── types/            # Type definitions
│   ├── index.ts     # Export all types
│   └── *.ts         # Type files
└── hooks/           # React hooks
    └── *.ts         # Custom hooks
```

### Naming Conventions

- **Files**: kebab-case (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions**: camelCase (`calculateScore`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_ATTEMPTS`)
- **Types/Interfaces**: PascalCase (`UserProfile`)
- **Enums**: PascalCase (`UserStatus`)

## Code Quality Standards

### TypeScript Strict Mode

Enable strict mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### ESLint Configuration

```javascript
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
```

### Prettier Configuration

```javascript
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
};
```

## Documentation Standards

### JSDoc Comments

```typescript
/**
 * Calculate lead score based on user events
 *
 * @param userId - User ID to calculate score for
 * @returns Lead score with temperature classification
 * @throws {NotFoundError} If user doesn't exist
 * @example
 * ```typescript
 * const score = await calculateLeadScore('user-123');
 * console.log(score.temperature); // 'hot'
 * ```
 */
async function calculateLeadScore(userId: string): Promise<LeadScore> {
  // Implementation
}
```

### Function Documentation

Every public function should have:
1. Description of what it does
2. @param tags for parameters
3. @returns tag for return type
4. @throws if it throws errors
5. @example if applicable

### Complex Logic Documentation

```typescript
/**
 * Lead Scoring Algorithm
 *
 * Scores are calculated based on weighted event types:
 * - VSL complete: 60 points (high intent)
 * - Application: 30-40 points (active engagement)
 * - Email submit: 10 points (initial interest)
 * - VSL milestones: 0-50 points (based on percentage)
 *
 * Temperature Classification:
 * - Hot: ≥70 points (ready to buy)
 * - Warm: ≥40 points (nurture needed)
 * - Cold: <40 points (early stage)
 *
 * @see {@link https://linear.app/evlv-fitness/issue/EVL-24 | Lead Scoring System}
 */
```

## Testing Strategy

### Unit Tests

Test individual functions in isolation:

```typescript
describe('calculateLeadScore', () => {
  it('should return hot temperature for score ≥70', () => {
    const result = calculateLeadScore([
      { eventType: 'vsl_complete', value: 60 },
      { eventType: 'email_submit', value: 10 },
    ]);
    expect(result.temperature).toBe('hot');
  });
});
```

### Integration Tests

Test multiple components working together:

```typescript
describe('Payment Flow', () => {
  it('should process payment and update user status', async () => {
    const user = await createUser(testUserData);
    const payment = await processPayment({ userId: user.id, amount: 100 });

    const updatedUser = await getUser(user.id);
    expect(updatedUser.status).toBe('customer');
  });
});
```

### E2E Tests

Test complete user flows:

```typescript
test('complete user journey', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="vsl-play"]');
  // ... complete flow
});
```

## Performance Considerations

### Avoid Unnecessary Re-renders

```typescript
// ✅ Use React.memo for expensive components
export const ExpensiveChart = React.memo(function ExpensiveChart({ data }: Props) {
  // ...
});

// ✅ Use useMemo for expensive calculations
const chartData = useMemo(() => {
  return processChartData(rawData);
}, [rawData]);

// ✅ Use useCallback for stable function references
const handleClick = useCallback(() => {
  // ...
}, [dependency]);
```

### Database Query Optimization

```typescript
// ❌ Before: N+1 query problem
for (const user of users) {
  const events = await db.select().from(events).where(eq(events.userId, user.id));
}

// ✅ After: Single query with join
const usersWithEvents = await db
  .select()
  .from(users)
  .leftJoin(events, eq(users.id, events.userId));
```

### Lazy Loading

```typescript
// ✅ Lazy load heavy dependencies
const heavyLibrary = lazy(() => import('heavy-library'));

function Component() {
  return (
    <Suspense fallback={<Loading />}>
      <heavyLibrary.Component />
    </Suspense>
  );
}
```

## Migration Path

### Phase 1: Add Types

1. Start with `any` types
2. Gradually add proper types
3. Enable `noImplicitAny` rule
4. Fix type errors

### Phase 2: Extract Utilities

1. Identify duplicate code
2. Extract to shared utilities
3. Add proper error handling
4. Add tests

### Phase 3: Refactor Components

1. Break down large components
2. Extract custom hooks
3. Add prop types
4. Optimize performance

### Phase 4: Documentation

1. Add JSDoc comments
2. Document complex logic
3. Create README files
4. Update architecture docs

## Refactoring Anti-Patterns

### Don't:

1. **Refactor without tests**: You'll break things
2. **Refactor everything at once**: Do it incrementally
3. **Change API contracts**: Maintain backward compatibility
4. **Optimize prematurely**: Measure first, then optimize
5. **Refactor working code**: If it ain't broke, don't fix it

### Do:

1. **Write tests first**: TDD approach
2. **Make small changes**: Easier to review and revert
3. **Document as you go**: Don't leave it for later
4. **Profile before optimizing**: Measure impact
5. **Get code reviews**: Second pair of eyes

## Resources

- [Refactoring Guru](https://refactoring.guru/)
- [Clean Code TypeScript](https://github.com/labs42io/clean-code-typescript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Next.js Best Practices](https://github.com/vercel/next.js/tree/canary/examples)
