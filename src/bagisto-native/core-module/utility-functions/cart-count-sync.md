# Cart Count Sync

## Usage

This utility communicates with the native layer to set the numeric badge displayed on the cart icon in the top or bottom navigation bars.

### `triggerCartCountValue(cartcount: number)`

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `cartcount` | `number` | The total number of items in the cart to display on the badge. |

### Example

```javascript
import { triggerCartCountValue } from '@bagisto-native/core';

// Typical usage inside a cart update logic
function updateCart(newCart) {
    const qty = newCart.items_qty || 0;
    triggerCartCountValue(qty);
}
```

## Handling Race Conditions

If you need to sync the cart count immediately on page load, ensure the `DynamicButton` component (which manages the cart icon) is ready.

```javascript
window.addEventListener('bagisto-native:dynamic-button-ready', () => {
    // Bridge is ready, safe to send initial cart count
    triggerCartCountValue(initialQty);
});
```

## Next Steps

- Understand [Turbo Native detection](./turbo-native-detection.md)
- Learn about [Server vs Client Usage](./server-vs-client-usage.md)
- Explore [Best Practices](../best-practices.md)
