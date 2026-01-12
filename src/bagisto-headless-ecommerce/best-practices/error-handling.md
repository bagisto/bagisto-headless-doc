# Error Handling

This guide outlines the strategies and patterns used to handle different types of errors in the Bagisto Headless storefront, ensuring a resilient and user-friendly experience.

## Overview

The storefront implements a multi-layered error handling strategy that covers data fetching, network connectivity, and user input validation. Our goal is to prevent application crashes, provide clear feedback to the user, and maintain a robust state.

## 1. GraphQL Errors

Since we interact with the Bagisto backend exclusively through GraphQL, handling API-level errors is critical.

### Handling GraphQL Context
GraphQL queries often return a `200 OK` HTTP status even if the request partially failed. We handle this in our custom fetch utilities by checking the `data` and `errors` arrays.

**File:** `src/utils/fetch-handler.ts`
```typescript
if (!response.ok) {
  return {
    data: null,
    error: {
      status: response?.status,
      message: result?.error || "Something went wrong",
    },
  };
}
```

### Mutation Side-Effects
When using `useMutation`, we provide `onSuccess` and `onError` callbacks to give users immediate feedback via the custom toast system.

```typescript
const { mutateAsync } = useMutation({
  onSuccess: (res) => {
    if (!res?.data?.success) {
      showToast(res?.message, "danger");
    }
  },
  onError: (err) => {
    showToast(err.message ?? "An unexpected error occurred", "danger");
  }
});
```

## 2. Network & Application Errors

For critical failures that prevent a page from rendering, we use Next.js's built-in error boundary system.

### Error Boundaries
We use `error.tsx` files located in the `app/` directory segments to catch runtime errors and provide a fallback UI that doesn't break the entire site.

**File:** `src/app/(public)/error.tsx`
- **User-Friendly Message:** "Oh no! There was an issue with our storefront."
- **Recovery Action:** Provides a "Try Again" button that triggers the `reset()` function to attempt a re-render.

### Logging Errors
Unexpected errors are logged to the console in development. For production, these can be hooked into monitoring services like Sentry to track recurring issues.

## 3. Validation Errors

Validation ensures that the data sent to the backend is correct and matches the expected schema.

### Client-Side Validation
We use **React Hook Form** to manage form state and provide real-time validation feedback. This is used extensively in checkout and customer registration.

- **Immediate Feedback:** Errors are displayed as soon as a field loses focus or the form is submitted.
- **Rules:** We define rules for required fields, email formats, and minimum lengths.

### Server-Side Validation
Even with client-side checks, the Bagisto API performs its own validation. If a mutation fails due to business logic (e.g., "Out of stock" or "Invalid address"), the error message is intercepted and displayed to the user via Toasts.

## 4. Timeout & Retry Logic

While not globally enforced, critical operations like cart synchronization and payment capturing can implement retry logic using `@tanstack/react-query` settings to handle temporary network blips.

```typescript
const { data } = useQuery({
  queryKey: ['cart'],
  queryFn: fetchCart,
  retry: 3, // Automatically retry 3 times on failure
  retryDelay: 1000,
});
```
## Best Practices

- **Never Show Raw Errors:** Avoid displaying technical stack traces or raw GraphQL error objects to users. Always map these to readable messages.
- **Graceful Fallbacks:** Use Skeletons or Fallback components when data is missing or fetching fails.
- **Persistent Notifications:** Use the `ToastProvider` for non-blocking notifications that let the user know their action failed without taking them away from their current page.

## Next Steps

- 🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md) - The high-level map of our resilient system.
- 💾 [State Management](/bagisto-headless-ecommerce/features/cart/state-management/redux-integration.md) - How error states are managed in Redux.
- 🧱 [Feature Components](/bagisto-headless-ecommerce/overview/architecture-overview/feature-components.md) - See error handling in specific UI modules.
