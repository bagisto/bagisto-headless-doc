# Client-only Components

All components exported by `@bagisto-native/react` are **Client Components**.

In Next.js 13+ (App Router), you must use them inside files marked with `'use client'`, OR import them dynamically.

## Example Error
If you try to import `HotwireToast` in a server component (`page.tsx`) without dynamic import, your build will likely fail with:
`ReferenceError: window is not defined` or `HTMLElement is not defined`.

## Next Steps

- Understand [Dynamic Imports](./dynamic-imports.md)
- Learn about [SSR Limitations](./ssr-limitations.md)
- Explore the [Components Reference](../components-reference.md)
