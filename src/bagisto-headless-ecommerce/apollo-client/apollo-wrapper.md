# Apollo Wrapper Provider

The `ApolloWrapper` is a client-side component responsible for integrating Apollo Client into the Next.js App Router's component tree. It ensures that all descendant components have access to GraphQL hooks while maintaining optimal performance.

## 1. Core Responsibilities

The wrapper handles three critical tasks:

1. **Context Provision:** Wraps children with `ApolloProvider`.
2. **Client Initialization:** Invokes the Apollo Client factory.
3. **Memoization:** Ensures the client instance is stable across re-renders to prevent cache loss.

## 2. Implementation Overview

The following snippets show the wrapper's definition and its place in the global provider hierarchy.

```tsx
// src/providers/ApolloWrapper.tsx
"use client";

import { ApolloProvider } from "@apollo/client/react";
import { ReactNode, useMemo } from "react";
import initializeApollo from "@/lib/apollo-client";

export function ApolloWrapper({ children }: { children: ReactNode }) {
  // CRITICAL: useMemo prevents the client from being
  // recreated on every state change in parents.
  const client = useMemo(() => initializeApollo(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
```

```tsx
// src/providers/MainProvider.tsx
"use client";

import { ApolloWrapper } from "./ApolloWrapper";
import { ReduxProvider } from "./ReduxProvider";
import { SessionProvider } from "next-auth/react";

export function MainProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider>
        <ApolloWrapper>{children}</ApolloWrapper>
      </ReduxProvider>
    </SessionProvider>
  );
}
```

## 3. Why This Design?

### The `"use client"` Directive

Since `ApolloProvider` relies on React Context, the wrapper must be a Client Component. This isolates the client-side state logic from your Server Components, allowing the rest of your app to benefit from Server-Side Rendering (SSR).

### Memoization Strategy

By using `useMemo` with an empty dependency array `[]`, we guarantee that:

- The **Apollo Cache** is persisted throughout the user session.
- No unnecessary **re-subscriptions** or **network re-fetches** occur due to provider re-renders.

## 4. Provider Hierarchy Rules

To ensure a functional and secure storefront, follow this hierarchy order in `src/app/layout.tsx`:

1. **`SessionProvider` (Outermost):** Essential for providing auth tokens to the lower layers.
2. **`ReduxProvider`:** Allows global store management before data fetching starts.
3. **`ApolloWrapper` (Innermost):** Consumes tokens from Auth and provides data to the UI.

## 5. Usage in Components

Once wrapped, you can use standard Apollo hooks in any subdirectory of `src/app`.

```tsx
"use client";

import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "@/graphql/customer";

export default function ProfileHeader() {
  const { data, loading } = useQuery(GET_PROFILE);

  if (loading) return <PulseLoader />;

  return <h1>Welcome, {data.customer.firstName}</h1>;
}
```

## 6. Common Troubleshooting

| Issue                                               | Root Cause                                    | Fix                                            |
| :-------------------------------------------------- | :-------------------------------------------- | :--------------------------------------------- |
| **"createContext only works in Client Components"** | Missing `"use client"` directive.             | Add it to the top of the file.                 |
| **Cache Lost on Navigation**                        | Client not memoized with `useMemo`.           | Wrap `initializeApollo()` in `useMemo`.        |
| **Auth Failures**                                   | `ApolloWrapper` is outside `SessionProvider`. | Move `ApolloWrapper` inside the auth provider. |

---

📖 **Related Documentation:**

- [Apollo Client Setup](/bagisto-headless-ecommerce/apollo-client/apollo-setup.md)
- [Project Architecture](/bagisto-headless-ecommerce/overview/architecture-overview.md)
- [Environment Variables](/bagisto-headless-ecommerce/getting-started/environment-variables.md)
