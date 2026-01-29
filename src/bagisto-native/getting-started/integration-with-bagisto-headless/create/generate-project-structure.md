# Generated Project Structure

After running the CLI command, you will see a structure similar to this:

```text
my-storefront/
├── .env.local          # Environment variables
├── app/                # Next.js App Router (Pages & Layouts)
├── components/         # Reusable React Components
├── public/             # Static assets (images, fonts)
├── lib/                # Utilities and API clients
├── package.json        # Dependencies
└── next.config.js      # Next.js configuration
```

## Key Directories

*   **`app/`**: Contains the routes of your application (e.g., `/product`, `/cart`). This is where you will integrate the Bagisto Native components.
*   **`public/`**: This is where you will later place the `bundle.js` required for the native bridge.
*   **`lib/`**: Contains the GraphQL client configuration used to talk to your Bagisto backend.

## Next Steps

- Explore [Environment variables](../configure-and-run/environment-variables.md)
- Understand [CLI command](./cli-command.md)
- Check [Repository reference](./repository-reference.md)
