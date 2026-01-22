# Dynamic Button (`<dynamic-button>`)

The `<dynamic-button>` is a context-aware controller that instructs the native app to show specific buttons in the Top Navigation Bar.

## Attributes

| Attribute | Type | Description |
| :--- | :--- | :--- |
| `data-page-type` | `string` | Defines the current context (`home`, `product`, `category`). |

## Feature Breakdown

The `data-page-type` attribute determines which native buttons are displayed and what actions they perform.

### 1. Home Page (`data-page-type="home"`)

- **Image Search**: Triggers the native image/object detection interface. After an object is detected, the native app results in a search key.
- **QR & Barcode Search**: Triggers the native scanner. Once a code is scanned, it is passed back to the web view via a custom event.
- **Cart**: Displays the native cart icon. Clicking it triggers a navigation or modal event.

### 2. Product Page (`data-page-type="product"`)

- **Product Share**: Triggers the native share sheet, allowing users to share the product URL using system defaults.
- **Cart**: Displays the native cart icon.

---

## Events Emitted to Web

When users interact with these native buttons, the bridge emits standard `CustomEvent` objects to the `window`.

| Event | Detail | Description |
| :--- | :--- | :--- |
| `turbo:next-search` | `{ code: string }` | Emitted after a successful Barcode/QR scan or Image Search. |
| `turbo:next-cart-modal` | `null` | Emitted when the user taps the native Cart icon. |

### Handling Search Events

```javascript
window.addEventListener("turbo:next-search", (event) => {
    const customEvent = e as CustomEvent<{ query?: string; code?: string }>;
    const searchKey = customEvent.detail.query || customEvent.detail.code;
    console.log("Native search triggered with key:", searchKey);
    // Perform your search logic or redirection here
});
```

### Handling Cart Modal Events

```javascript
window.addEventListener("turbo:next-cart-modal", () => {
    console.log("Native cart icon tapped");
    // Open your web-based cart drawer or redirect to /cart
});
```

---

## Utility: Sending Cart Count

To update the badge count on the native cart icon, use the `triggerCartCountValue` utility from `@bagisto-native/core`.

```javascript
import { triggerCartCountValue } from "@bagisto-native/core";

// Update native cart badge to 5
triggerCartCountValue(5);
```

---

## Ready Event

| Event Name | Frequency |
| :--- | :--- |
| `bagisto-native:dynamic-button-ready` | Dispatched once the component connects and is ready. |



## Next Steps

- Explore [Hotwire toast](./hotwire-toast.md)
- Learn about [Hotwire search](./hotwire-search.md)
- Understand [When to Use Directly vs React Wrappers](./when-to-use-directly-vs-react-wrappers.md)
