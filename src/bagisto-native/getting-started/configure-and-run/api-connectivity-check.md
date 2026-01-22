# API Connectivity Check

Before proceeding to install the native packages, verifying that the storefront is successfully talking to the backend is crucial.

## Verification Steps

1.  **Homepage Products**: Do you see products listed on the homepage?
    *   *If yes*: Connection is working.
    *   *If no*: Check browser console for network errors.
2.  **Network Tab**: Open Chrome DevTools (F12) -> Network to filter by `graphql`.
    *   Reload the page.
    *   You should see successful `200 OK` requests to your GraphQL endpoint.
3.  **CORS Errors**: If you see "Cross-Origin Request Blocked" errors in the console:
    *   Ensure your Bagisto Backend is configured to accept requests from your frontend's domain/port.
    *   Check `config/cors.php` in your Laravel backend.

::: info Ready for Native
Once your headless storefront is running and displaying data, you are ready to install the Bagisto Native framework and start building the bridge!
:::

## Next Steps

- Explore [Development server](./development-server.md)
- Learn about [Environment variables](./environment-variables.md)
- Check [Limitations](../limitations.md)
