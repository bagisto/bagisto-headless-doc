# Hotwire Search (`<hotwire-search>`)

The `hotwire-search` component integrates with native search functionality, allowing the web view to receive search queries processed by the native application.

::: tip
This is the core component that powers the Search feature in Bagisto Native. It is used only for creating the wrapper module. Do not use it directly in your application. For using with React/Next.js, kindly check the React wrapper component: [React Hotwire Search](../../bagisto-native-react/components-reference/hotwire-search.md)
:::

## What is Hotwire Search?

The `<hotwire-search>` is a custom Web Component from `@bagisto-native/core`. It provides a hidden bridge for handling search input and displaying results through the native layer.

When this component is included, it populates itself with hidden elements required by the bridge:

```html
<hotwire-search>
  <p data-controller="bridge--search" data-action="input->bridge--search#handleInput" style="display: none;">
    Search Form
    <div data-bridge--search-target="results"></div>
  </p>
</hotwire-search>
```

- **`data-controller="bridge--search"`**: Links to the Stimulus search controller.
- **`data-action="input->bridge--search#handleInput"`**: Connects input events to the bridge.
- **`data-bridge--search-target="results"`**: A target area for potential search result rendering.

## React Wrapper Syntax

The `@bagisto-native/react` module provides a simple wrapper for this component.

```tsx
import React from 'react';
import '@bagisto-native/core';

const HotwireSearch: React.FC = () => {
  return <hotwire-search style={{display: 'none'} as any}></hotwire-search>;
};

export default HotwireSearch;
```

## Integration in Next.js

Include the component in your layout or search-related pages using a dynamic import.

```tsx
'use client';

import dynamic from 'next/dynamic';

const HotwireSearch = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.HotwireSearch),
  { ssr: false }
);

export default function SearchLayout() {
  return <HotwireSearch />;
}
```

## Handling Search Results

The native app sends search data back to the web view via the `turbo:next-search` event. You should listen for this event to handle redirection or logic.

```ts
useEffect(() => {
  const handleTurboSearch = (e: Event) => {
    const customEvent = e as CustomEvent<{ query?: string; code?: string }>;
    const query = customEvent.detail.query || customEvent.detail.code;
    
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  window.addEventListener("turbo:next-search", handleTurboSearch);
  return () => window.removeEventListener("turbo:next-search", handleTurboSearch);
}, [router]);
```

## Ready Event & Race Conditions

To ensure the search bridge is ready, listen for the `bagisto-native:search-ready` event.

| Event Name | Frequency | Description |
| :--- | :--- | :--- |
| `bagisto-native:search-ready` | Dispatched once | Dispatched once the component connects and is ready. |

## Creating a Custom Wrapper

For other frameworks, simply import the core and render the tag:

```ts
import '@bagisto-native/core';
// Template: <hotwire-search style="display: none;"></hotwire-search>
```

## Next Steps

- Explore [Hotwire dynamic button](./dynamic-button.md)
- Learn about [Hotwire location](./hotwire-location.md)
- Understand [Utility Functions](../utility-functions.md)
