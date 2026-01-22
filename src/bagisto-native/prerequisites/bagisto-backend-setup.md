# Bagisto Backend Setup

Bagisto Native is a frontend framework; it needs a backend to supply data (products, categories, customer info) via GraphQL APIs.

## Requirements

1.  **Bagisto Core**: You must have a working installation of **Bagisto v2.0.0** or higher.
2.  **GraphQL API**: The Bagisto GraphQL API package must be installed and configured.

## Setting Up the Backend

If you haven't set up Bagisto yet, follow the standard installation guide:

1.  **Install Bagisto**:
    ```bash
    composer create-project bagisto/bagisto
    ```

2.  **Install GraphQL API**:
    ```bash
    composer require bagisto/graphql-api
    ```

3.  **Verify API Access**:
    Ensure you can access the GraphQL playground at:
    `http://your-bagisto-domain.com/graphiql`

::: tip Environment Config
Set your `.env` file correctly in your backend project to allow API access from external sources (CORS), especially if testing from a mobile device on the same network.
:::

## Next Steps

- Explore [iOS Requirements](./ios-requirements.md)
- Check [Network Requirements](./network-requirements.md)
- Learn about [Getting Started](../getting-started/setup-flow-overview.md)
