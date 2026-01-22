# HotwireThemeMode

The `HotwireThemeMode` component aligns the Native App's UI (StatusBar, NavigationBar) with your web app's current theme (Dark/Light).

## Setup

Add the component to your app structure.

```tsx
'use client';
import dynamic from "next/dynamic";

const HotwireThemeMode = dynamic(
    () => import('@bagisto-native/react').then(mod => mod.HotwireThemeMode),
    { ssr: false }
);

export default function ThemeListener() {
    return <HotwireThemeMode />;
}
```

## Switching Themes

When your user toggles the theme, call the utility function.

```tsx
import { triggerThemeModeEvent } from "@bagisto-native/core";

function toggleTheme(newMode: 'light' | 'dark') {
    // 1. Update your web app state/context
    setTheme(newMode);
    
    // 2. Notify Native App
    triggerThemeModeEvent(newMode);
}
```

## Next Steps

- Learn about [App-level Providers](../common-integration-patterns/app-level-providers.md)
- Understand [Layout-level Integration](../common-integration-patterns/layout-level-integration.md)
- Explore [Native App Integration](../../native-integration/project-url-concept.md)
