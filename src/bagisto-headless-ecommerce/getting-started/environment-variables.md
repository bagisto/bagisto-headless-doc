
# Environment Variables

This document describes all environment variables used in the Bagisto Headless Next.js application. Configuration is handled via `.env` files located in the project root.

## Quick Reference

| Variable | Type | Required | Visibility | Default/Example |
| :--- | :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_BAGISTO_ENDPOINT` | URL | Yes | Public | `https://your-bagisto-instance.com` |
| `NEXT_PUBLIC_BAGISTO_STOREFRONT_KEY` | String | Yes | Public | `your_storefront_key_here` |
| `NEXT_PUBLIC_NEXT_AUTH_URL` | URL | Yes | Public | `http://localhost:3000` |
| `NEXT_PUBLIC_NEXT_AUTH_SECRET` | Secret | Yes | Public | `your_next_auth_secret_here` |
| `COMPANY_NAME` | String | Yes | Server | `Your Company Name` |



## Getting Started

1. Copy the example environment file to create your local configuration:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and substitute the values for your specific environment.



## Detailed Variable Definitions

### 🔌 Bagisto API Configuration

#### `NEXT_PUBLIC_BAGISTO_ENDPOINT`
The publicly accessible URL of your Bagisto GraphQL API.
- **Example:** `https://your-bagisto-instance.com`
- **Used for:** All frontend-to-backend data fetching.

#### `NEXT_PUBLIC_BAGISTO_STOREFRONT_KEY`
The storefront key for authenticating requests to your Bagisto instance.
- **Example:** `your_storefront_key_here`
- **Used for:** API authentication.

### 🔐 NextAuth Configuration

#### `NEXT_PUBLIC_NEXT_AUTH_URL`
The base URL for NextAuth.js authentication.
- **Example:** `http://localhost:3000`
- **Used for:** Authentication callbacks and redirects.

#### `NEXT_PUBLIC_NEXT_AUTH_SECRET`
A secret string used to sign session cookies and encrypt tokens for NextAuth.js.
- **Example:** `your_next_auth_secret_here`

> [!CAUTION]
> Never share this secret or commit it to version control. If compromised, rotate it immediately.

### 🏢 Application Settings

#### `COMPANY_NAME`
The display name of your store.
- **Used for:** Meta tags, emails, footer text, and page titles.
- **Example:** `Your Company Name`



## Environment-Specific Configuration

- **`.env.local`**: Local overrides. **Never commit this file.**
- **`.env.development`**: Config specific to the development environment.
- **`.env.production`**: Config specific to the production environment.

### Visibility Rule
- **`NEXT_PUBLIC_` Prefix:** Variables with this prefix are bundled into the JavaScript sent to the browser. **Do not put secrets here.**
- **No Prefix:** Variables are only accessible on the server-side (Node.js runtime). Use these for API keys and secrets.



## Troubleshooting

### Connectivity Issues
1. **Endpoint URL:** Ensure `NEXT_PUBLIC_BAGISTO_ENDPOINT` is correct and does not have a trailing slash unless required by your routing.
2. **CORS:** Check the browser console for "Cross-Origin Request Blocked" errors. This usually means the backend needs to whitelist your frontend URL.

### Authentication Failures
1. Verify `NEXT_PUBLIC_NEXT_AUTH_URL` matches the URL in your browser exactly.
2. Ensure `NEXT_PUBLIC_NEXT_AUTH_SECRET` is set and identical across all server instances if using a cluster.


📖 **Related Docs:**
- [Project Setup Guide](/bagisto-headless-ecommerce/getting-started/project-setup.md)
- [Quick Start Guide](/bagisto-headless-ecommerce/getting-started/quick-start-guide.md)
