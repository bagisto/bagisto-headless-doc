# Protected Routes

This document outlines the strategy for securing specific routes and features within the Bagisto Headless storefront. Currently, the project employs a **Component-Level Protection** strategy, allowing for a flexible balance between guest access and authenticated user features.


## 4.1 Protection Strategy Overview

Unlike a rigid middleware-only approach, this project uses NextAuth tokens to conditionally render features or redirect users from sensitive areas.

| Protection Level | Mechanism | Implementation |
| :--- | :--- | :--- |
| **Global** | Next.js Middleware | *(Optional / Planned)* Best for high-security dashboard groups. |
| **Page Level** | `getServerSession` | Used in Server Components to prevent data fetching for guests. |
| **Component Level** | `useSession` (Client) | Controls visibility of UI elements (e.g., Review Forms). |


## 4.2 Protected Features

Currently, the following areas require authentication:

### 1. Product Reviews
Customers must be logged in to submit reviews for products.
- **File:** `src/components/catalog/review/ReviewSection.tsx`
- **Logic:** Checks for a valid session; if missing, triggers a redirect to `/customer/login`.

### 2. Authenticated Checkout
While guest checkout is supported, authenticated users benefit from saved addresses and order history.
- **Logic:** The `useAddressesFromApi` hook dynamically fetches data based on the presence of an `accessToken` in the session.


## 4.3 Implementing Page Protection

To protect a new page in the `src/app` directory, use the following pattern:

### Server Component Protection (Recommended)
This approach prevents the page from rendering at all if a session isn't present.

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/customer/login");
  }

  return <div>Welcome to your secure dashboard</div>;
}
```

### Client Component Protection
Best for interactive elements that need to react to auth state changes.

```typescript
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SecureButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    return <button onClick={() => router.push("/customer/login")}>Login to Continue</button>;
  }

  return <button>Perform Action</button>;
}
```


## 4.4 Future: Middleware Protection

As the project grows (e.g., adding a full `/customer/account` section), a `middleware.ts` file can be added to the project root to secure entire route groups:

```typescript
// middleware.ts (Proposed)
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/customer/account/:path*", "/checkout/success/:path*"],
};
```


📖 **Related Documentation:**
- [Authentication Flow](/bagisto-headless-ecommerce/authentication/auth-flow.md)
- [NextAuth Integration](/bagisto-headless-ecommerce/authentication/nextauth-setup.md)
- [Apollo Client Setup](/bagisto-headless-ecommerce/apollo-client/apollo-setup.md)
