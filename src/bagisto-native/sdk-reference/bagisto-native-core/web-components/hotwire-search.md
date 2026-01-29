# Hotwire Search (`<hotwire-search>`)


The `<hotwire-search>` component activates the native search interface when the user interacts with it.

## Behavior

When placed on the screen, it registers itself. When the user clicks the native "Search" icon (enabled via `DynamicButton`), the native app will open a native search bar overlay.

When the user types and hits enter in the native search bar, the native app sends a `turbo:next-search` event back to the web view.

## Listening for Results

You typically don't interact with the `<hotwire-search>` element directly; instead, you listen for the event on the window:

```javascript
window.addEventListener("turbo:next-search", (event) => {
    const query = event.detail.query;
    // Redirect to search results page
    window.location.href = `/search?q=${query}`;
});
```

## Example

```html
<hotwire-search style="display:none;"></hotwire-search>
```

## Ready Event

| Event Name | Frequency |
| :--- | :--- |
| `bagisto-native:search-component-ready` | Dispatched once the component connects and is ready. |

## Next Steps

- Learn about [Hotwire location](./hotwire-location.md)
- Explore [Hotwire history sync](./hotwire-history-sync.md)
- Understand [Utility Functions](../utility-functions.md)
