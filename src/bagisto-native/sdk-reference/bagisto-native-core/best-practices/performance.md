# Performance

## Lazy Loading
Always use Dynamic Imports for Bridge components. The native bridge bundle is not needed for the "First Contentful Paint" of your website.

```javascript
/* Next.js */
const DynamicButton = dynamic(() => import(...));
```

## Minimize Bridge Traffic
Do not spam the bridge with events. For example, if syncing a slider value, do not trigger a native update on every pixel. Debounce the events.

## Next Steps

- Understand [Event Safety](./event-safety.md)
- Learn how to [Avoid Duplicate Native Actions](./avoiding-duplicate-native-actions.md)
- Explore the [React Module](../../bagisto-native-react/react-overview.md)
