# When to Use

While most Next.js and React developers should prefer the `@bagisto-native/react` wrapper package, there are specific scenarios where using `@bagisto-native/core` directly is the better or necessary choice.

## 1. Non-React Environments

If you are building your storefront using **Vue.js**, **Angular**, **Svelte**, or **Vanilla JavaScript**, you cannot use the React wrappers. In these cases, you must use the Core package.

### Example (Vanilla HTML/JS)
```html
<!-- Import the library bundle first -->
<script src="/bundle.js"></script>

<!-- Use the custom element directly -->
<dynamic-button data-page-type="home"></dynamic-button>
```

## 2. Custom Framework Wrappers

If you are building an internal library or a design system and want to create your own wrappers for these components (e.g., creating a `@my-company/vue-bagisto-native`), you should build on top of `@bagisto-native/core`.

## 3. Fine-Grained Control

If the React wrappers abstract away too much functionality or if you need to intercept specific custom events that the wrappers don't expose, using the underlying Web Components gives you raw access to the DOM API and attributes.

::: warning Complexity
Using Core directly means you are responsible for handling framework-specific lifecycle events (mounting/unmounting) and ensuring the custom elements are properly defined in the window registry.
:::

## Next Steps

- Explore the [React Package](../react-package.md)
- Learn about [Versioning & Compatibility](../versioning-compatibility.md)
- Understand the [Core Module](./core-overview.md)
