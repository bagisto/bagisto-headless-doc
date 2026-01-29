# Installing React Wrappers

If you are using **Next.js** or **React**, you should install this package to get the developer-friendly component wrappers.

## Installation Command

```bash
npm install @bagisto-native/react
```

## Usage Preview

Once installed, you can import components like this:

```tsx
import dynamic from 'next/dynamic';

const DynamicButton = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.DynamicButton),
  { ssr: false }
);
```

::: tip Why not standard import?
Because the underlying Web Components reference `window` and `HTMLElement` during initialization, standard imports in Next.js (SSR) will cause "window is not defined" errors. Dynamic imports with `{ ssr: false }` solve this.
:::

## Next Steps

- Understand [Package Dependency Rules](./package-dependency-rules.md)
- Explore [Hotwire Bridge Bundle](../hotwire-bridge-bundle.md)
- Learn about [Making App Native-Ready](../making-app-native-ready.md)
