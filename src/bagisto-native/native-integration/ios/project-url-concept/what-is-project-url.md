# What is Project URL

The **Project URL** (or Base URL) is the primary endpoint of your your web storefront storefront. It acts as the "home base" for your iOS application, providing the initial content and coordinating all web-native interactions.

## How it Works
When the iOS app launches, it initializes a `Navigator` instance with this URL. The app then loads the web content from this address while enabling native bridge components to intercept specific actions (like search, location, or theme switching).

## Local vs. Production
- **Local Development**: Typically an IP address or a local domain (e.g., `http://192.168.x.x:3000`).
- **Production**: Your live site domain (e.g., `https://yourstore.com`).

> [!IMPORTANT]
> Ensure the URL includes the protocol (`http://` or `https://`) and is accessible from the network where the iOS app is running (especially when using a physical device).
