# Hotwire Theme Mode (`<hotwire-theme-mode>`)

The `<hotwire-theme-mode>` component synchronizes the web application's theme (Dark/Light) with the Native App's UI.

## Example

```html
<hotwire-theme-mode 
  style="display:none;">
</hotwire-theme-mode>
```

## Ready Event

| Event Name | Frequency |
| :--- | :--- |
| `bagisto-native:theme-mode-ready` | Dispatched once the component connects and is ready. |

## Functionality

When the web app switches to Dark Mode, it updates this component, which triggers a message to the native app to darken the native navigation bar, status bar, and bottom tabs.

## Attributes

| Attribute | Values | Description |
| :--- | :--- | :--- |
| `data-bridge-mode` | `light` \| `dark` | The current theme mode. |

## Next Steps

- Understand [When to Use Directly vs React Wrappers](./when-to-use-directly-vs-react-wrappers.md)
- Learn about [Utility Functions](../utility-functions.md)
- Explore [Best Practices](../best-practices.md)
