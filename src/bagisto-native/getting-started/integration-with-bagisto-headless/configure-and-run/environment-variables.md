# Environment Variables

To connect your headless storefront to your backend, you must configure the environment variables.

## `.env` Configuration

To get started, create a `.env` (or `.env.local`) file in the root of your project and populate it with your instance details:

| Variable | Type | Required | Visibility | Default/Example |
| :--- | :--- | :--- | :--- | :--- |
| **NEXT_PUBLIC_BAGISTO_ENDPOINT** | URL | Yes | Public | `https://your-bagisto-instance.com` |
| **NEXT_PUBLIC_BAGISTO_STOREFRONT_KEY** | String | Yes | Public | `your_storefront_key_here` |
| **NEXT_PUBLIC_NEXT_AUTH_URL** | URL | Yes | Public | `http://localhost:3000` |
| **NEXT_PUBLIC_NEXT_AUTH_SECRET** | Secret | Yes | Public | `your_next_auth_secret_here` |
| **COMPANY_NAME** | String | Yes | Server | `Your Company Name` |

::: info More Details
For a deeper dive into all available configuration options, refer to the [Bagisto Headless Environment Variables Guide](../../../../bagisto-headless-ecommerce/getting-started/environment-variables.md).
:::

::: warning Localhost on Mobile
If you plan to test on a physical mobile device, do **not** use `http://localhost:3000` for the endpoint. Use your computer's local network IP (e.g., `http://192.168.1.5:3000`) so the mobile device can communicate with the server.
:::

## Next Steps

- Explore [Development server](./development-server.md)
- Check [API connectivity](./api-connectivity-check.md)
- Understand [Limitations](../limitations.md)
