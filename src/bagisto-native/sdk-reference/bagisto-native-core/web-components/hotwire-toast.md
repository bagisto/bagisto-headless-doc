# Hotwire Toast (`<hotwire-toast>`)

The `hotwire-toast` component allows you to trigger native toast messages from your web application. It acts as a bridge between the web environment and the native mobile application.

::: tip
This is the core component that powers the Toast feature in Bagisto Native. It is used only for creating the wrapper module. Do not use it directly in your application. For using with React/Next.js, kindly check the React wrapper component: [React Hotwire Toast](../../bagisto-native-react/components-reference/hotwire-toast.md)
:::

## What is Hotwire Toast?

The `<hotwire-toast>` is a custom Web Component provided by `@bagisto-native/core`. It serves as a hidden anchor in the DOM that communicates with the native app's bridge.

When this component is included in your project, the following element is added to the DOM:

```html
<hotwire-toast role="button" data-controller="bridge--toast" data-action="click->bridge--toast#show" style="display: none;"></hotwire-toast>
```

- **`role="button"`**: Defines the element's role.
- **`data-controller="bridge--toast"`**: Connects the component to the Stimulus bridge controller.
- **`data-action="click->bridge--toast#show"`**: Triggers the native toast when the element is "clicked" (via the bridge).
- **`style="display: none;"`**: The component is invisible as it doesn't have a UI of its own; it's purely functional.

## React Wrapper Syntax

If you are using React or Next.js, you should use the `HotwireToast` component provided by `@bagisto-native/react`. This component wraps the underlying Web Component for easier integration.

The internal syntax of the React wrapper is:

```tsx
import React from 'react';
import '@bagisto-native/core';

const HotwireToast: React.FC = () => {
  return <hotwire-toast style={{ display: 'none' } as any}></hotwire-toast>;
};

export default HotwireToast;
```

## Integration in Next.js

To use `HotwireToast` in a Next.js project, it is recommended to import it dynamically to ensure it only runs on the client side.

### Setup

1. **Install Dependencies**:
   ```bash
   npm install @bagisto-native/core @bagisto-native/react
   ```

2. **Add to Root Layout**:
   Include the component in your main layout or a global provider.

```tsx
'use client';

import React from "react";
import dynamic from "next/dynamic";

const HotwireToast = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.HotwireToast),
  { ssr: false }
);

export default function HotwireAppToastComponent() {
  return <HotwireToast />;
}
```

## Triggering a Toast

Once the component is mounted in your application, you can trigger a native toast from anywhere in your code using the utility function from `@bagisto-native/core`:

```ts
import { triggerHotwireNativeToast } from "@bagisto-native/core";

triggerHotwireNativeToast("Hello from Bagisto Native!");
```

> [!IMPORTANT]
> For `triggerHotwireNativeToast()` to work, the `<hotwire-toast>` component **must be present in the DOM**. If the component is not found, the function will not be able to communicate with the native bridge.

## Ready Event & Race Conditions

To ensure that the component is fully connected and ready to receive messages, you can listen for the `bagisto-native:toast-ready` event. This is particularly useful for solving race conditions where you might try to trigger a toast before the Web Component has finished initialization.

| Event Name | Frequency | Description |
| :--- | :--- | :--- |
| `bagisto-native:toast-ready` | Dispatched once | Dispatched once the component connects and is ready. |

### Example: Handling Race Conditions

```ts
window.addEventListener('bagisto-native:toast-ready', () => {
    console.log("Hotwire Toast is ready!");
    // Safe to trigger toasts now
});
```

::: warning Singleton
You should only have one instance of `<hotwire-toast>` in your DOM at any time.
:::

## Creating a Custom Wrapper

If you are not using React but want to create a similar wrapper for another framework (like Vue or Svelte), or simply want to wrap it yourself, you can follow this pattern:

1. **Import the Core Module**: Ensure `@bagisto-native/core` is imported to register the custom element.
2. **Render the Element**: Render the `<hotwire-toast>` tag with `display: none`.

### General Wrapper Logic

```ts
// 1. Register the Web Component
import '@bagisto-native/core';

// 2. Define your wrapper component/logic
// In your template/render function:
// <hotwire-toast style="display: none;"></hotwire-toast>
```

By wrapping the Web Component, you ensure that the required bridge attributes (like `data-controller` and `data-action`) are correctly set up by the core module while keeping your application code clean.

## Next Steps

- Explore [Hotwire search](./hotwire-search.md)
- Learn about [Hotwire location](./hotwire-location.md)
- Understand [Utility Functions](../utility-functions.md)

