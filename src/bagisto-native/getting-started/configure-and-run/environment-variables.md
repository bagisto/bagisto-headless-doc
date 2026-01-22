# Environment Variables

To connect your headless storefront to your backend, you must configure the environment variables.

## `.env.local`

Create or edit the `.env` (or `.env.local`) file in the root of your project:

```properties
# The full URL to your Bagisto Backend's GraphQL endpoint
NEXT_PUBLIC_ALIA_GRAPHQL_ENDPOINT=http://your-bagisto-backend.com/graphql

# Your Store Code (optional, default is 'default')
NEXT_PUBLIC_STORE_CODE=default // used for passing in request header

# API Key (if configured in backend)
NEXT_PUBLIC_MOBIKUL_API_KEY=your-api-key
```

::: warning Localhost on Mobile
If you plan to test on a physical mobile device, do **not** use `http://localhost:8000` for the endpoint. Use your computer's local network IP (e.g., `http://192.168.1.5:8000/graphql`) so the mobile device can reach the backend.
:::

## Next Steps

- Explore [Development server](./development-server.md)
- Check [API connectivity](./api-connectivity-check.md)
- Understand [Limitations](../limitations.md)
