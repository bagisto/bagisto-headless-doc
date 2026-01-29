# Hotwire History Sync (`<hotwire-history-sync>`)

This component is critical for navigation. It informs the native app about the current URL of the WebView.

## Why is it needed?

Native apps maintain their own "Back Stack". Without this sync, if the user navigates 5 pages deep in the WebView and expects the native back button to take them back one step, the app might close instead because it thinks it's still on the "Home" activity.

> [!NOTE]
> This component is essential for frameworks like **Next.js** where the web framework completely controls the routing and navigation. In simple JavaScript implementations with standard browser navigation, this component is not required.

## Usage

It triggers a `turbo:next-history-sync` event whenever the route changes.

## Example

```html
<hotwire-history-sync style="display:none;"></hotwire-history-sync>
```

## Ready Event

| Event Name | Frequency |
| :--- | :--- |
| `bagisto-native:history-sync-ready` | Dispatched once the component connects and is ready. |

## Next Steps

- Explore [Hotwire theme mode](./hotwire-theme-mode.md)
- Understand [When to Use Directly vs React Wrappers](./when-to-use-directly-vs-react-wrappers.md)
- Learn about [Utility Functions](../utility-functions.md)
