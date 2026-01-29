# @bagisto-native/react

The `@bagisto-native/react` package provides idiomatic React wrappers around the core Bagisto Native web components, making integration into Next.js and React applications seamless.

## Installation

```bash
npm install @bagisto-native/react
```

## Why use this package?

While `@bagisto-native/core` provides the raw custom elements, using them directly in React can be cumbersome (e.g., handling custom events, avoiding TypeScript errors with non-standard elements).

This package solves those friction points by providing:
1.  **TypeScript Support**: Fully typed props and components.
2.  **React Lifecycle Integration**: Components work naturally within the React render cycle.
3.  **SSR Compatibility**: Designed to work with Next.js dynamic imports to avoid server-side errors with window/document objects.

## Learn More

*   [**React / Next.js Wrappers**](./bagisto-native-react/react-nextjs-wrappers.md) - Code examples and usage guide.
*   [**Relationship with Core**](./bagisto-native-react/relationship-with-core.md) - How this package sits on top of the Core library.

## Next Steps

- Explore [React / Next.js wrappers](./bagisto-native-react/react-nextjs-wrappers.md)
- Understand the [Relationship with core](./bagisto-native-react/relationship-with-core.md)
- Check [Versioning & Compatibility](./versioning-compatibility.md)
