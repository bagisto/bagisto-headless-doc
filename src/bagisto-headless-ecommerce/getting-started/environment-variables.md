# Environment Variables

This document describes all environment variables used in the Bagisto Headless Next.js application. Configuration is handled via `.env` files located in the project root.

## Quick Reference

| Variable | Type | Required | Visibility | Default/Example |
| :--- | :--- | :---: | :--- | :--- |
| `COMPANY_NAME` | String | Yes | Server | `My Awesome Store` |
| `NEXT_PUBLIC_APP_URL` | URL | Yes | Public | `http://localhost:3000` |
| `NEXT_PUBLIC_BAGISTO_ENDPOINT` | URL | Yes | Public | `http://localhost:3000/api/graphql` |
| `NEXTAUTH_URL` | URL | Yes | Server | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret | Yes | Server | `openssl rand -base64 32` |


## Getting Started

1. Copy the example environment file to create your local configuration:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and substitute the values for your specific environment.


## Detailed Variable Definitions

### 🏢 Branding

#### `COMPANY_NAME`
The display name of your store.
- **Used for:** Meta tags, emails, footer text, and page titles.
- **Example:** `Bagisto Home Store`


### 🌐 Application URLs

#### `NEXT_PUBLIC_APP_URL`
The base URL where your frontend is accessible.
- **Requirement:** Must start with `http://` or `https://`.
- **Note:** Do **not** include a trailing slash.
- **Used for:** Canonical links, social sharing, and email redirects.

#### `NEXTAUTH_URL`
The canonical URL for NextAuth.js authentication.
- **Note:** In most cases, this should be identical to `NEXT_PUBLIC_APP_URL`.
- **Warning:** If this doesn't match your deployment domain, authentication callbacks will fail.


### 🔌 Backend Integration

#### `NEXT_PUBLIC_BAGISTO_ENDPOINT`
The publicly accessible URL of your Bagisto GraphQL API.
- **Example:** `https://api.yourstore.com`
- **Used for:** All frontend-to-backend data fetching.

> [!TIP]
> Ensure your Bagisto backend has the GraphQL extension installed and CORS configured to allow requests from your `NEXT_PUBLIC_APP_URL`.


### 🔐 Security & Auth

#### `NEXT_AUTH_SECRET`
A cryptographically secure random string used to sign session cookies and encrypt tokens.

> [!CAUTION]
> Never share this secret or commit it to version control. If compromised, rotate it immediately, which will invalidate all active user sessions.

**Generate a secure secret:**
```bash
# Recommendation: Generate a 32-byte base64 string
openssl rand -base64 32
```


## Environment-Specific Configuration

- **`.env.local`**: Local overrides. **Never commit this file.**
- **`.env.development`**: Config specific to the development environment.
- **`.env.production`**: Config specific to the production environment.

### Visibility Rule
- **`NEXT_PUBLIC_` Prefix:** Variables with this prefix are bundled into the JavaScript sent to the browser. **Do not put secrets here.**
- **No Prefix:** Variables are only accessible on the server-side (Node.js runtime). Use these for API keys and secrets.


## Troubleshooting

### Connectivity Issues
1. **Trailing Slashes:** Ensure `NEXT_PUBLIC_BAGISTO_ENDPOINT` does not end with `/api/graphql/` (unless your routing specifically requires it).
2. **CORS:** Check the browser console for "Cross-Origin Request Blocked" errors. This usually means the backend needs to whitelist your frontend URL.

### Authentication Failures
1. Verify `NEXTAUTH_URL` matches the URL in your browser exactly.
2. Ensure `NEXTAUTH_SECRET` is set and identical across all server instances if using a cluster.


📖 **Related Docs:**
- [Project Setup Guide](/bagisto-headless-ecommerce/getting-started/project-setup.md)
- [Quick Start Guide](/bagisto-headless-ecommerce/getting-started/quick-start-guide.md)
