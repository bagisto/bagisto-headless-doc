# Toast Events

## `triggerHotwireNativeToast(message: string)`

Sends a request to show a native toast notification.

### Parameters
*   `message`: The text to display.

### How it works
It finds the first `[data-controller='bridge--toast']` element in the DOM, updates its `data-bridge-message` attribute, and dispatches a click event.

### Example
```javascript
try {
  await addToCart(product);
  triggerHotwireNativeToast("Success! Added to cart.");
} catch (e) {
  triggerHotwireNativeToast("Failed to add to cart.");
}
```

## Next Steps

- Explore [History sync](./history-sync.md)
- Learn about [Theme sync](./theme-sync.md)
- Understand [Server vs Client Usage](./server-vs-client-usage.md)
