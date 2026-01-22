# Turbo Native Detection

## `isTurboNativeUserAgent(userAgent?: string): boolean`

Determines if the current session is running inside the Bagisto Native app.

### Parameters
*   `userAgent` (Optional): The user agent string to check. If omitted, it defaults to `navigator.userAgent` on the client.

### Usage
This is crucial for **Conditional Rendering**. You often want to hide your web header/footer when inside the native app.

```javascript
/* Server Side (Next.js App Router) */
const headersList = headers();
const userAgent = headersList.get('user-agent');
const isNative = isTurboNativeUserAgent(userAgent);
```

## Next Steps

- Learn about [Server vs Client Usage](./server-vs-client-usage.md)
- Explore [Best Practices](../best-practices.md)
- Understand the [React Module](../../react-module/react-overview.md)
