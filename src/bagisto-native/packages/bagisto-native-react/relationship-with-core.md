# Relationship with Core

It is important to understand that `@bagisto-native/react` is **not** a standalone implementation. It is a **wrapper** library that sits on top of `@bagisto-native/core`.

## Dependency Chain

```mermaid
graph TD
    A[Your Next.js App] --> B[@bagisto-native/react]
    B --> C[@bagisto-native/core]
    C --> D[Native Bridge Bundle]
```

## How it works

1.  **The Core**: Defines the custom element, e.g., `<dynamic-button>`. This element contains the logic to talk to the Stimulus controller.
2.  **The Wrapper**: The React component `<DynamicButton />` simply renders the `<dynamic-button>` custom element into the DOM.
3.  **The Props**: When you pass props like `pageType="home"` to the React component, it forwards them as attributes (e.g., `data-page-type="home"`) to the underlying custom element.

::: info Bundle Requirement
Even if you only install `@bagisto-native/react`, you **must** still copy the `bundle.js` from `@bagisto-native/core` into your public folder, because the React components ultimately rely on that bundle to communicate with the native app.
:::

## Next Steps

- Explore the [React Module](../../react-module/react-overview.md)
- Check [Versioning & Compatibility](../versioning-compatibility.md)
- Learn about [Prerequisites](../../prerequisites/system-requirements.md)
