# Testing Guide

## Overview

BookVault uses Jest and React Testing Library for unit and integration testing. The testing setup is configured to work with Next.js 15 and React 19.

## Running Tests

### Development Mode (Watch)
```bash
pnpm test
```
Runs tests in watch mode, re-running tests when files change.

### CI Mode (Single Run)
```bash
pnpm test:ci
```
Runs all tests once (useful for CI/CD pipelines).

### Coverage Report
```bash
pnpm test:coverage
```
Generates a test coverage report showing which parts of your code are tested.

## Test Structure

Tests are organized in `__tests__` directories next to the code they test:

```
components/
  ui/
    __tests__/
      button.test.tsx
      input.test.tsx
      card.test.tsx
    button.tsx
    input.tsx
    card.tsx

lib/
  __tests__/
    formatters.test.ts
    invoice-utils.test.ts
    validations.test.ts
  formatters.ts
  invoice-utils.ts
  validations.ts
```

## What's Tested

### UI Components
- **Button**: Variants, sizes, click events, disabled states
- **Input**: User input, types, disabled states
- **Card**: Component structure and composition
- **StatsCard**: Dashboard statistics display

### Utility Functions
- **Formatters**: Currency, dates, numbers, percentages
- **Invoice Utils**: Calculations, number generation, overdue detection
- **Validations**: Zod schema validation for all entities

## Writing Tests

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<MyComponent onClick={handleClick} />);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Utility Function Test Example

```typescript
import { myUtility } from '../myUtility';

describe('myUtility', () => {
  it('returns correct value', () => {
    expect(myUtility(5)).toBe(10);
  });
  
  it('handles edge cases', () => {
    expect(myUtility(0)).toBe(0);
    expect(myUtility(-5)).toBe(-10);
  });
});
```

## Mocking

### Next.js Router
The router is automatically mocked in `jest.setup.ts`:

```typescript
import { useRouter } from 'next/navigation';
// useRouter() will return mock functions
```

### NextAuth
Session hooks are automatically mocked:

```typescript
import { useSession } from 'next-auth/react';
// useSession() will return { data: null, status: 'unauthenticated' }
```

## Test Coverage

Current test coverage:
- ✅ UI Components (Button, Input, Card, StatsCard)
- ✅ Formatters (Currency, Date, Number, Percent)
- ✅ Invoice Utilities (Calculations, Generation)
- ✅ Validation Schemas (Client, Invoice, Item)

### Areas for Future Testing
- [ ] API routes (requires mocking Prisma)
- [ ] Dashboard pages (requires session mocking)
- [ ] Form submissions
- [ ] Error handling
- [ ] Loading states

## Configuration Files

- `jest.config.ts` - Main Jest configuration
- `jest.setup.ts` - Test environment setup and global mocks
- `package.json` - Test scripts

## Tips

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use User Events**: Prefer `userEvent` over `fireEvent` for more realistic interactions
3. **Query Priorities**: Use `getByRole` > `getByLabelText` > `getByPlaceholderText` > `getByText`
4. **Async Tests**: Always use `await` with user interactions and async operations
5. **Cleanup**: React Testing Library automatically cleans up after each test

## Troubleshooting

### Tests Failing Locally
```bash
# Clear Jest cache
pnpm jest --clearCache

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Import Errors
Make sure your paths in `jest.config.ts` match your `tsconfig.json`:
```typescript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
}
```

### Timeout Errors
Increase the test timeout in your test file:
```typescript
jest.setTimeout(10000); // 10 seconds
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Next.js Apps](https://nextjs.org/docs/app/building-your-application/testing/jest)
- [Common Testing Patterns](https://testing-library.com/docs/react-testing-library/cheatsheet)
