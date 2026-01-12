# Prerequisites

Before you begin setting up and running the Bagisto Headless project, ensure your environment meets the following requirements. This project is built using modern web technologies and requires specific versions of tools and platforms to function correctly.


## 1. Local Development Environment

### Node.js & Package Manager
The project requires Node.js and a compatible package manager. We recommend using **Yarn** for consistent dependency management.

- **Node.js:** `v20.x` or higher (LTS recommended).
- **Package Manager:** **Yarn 1.22.x** (Referenced in `package.json`).
  - While `npm` may work, `yarn` is the preferred tool for this codebase.

**Verify your versions:**
```bash
node --version
yarn --version
```

> [!NOTE]
> **Git:** A version control system is required to clone the repository and manage your changes. Latest stable version is recommended.


## 2. Bagisto Backend Requirements

Since this is a headless frontend, you must have a running instance of Bagisto to serve as the backend commerce engine.

- **Bagisto Version:** `v2.0.0` or higher.
- **GraphQL Extension:** Ensure the [Bagisto GraphQL API](https://headless-doc.bagisto.com/) is installed and configured on your backend instance.
- **API Endpoint:** You must have a publicly accessible URL for your Bagisto GraphQL endpoint (e.g., `https://your-bagisto-store.com/graphql`).

> [!IMPORTANT]
> Without a working GraphQL endpoint, the frontend will not be able to fetch products, categories, or process orders.


## 3. Required Knowledge

To comfortably work on this project, developers should be familiar with the following:

- **React & Next.js:** Familiarity with the App Router, Server Components, and Hooks.
- **TypeScript:** The project uses TypeScript for type safety.
- **GraphQL:** Understanding of queries, mutations, and how to use tools like Apollo Client.
- **Tailwind CSS:** Knowledge of utility-first CSS for styling.

## 4. Accounts & Access (Optional but Recommended)

- **Vercel Account:** For hosting and deploying the Next.js frontend.
- **GitHub Account:** For version control and collaborative development.


## Next Steps

Once you have confirmed that all prerequisites are met, you can proceed to the [Quick Start Guide](/bagisto-headless-ecommerce/getting-started/quick-start-guide.md) to set up the project.
