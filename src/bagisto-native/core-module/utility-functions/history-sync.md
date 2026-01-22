# History Sync

## `triggerHistorySyncEvent(url: URL)`

Notifies the native bridge of a navigation event.

### Parameters
*   `url`: Use the native `URL` object (e.g., `new URL('...')`).

### Usage
This is typically used inside your Router's "route change complete" hook.

```javascript
/* Next.js Example (simplified) */
useEffect(() => {
   const currentUrl = new URL(window.location.href);
   triggerHistorySyncEvent(currentUrl);
}, [pathname]);
```

## Next Steps

- Learn about [Theme sync](./theme-sync.md)
- Explore [Cart count sync](./cart-count-sync.md)
- Understand [Turbo Native detection](./turbo-native-detection.md)
