# Hotwire Toast (`<hotwire-toast>`)

The `<hotwire-toast>` element serves as a hidden anchor for triggering native toast messages.

## Mechanism

It works by listening to attribute changes on itself. When the `data-bridge-message` attribute is updated, it fires a click event that the `BridgeComponent` (Stimulus controller) intercepts to send a message to the native app.

## Example

```html
<hotwire-toast style="display:none;"></hotwire-toast>
```

## Ready Event

| Event Name | Frequency |
| :--- | :--- |
| `bagisto-native:toast-ready` | Dispatched once the component connects and is ready. |

::: warning Singleton
You should only have one instance of this element in your DOM at any time (usually in the specific layout).
:::

## Next Steps

- Explore [Hotwire search](./hotwire-search.md)
- Learn about [Hotwire location](./hotwire-location.md)
- Understand [Utility Functions](../utility-functions.md)
