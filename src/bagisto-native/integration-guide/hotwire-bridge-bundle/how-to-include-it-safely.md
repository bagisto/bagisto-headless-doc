# How to Include It Safely

In a Next.js application, you must treat `bundle.js` as a static asset.

## Step 1: Copy the File

Manually copy the file from `node_modules` to your `public` folder.

**Source**: `node_modules/@bagisto-native/core/public/bundle.js`  
**Destination**: `your-project/public/bundle.js`

::: tip Automation
You can add a script to your `package.json` to automate this:
`"postinstall": "cp node_modules/@bagisto-native/core/public/bundle.js public/bundle.js"`
:::

## Step 2: load the Script

Add the script tag to your root layout (`app/layout.tsx`).

```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script 
          src="/bundle.js" 
          strategy="beforeInteractive" 
        />
      </body>
    </html>
  );
}
```

Using `strategy="beforeInteractive"` ensures the bridge is loaded and ready before any interactive hydration takes place.

## Next Steps

- Explore [Production vs Development Notes](./production-vs-development-notes.md)
- Understand [Making App Native-Ready](../making-app-native-ready.md)
- Learn about [Web Components](../../sdk-reference/bagisto-native-core/web-components.md)
