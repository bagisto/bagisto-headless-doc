# Web Components

The core module exposes a set of Custom Elements. These are the primitive building blocks of the framework.

## Usage Syntax

Since these are standard HTML elements, you can use them in any template file (JSX, HTML, Vue Template).

```html
<hotwire-toast></hotwire-toast>
```

They are designed to be "headless" in terms of style—they are usually invisible (using `display: none` by default styles) and act purely as logic controllers that attach to the DOM to listen for data changes.

## Ready Events & Race Conditions

When these components are connected to the DOM, they emit a custom event. This is crucial for solving race conditions, ensuring that your application only interacts with the bridge once the component is fully initialized and ready to communicate with the native layer.

### Pattern: Listening for Ready Events

```javascript
window.addEventListener('bagisto-native:dynamic-button-ready', () => {
    // Component is connected and ready
    // You can now safely trigger actions or update attributes
});
```

See individual component documentation for their specific ready event names.

## Next Steps

- Explore [DynamicButton](./web-components/dynamic-button.md)
- Learn about [HotwireToast](./web-components/hotwire-toast.md)
- Understand [Utility Functions](./utility-functions.md)
