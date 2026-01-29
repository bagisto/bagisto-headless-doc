# Headless Concept

## What is Headless Commerce?

In a traditional e-commerce setup (Monolithic), the frontend (what users see) and backend (logic & database) are tightly coupled in the same codebase.

In **Headless Commerce**:
*   The **Backend** (Bagisto) only provides data via APIs (GraphQL). It doesn't care how the data is displayed.
*   The **Frontend** (Next.js) is a completely separate application. It fetches data from the backend and renders the UI.

## Why is this better for Native Apps?

Since the frontend is already decoupled via API, we can easily adapt it for different "Heads".
1.  **Web Head**: The Next.js website.
2.  **Mobile Head**: The Bagisto Native app, which wraps the Web Head but injects native behaviors.

This allows you to maintain a **single** frontend codebase that powers both your website and your mobile apps.

## Next Steps

- Understand the [CLI command](./cli-command.md)
- Explore the [Generated project structure](./generate-project-structure.md)
- Learn about [Configure & Run Headless Storefront](../configure-run-headless-storefront.md)
