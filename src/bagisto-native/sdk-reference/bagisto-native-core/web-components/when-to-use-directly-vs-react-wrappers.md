# When to Use Directly vs React Wrappers

## Use React Wrappers When:
*   You are building with **Next.js** or **React**.
*   You want type safety (TypeScript).
*   You want clean, idiomatic JSX syntax (`<HotwireToast />` vs `<hotwire-toast>`).
*   You want to avoid SSR headaches (Wrappers handle dynamic loading automatically).

## Use Core (Directly) When:
*   You are using **Vue.js** or **Svelte**.
*   You are migrating a legacy Bagisto application (Blade templates).
*   You need to debug exactly what attributes are being passed to the DOM.

## Next Steps

- Explore [Utility Functions](../utility-functions.md)
- Understand [Best Practices](../best-practices.md)
- Learn about the [React Module](../../bagisto-native-react/react-overview.md)
