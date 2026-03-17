# Hotwire Theme Mode (`<hotwire-theme-mode>`)

The `hotwire-theme-mode` component synchronizes the web application's theme (Dark/Light) with the Native App's UI, ensuring a consistent user experience during theme transitions.

::: tip
This is the core component that powers the Theme Mode feature in Bagisto Native. It is used only for creating the wrapper module. Do not use it directly in your application. For using with React/Next.js, kindly check the React wrapper component: [React Hotwire Theme Mode](../../bagisto-native-react/components-reference/hotwire-theme-mode.md)
:::

## What is Hotwire Theme Mode?

The `<hotwire-theme-mode>` is a custom Web Component from `@bagisto-native/core`. It acts as a bridge to notify the native application when the web-view theme changes, allowing the app to adjust its native navigation and status bars.

When included, the following element is added to the DOM:

```html
<hotwire-theme-mode role="button" data-controller="bridge--thememode" data-action="click->bridge--thememode#handleClick" style="display: none;"></hotwire-theme-mode>
```

- **`data-controller="bridge--thememode"`**: Connects the component to the Stimulus theme bridge.
- **`data-action="click->bridge--thememode#handleClick"`**: Triggers the sync action.
- **`style="display: none;"`**: The component is functional and hidden from view.

## React Wrapper Syntax

The `@bagisto-native/react` module provides a simple wrapper to easily integrate theme syncing.

```tsx
import React from 'react';
import '@bagisto-native/core';

const HotwireThemeMode: React.FC = () => {
  return <hotwire-theme-mode style={{display: 'none'} as any}></hotwire-theme-mode>;
};

export default HotwireThemeMode;
```

## Integration in Next.js

Include this component in your root layout or a global theme provider.

```tsx
'use client';

import dynamic from 'next/dynamic';

const HotwireThemeMode = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.HotwireThemeMode),
  { ssr: false }
);

export default function ThemeSyncProvider() {
  return <HotwireThemeMode />;
}
```

## Triggering Theme Changes

### Utility Function

Use the `triggerThemeModeEvent` utility from `@bagisto-native/core` to programmatically update the native theme.

```ts
import { triggerThemeModeEvent } from "@bagisto-native/core";

// Switch native app to dark mode
triggerThemeModeEvent("dark");

// Switch native app to light mode
triggerThemeModeEvent("light");
```

## Ready Event & Race Conditions

Listen for the `bagisto-native:theme-mode-ready` event to ensure the bridge is ready.

| Event Name | Frequency | Description |
| :--- | :--- | :--- |
| `bagisto-native:theme-mode-ready` | Dispatched once | Dispatched once the component connects and is ready. |

## Creating a Custom Wrapper

For custom implementations:

```ts
import '@bagisto-native/core';
// Template: <hotwire-theme-mode style="display: none;"></hotwire-theme-mode>
```

## Next Steps

- Explore [Utility Functions](../utility-functions.md)
- Learn about [Best Practices](../best-practices.md)
