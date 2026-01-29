# Dynamic Imports

We strongly recommend using `next/dynamic` for importing ANY component from this library.

## Standard Pattern

```tsx
import dynamic from 'next/dynamic';

const DynamicButton = dynamic(
  () => import('@bagisto-native/react').then((mod) => mod.DynamicButton),
  { ssr: false }
);
```

This ensures that:
1.  The code is split into a separate chunk.
2.  The server does not attempt to execute the component code.
3.  The component only loads after the browser has hydrated.

## Next Steps

- Understand [Client-only Components](./client-only-components.md)
- Learn about [SSR Limitations](./ssr-limitations.md)
- Explore the [Components Reference](../components-reference.md)
