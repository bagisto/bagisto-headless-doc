# Connect Bagisto Native

Now that your Headless Storefront is running and connected to your API, the next stage is to inject the **Bagisto Native** framework. This layer enables the seamless web-to-native communication bridge.

## What you will do in this section:

1.  **Framework Installation**: Add the `@bagisto-native` core and react packages to your storefront.
2.  **Bridge Configuration**: Deploy the critical `bundle.js` that facilitates communication.
3.  **Global Integration**: Register the bridge scripts in your application's root layout.

## 📦 Install the SDK

Run the following command in your storefront root:

```bash
npm install @bagisto-native/core @bagisto-native/react
```

## 🔗 Setup the Bridge Bundle

The most critical part of the integration is loading the `bundle.js`. This script acts as the post-office, carrying messages between your web app and the mobile shell.

### 1. Copy the Bundle
Copy the bundle from `node_modules` to your `public` folder:
`node_modules/@bagisto-native/core/public/hotwire/bundle.js` → `public/hotwire/bundle.js`

### 2. Register in Layout
Add the script to your root `layout.tsx` using the `beforeInteractive` strategy:

```tsx
// src/app/layout.tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script strategy="beforeInteractive" src="/hotwire/bundle.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

::: info What just happened?
Your web app is now "Bridge Ready." When it is loaded inside a Bagisto Native mobile shell, the `bundle.js` will automatically detect the environment and start facilitating native interactions.
:::

## Next Steps

- Go to [**Step 4: Integrate Native Components**](./component-integration-guide.md)
- Explore [Installing Packages](../../integration-guide/installing-packages.md)
- Learn about the [Hotwire Bridge Bundle](../../integration-guide/hotwire-bridge-bundle.md)
