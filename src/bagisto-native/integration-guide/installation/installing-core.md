# Installing Core

The core package is mandatory for all Bagisto Native implementations.

## Installation Command

Run the following command in your project root:

```bash
npm install @bagisto-native/core
```

## Verification

After installation, verify that the package exists in your `node_modules` directory. You should see `@bagisto-native/core` containing the `dist`, `src`, and `public` folders.

::: info Bundle Location
The critical `bundle.js` file is located at `node_modules/@bagisto-native/core/public/bundle.js`. We will move this in a later step.
:::

## Next Steps

- Learn about [Installing React Wrappers](./installing-react-wrappers.md)
- Understand [Package Dependency Rules](./package-dependency-rules.md)
- Explore [Hotwire Bridge Bundle](../hotwire-bridge-bundle.md)
