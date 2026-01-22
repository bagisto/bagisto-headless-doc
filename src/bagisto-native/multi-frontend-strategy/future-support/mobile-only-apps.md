# Mobile-Only Apps

## Status: Supported (by Architecture)

You might want to build an app that exists **only** on the App Stores and does not have a public website URL.

### Strategy

1.  **Headless Host**: You still need a web server (Next.js/React) to serve the HTML content to the app.
2.  **App-Specific Host**: Deploy your Next.js app to a hidden domain or sub-path (e.g., `app.your-store.com`).
3.  **Authentication**: Configure the Native App's base URL to this specific host.

### Benefits

- **Exclusive UI**: You can design the UI purely for mobile gestures without worrying about desktop responsiveness.
- **Native Navigation**: You can rely more heavily on native tab bars and navigation controllers since you don't need to support browser back buttons in the same way.

### Considerations

- **Deep Linking**: You need to ensure deep links (e.g., from emails) redirect correctly to your app-specific host or open the app directly.

## Next Steps

- Explore [Future Support for Vue](./vue.md)
- Learn about [Shared API Strategy](../shared-api-strategy.md)
- Understand [Getting Started](../../getting-started/setup-flow-overview.md)
