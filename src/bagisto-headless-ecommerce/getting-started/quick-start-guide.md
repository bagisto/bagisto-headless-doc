# Quick Start Guide

Get your Bagisto Headless Next.js e-commerce store up and running in minutes! This guide will walk you through the essential steps to set up your development environment and start building.

## Prerequisites

Ensure your local machine has the following tools installed.

| Tool | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `v20.x` or higher | JavaScript Runtime |
| **Yarn** | `v1.22.x` | Recommended Package Manager |
| **Git** | Latest | Version Control |

> [!TIP]
> This project is optimized for **Yarn**. While `npm` is supported, we recommend Yarn for consistent dependency resolution.

### Bagisto Backend Requirement
You'll need a running Bagisto instance with GraphQL enabled:
- **Demo API:** `https://demo.bagisto.com` (Great for quick testing).
- **Self-Hosted:** Follow the [Bagisto Installation Guide](https://headless-doc.bagisto.com/getting-started/installation) for full control.

## Step 1: Clone & Navigate

```bash
# Clone the storefront repository
git clone https://github.com/your-org/bagisto-headless.git

# Enter the project directory
cd bagisto-headless
```

## Step 2: Install Dependencies

```bash
# Using Yarn (Recommended)
yarn install

# Or using npm
npm install
```

This installs the modern stack powering the store: **Next.js 16**, **React 19**, **Apollo Client**, **NextAuth.js**, and **Tailwind CSS**.


## Step 3: Configure Environment

```bash
# Initialize your environment file
cp .env.example .env.local
```

Open `.env.local` and set your variables:

```env
# Branding
COMPANY_NAME="My Awesome Store"

# API & Auth
NEXT_PUBLIC_BAGISTO_ENDPOINT=https://demo.bagisto.com
NEXTAUTH_SECRET=your-random-32-character-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> [!IMPORTANT]
> To generate a secure **NEXTAUTH_SECRET**, run:
> `openssl rand -base64 32`

📖 **Full Reference:** [Environment Variables Guide](/bagisto-headless-ecommerce/getting-started/environment-variables.md)


## Step 4: Fire Up the Store

```bash
yarn dev
```

The development server will start at **[http://localhost:3000](http://localhost:3000)**. 


## Step 5: Verify the Setup

1. **Homepage:** Open your browser and check if the products are loading from the API.
2. **Cart:** Add a product to the cart to verify state management.
3. **Login:** Try navigating to the login page to ensure auth routes are active.


## Project Structure at a Glance

```text
src/
├── app/          # App Router (Routes, Layouts, Metadata)
├── components/   # UI Library (Common, Catalog, Cart)
├── graphql/      # Schema/Operations (Queries & Mutations)
├── lib/          # Client Configs (Apollo/Fetch)
└── store/        # State Management (Redux/Zustand)
```


## Common Dev Commands

| Command | Action |
| :--- | :--- |
| `yarn dev` | Starts local development server. |
| `yarn build` | Compiles the app for production. |
| `yarn lint` | Checks code for errors and styling issues. |
| `yarn start` | Runs the production build locally. |


## Troubleshooting

- **API Not Loading:** Check your CORS settings in the Bagisto backend and ensure the endpoint in `.env.local` is correct.
- **Node Version Error:** Ensure you are using Node 18+ (Node 20+ is recommended).
- **Port Conflict:** If port 3000 is taken, use `PORT=3001 yarn dev`.


## Next Steps

Explore the architecture and learn how to customize your storefront:

🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md)  
🔐 [Authentication Guide](/bagisto-headless-ecommerce/authentication/nextauth-setup.md)  


**Happy Coding!** 🚀 You're now ready to build a world-class e-commerce experience.
