# Project Setup

This comprehensive guide walks you through setting up a Next.js project integrated with Bagisto's GraphQL API from scratch. Whether you're starting fresh or integrating into an existing project, this guide covers everything you need.


## Overview

By the end of this guide, you will have:

- ✅ A Next.js 16+ project with TypeScript
- ✅ Apollo Client configured for GraphQL
- ✅ NextAuth.js for authentication
- ✅ Redux Toolkit for state management
- ✅ Tailwind CSS for styling
- ✅ Proper project structure for scalability
- ✅ Environment variables configured
- ✅ Development server running

**Estimated Time:** 15-20 minutes


## Prerequisites

Before starting, ensure your environment is ready:

- **Node.js 18.17+** ([Download](https://nodejs.org/))
- **Yarn 1.22.x** (Recommended for this codebase)
- **Bagisto 2.0+** backend with GraphQL API enabled
- **Basic knowledge** of React, Next.js, and GraphQL

📖 **Detailed Requirements:** [Prerequisites Guide](/bagisto-headless-ecommerce/overview/prerequisites.md)


## Step 1: Initialize Project

### Create a New Next.js Project
Use the App Router and TypeScript for the best developer experience.

```bash
npx create-next-app@latest bagisto-storefront
```

**Recommended Configuration:**
- **TypeScript:** Yes
- **ESLint:** Yes
- **Tailwind CSS:** Yes
- **`src/` directory:** Yes
- **App Router:** Yes
- **Import Alias:** No (or `@/*`)

```bash
cd bagisto-storefront
```


## Step 2: Install Core Dependencies

Install the essential libraries that power the Bagisto Headless ecosystem.

### GraphQL & Interaction
```bash
yarn add @apollo/client graphql clsx framer-motion
```

### Authentication & State
```bash
yarn add next-auth @reduxjs/toolkit react-redux
```

### Forms & UI
```bash
yarn add react-hook-form @heroui/react @heroicons/react next-themes
```

> [!NOTE]
> We use `@apollo/client` for robust caching and `framer-motion` for professional-grade micro-animations.


## Step 3: Architecture Setup

Create a scalable directory structure to manage your components and GraphQL operations.

```bash
mkdir -p src/{app,components,graphql,lib,providers,store,types,utils}
```

### Key Directories
- `src/app`: Routes and server-side layouts.
- `src/components`: UI building blocks (Cart, Catalog, Checkout).
- `src/graphql`: Schema definitions, queries, and mutations.
- `src/lib`: Core client configurations (Apollo, Fetch).
- `src/providers`: Context wrappers (Auth, Redux, Theme).


## Step 4: Configuration

### 1. TypeScript Aliases
Update `tsconfig.json` to simplify deep imports:

```json
"paths": {
  "@/*": ["./src/*"],
  "@components/*": ["./src/components/*"],
  "@lib/*": ["./src/lib/*"],
  "@graphql/*": ["./src/graphql/*"]
}
```

### 2. Next.js Configuration
Update `next.config.ts` to allow images from your Bagisto backend:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-bagisto-backend.com',
      pathname: '/storage/**',
    },
  ],
},
```


## Step 5: Environment Setup

Create your `.env.local` file. This file is excluded from version control by default.

```env
# Bagisto API Endpoint
NEXT_PUBLIC_BAGISTO_ENDPOINT=https://your-bagisto-backend.com

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-strong-secret-key
```

> [!CAUTION]
> **NEXTAUTH_SECRET** must be a random string. Generate one using:
> `openssl rand -base64 32`


## Step 6: Core Library Files

### Apollo Client Setup
Create `src/lib/apollo-client.ts`:

```typescript
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BAGISTO_ENDPOINT}/api/graphql`,
  }),
  cache: new InMemoryCache(),
});
```

📖 **Detailed Setup:** [Apollo Client Guide](/bagisto-headless-ecommerce/apollo-client/apollo-setup.md)


## Step 7: Verify Installation

Start the development server:

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to confirm the application is running.


## Troubleshooting

- **Connection Refused:** Ensure your Bagisto backend is running and reachable.
- **TypeScript Errors:** Restart the TS Server in your IDE or delete the `.next` folder and rebuild.
- **Hydration Mismatch:** Ensure your `MainProvider` is correctly wrapping the `body` in `layout.tsx`.


## Next Steps

Now that your project is configured, let's learn about the data flow:

🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md)  
🔐 [Environment Variables](/bagisto-headless-ecommerce/getting-started/environment-variables.md)  
🚀 [Quick Start Guide](/bagisto-headless-ecommerce/getting-started/quick-start-guide.md)
