# What it Provides

The `@bagisto-native/core` package delivers a comprehensive set of tools to bridge the gap between web and native.

## 1. Hotwire Bridge Bundle

The most critical asset is the `bundle.js`. This file contains the compiled Stimulus controllers and the `@hotwired/hotwire-native-bridge` logic.

*   **Location**: `node_modules/@bagisto-native/core/public/bundle.js`
*   **Purpose**: Must be included in your public assets to enable native communication.

## 2. Web Components (Custom Elements)

The package registers several custom elements that automatically attach to the Stimulus controllers defined in the bundle.

| Component | Selector | Description |
| :--- | :--- | :--- |
| **Dynamic Button** | `<dynamic-button>` | Multifunctional button for native actions (Share, Cart, etc.). |
| **Toast** | `<hotwire-toast>` | Triggers native system toast notifications. |
| **Search** | `<hotwire-search>` | Invokes the native search interface. |
| **Location** | `<hotwire-location>` | Accesses native location services for address autofill. |
| **History Sync** | `<hotwire-history-sync>` | Synchronizes web navigation URL with the native navigation stack. |
| **Theme Mode** | `<hotwire-theme-mode>` | Syncs light/dark mode preference with the native app. |

## 3. Utility Functions

A suite of TypeScript/JavaScript helper functions is provided to trigger native events programmatically.

::: tip Import Usage
All utilities can be imported directly from the package root.
:::

```typescript
import { 
  triggerHotwireNativeToast, 
  triggerHistorySyncEvent, 
  triggerThemeModeEvent,
  triggerCartCountValue,
  isTurboNativeUserAgent
} from "@bagisto-native/core";
```

### `triggerHotwireNativeToast(message: string)`
Displays a native toast message.
```typescript
triggerHotwireNativeToast("Item added to cart!");
```

### `isTurboNativeUserAgent()`
Detects if the current user agent is the Bagisto Native app. Useful for conditionally rendering UI.
```typescript
if (isTurboNativeUserAgent()) {
    // Render specific native UI
}
```

### `triggerCartCountValue(count: number)`
Updates the native cart badge count.
```typescript
triggerCartCountValue(5);
```

## Next Steps

- Learn about [When to use](./when-to-use.md)
- Explore the [React Package](../react-package.md)
- Understand the [Core Module](../../core-module/core-overview.md)
