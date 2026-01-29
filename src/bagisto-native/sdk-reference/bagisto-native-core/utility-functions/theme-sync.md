# Theme Sync

## `triggerThemeModeEvent(theme: string)`

Toggles the native app's theme.

### Parameters
*   `theme`: Must be literally `"dark"` or `"light"`.

### Example
```javascript
const toggleTheme = () => {
   const newTheme = isDark ? 'light' : 'dark';
   setTheme(newTheme);
   triggerThemeModeEvent(newTheme);
}
```

## Next Steps

- Explore [Cart count sync](./cart-count-sync.md)
- Understand [Turbo Native detection](./turbo-native-detection.md)
- Learn about [Server vs Client Usage](./server-vs-client-usage.md)
