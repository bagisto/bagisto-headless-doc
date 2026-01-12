# Cart Persistence

This guide explains how the shopping cart session and data are persisted in the Bagisto Headless storefront.


## Overview

Cart persistence is crucial for a smooth user experience, ensuring that items added to the cart remain there even if the user refreshes the page or returns to the site later. In Bagisto Headless, this is achieved through a combination of cookie-based session management and Redux state synchronization.


## 1. Cookie-Based Session Persistence

The storefront uses cookies to store a secure, encoded token that identifies the user's active cart session.

### Guest Cart Token
When a user adds their first item to the cart (as a guest), a `GUEST_CART_TOKEN` is generated and stored in the browser's cookies. This token contains an encoded JWT with the `sessionToken` and `cartId`.

**File:** `src/utils/hooks/useGuestCartToken.ts`

```typescript
const newToken = encodeJWT({
  sessionToken: cart.sessionToken,
  cartId: cart.id,
  isGuest: cart.isGuest,
});

// Persist token in cookies for session longevity
setCookie(GUEST_CART_TOKEN, newToken);
```

### Advantages of Cookie Persistence
- **Automatic Rehydration:** On page load, the storefront checks for the presence of the `GUEST_CART_TOKEN`. If found, it decodes the token and uses the `sessionToken` to fetch the current cart state from the Bagisto API.
- **Cross-Tab Support:** Since cookies are shared across browser tabs for the same domain, the cart state remains consistent even if a user has multiple tabs open.
- **Expiration Control:** Cookies are set with an expiration period, allowing the cart session to persist for several days (e.g., 7 days).


## 2. Token Retrieval and Usage

The `getCartToken` utility is the central point for retrieving the active cart session token, whether for guest or logged-in users.

**File:** `src/utils/getCartToken.ts`

```typescript
export const getCartToken = (): string | null => {
  const raw = getNativeCookie(GUEST_CART_TOKEN);
  if (!raw) return null;

  const isGuest = getNativeCookie(IS_GUEST) !== "false";
  const decoded = decodeJWT<{ sessionToken: string }>(raw, isGuest);
  
  return decoded?.sessionToken ?? null;
};
```


## 3. Redux State Rehydration

While the session token is persisted in cookies, the actual cart contents (items, quantities, totals) are stored in Redux for fast UI access. 

- On initial load, components like the `Navbar` or `Cart` icon use the persisted token to perform a "get cart" query.
- The result of this query is then dispatched to the Redux store via the `addItem` action, rehydrating the local state with the latest server-side data.


## 4. Persistence for Logged-In Customers

For authenticated customers, the persistence is handled differently:
- The cart is associated with the customer's account in the Bagisto backend.
- Upon login, the guest cart is typically merged with the customer's existing cart.
- The authentication token (JWT) managed by NextAuth.js serves as the primary identifier for fetching the customer's cart.


## Summary

- **Primary Identifier:** `GUEST_CART_TOKEN` stored in cookies.
- **Session Longevity:** Cookies ensure the cart persists across refreshes and browser restarts.
- **Fast UI Rehydration:** Redux state is populated from the server using the persisted token on page load.
- **Seamless Merge:** Automatically handles transitions from guest to authenticated cart sessions.

## Next Steps

- 🔩 [Redux Integration](/bagisto-headless-ecommerce/features/cart/state-management/redux-integration.md) - How the local cart state is managed.
- 🔐 [Customer Authentication](/bagisto-headless-ecommerce/authentication/nextauth-setup.md) - Understanding how customer sessions are handled.
