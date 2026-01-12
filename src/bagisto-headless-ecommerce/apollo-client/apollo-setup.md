# Apollo Client Setup

Apollo Client is the primary data management layer for the Bagisto Headless storefront. This guide walks through its configuration, integration with Next.js, and best practices for e-commerce performance.

## 1. Key Features

Apollo Client provides several critical capabilities for this project:

- **Intelligent Caching:** Automatic normalization and updates for consistent UI.
- **SSR Compatibility:** Optimized for Next.js Server Components and SEO.
- **Auth Integration:** Seamless handling of customer API tokens.
- **Type Safety:** Full TypeScript support for GraphQL queries and mutations.

## 2. Installation

Install the core dependencies using **Yarn**:

```bash
yarn add @apollo/client graphql next-auth
```

> [!NOTE]
> Ensure you are using `@apollo/client` v3.11.0 or higher for best compatibility with React 19 and Next.js 16.

## 3. Core Implementation

The Apollo Client is configured in src/lib/apollo-client.ts with authentication and SSR support.

The following files constitute the heart of the Apollo setup in this project.

```ts
// src/lib/apollo-client.ts
import { GRAPHQL_URL } from "@/utils/constants";
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

export default function initializeApollo() {
  const ssrMode = typeof window === "undefined";
  const cache = new InMemoryCache();

  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    credentials: "include",
  });

  const authLink = setContext(async (_, { headers }) => {
    if (ssrMode) {
      return { headers };
    }

    const session = await getSession();
    const userToken = session?.user?.accessToken;

    return {
      headers: {
        ...headers,
        ...(userToken && { authorization: `Bearer ${userToken}` }),
        "Content-Type": "application/json",
      },
    };
  });

  return new ApolloClient({
    ssrMode,
    link: from([authLink, httpLink]),
    cache: cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: ssrMode ? "network-only" : "cache-first",
        nextFetchPolicy: ssrMode ? "network-only" : "cache-first",
      },
      query: {
        fetchPolicy: ssrMode ? "network-only" : "cache-first",
      },
    },
  });
}
```

📖 **Key Features:**

- SSR Detection: Automatically detects server vs. client environment
- Dynamic Authentication: Injects Bearer token from NextAuth session
- Smart Caching: Network-only on server, cache-first on client
- Bagisto GraphQL Endpoint: Uses environment-based URL configuration

## 4. Fetch Policy Strategy

We use different fetch policies based on the context to balance data freshness and application speed.

| Policy             | Environment  | Use Case                                                         |
| :----------------- | :----------- | :--------------------------------------------------------------- |
| **`network-only`** | Server (SSR) | Ensuring SEO bots and users see the latest product data.         |
| **`cache-first`**  | Client (CSR) | Providing instant transitions for previously visited categories. |
| **`no-cache`**     | Both         | Handling highly sensitive or unique transactional data.          |

## 5. Usage Examples

Hover or swipe to see how to use Apollo in different parts of the application.

### 5.1 Client Component – Query Example

Using Apollo Client’s `useQuery` hook inside a Client Component.

```tsx
"use client";

import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/queries";

export function CategoryNav() {
  const { data, loading } = useQuery(GET_CATEGORIES);

  if (loading) return <Skeleton />;

  return (
    <ul>
      {data.categories.map((cat) => (
        <li key={cat.id}>{cat.name}</li>
      ))}
    </ul>
  );
}
```

### 5.2 Server Component – GraphQL Request

Fetching data on the server using a lightweight `graphqlRequest` utility.

```tsx
import { graphqlRequest } from "@/lib/graphql-fetch";
import { GET_PRODUCT } from "@/graphql/queries";

export default async function ProductPage({ params }) {
  const { slug } = params;

  const data = await graphqlRequest(GET_PRODUCT, { slug });

  return <ProductView product={data.product} />;
}
```

### 5.3 Client Component – Mutation Example

Performing mutations (e.g. login) using Apollo's `useMutation`.
javascript

```tsx
"use client";

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/mutations";

export function LoginForm() {
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const onSubmit = (formData) => {
    login({ variables: { ...formData } });
  };

  return <Button onClick={onSubmit} loading={loading} />;
}
```

## 6. Performance & Error Handling

### Query Batching

To optimize network overhead, we recommend enabling batching for high-traffic components.

```typescript
import { BatchHttpLink } from "@apollo/client/link/batch-http";
// Replace HttpLink with BatchHttpLink in apollo-client.ts
```

### Global Error Link

Catch and log errors globally to improve observability.

```ts
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) console.error("[GQL Error]", graphQLErrors);
  if (networkError) console.error("[Network Error]", networkError);
});
```

## 7. Common Troubleshooting

> [!WARNING] > **SSR Hydration Mismatch:** Ensure that your `ApolloWrapper` is memoized (as shown in Step 3) to prevent the client from being recreated on every render, which can cause inconsistent HTML between server and client.

- **Missing Cookies:** Ensure `credentials: "include"` is set in the `HttpLink` if your Bagisto backend relies on session cookies.
- **Cache Persistence:** For larger catalogs, consider configuring **persistent cache** using `apollo3-cache-persist`.

---

📖 **Continue Reading:**

- [GraphQL Request Utility](/bagisto-headless-ecommerce/apollo-client/request-utility.md)
- [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md)
- [Cache Options](/bagisto-headless-ecommerce/apollo-client/cache-options.md)
