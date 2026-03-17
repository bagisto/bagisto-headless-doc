# Hotwire Location (`<hotwire-location>`)

The `hotwire-location` component enables address autofill functionality using the device's GPS and Native Geocoder.

::: tip
This is the core component that powers the Location feature in Bagisto Native. It is used only for creating the wrapper module. Do not use it directly in your application. For using with React/Next.js, kindly check the React wrapper component: [React Hotwire Location](../../bagisto-native-react/components-reference/hotwire-location.md)
:::

## What is Hotwire Location?

The `<hotwire-location>` is a custom Web Component from `@bagisto-native/core`. It registers the current page as "location-enabled," causing a location icon to appear in the native app's navigation bar.

When included, the following element is added to the DOM:

```html
<hotwire-location role="button" data-controller="bridge--location" style="display: none;"></hotwire-location>
```

- **`data-controller="bridge--location"`**: Connects the component to the native location bridge.
- **`style="display: none;"`**: The component performs its work in the background and is not visible in the web view.

## React Wrapper Syntax

The `HotwireLocation` wrapper in `@bagisto-native/react` provides an automated way to map native address data to your web forms.

```tsx
import React from 'react';
import '@bagisto-native/core';

export interface HotwireLocationProps extends React.HTMLAttributes<HTMLElement> {
  fieldNames: {
    address: string[];   // Array of input names for address fields
    city: string[];      // Array of input names for city fields
    postCode: string[];  // Array of input names for postcode fields
  };
}

const HotwireLocation: React.FC<HotwireLocationProps> = ({ fieldNames, children, ...rest }) => {
    // Automatically handles the turbo:hotwire-app-fill-addresses event
    // and populates matching form fields.
};
```

## Integration in Next.js

Include the component on checkout or address form pages. Use `dynamic` imports to ensure it runs only on the client.

```tsx
'use client';

import dynamic from 'next/dynamic';

const HotwireLocation = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.HotwireLocation),
  { ssr: false }
);

export default function CheckoutForm() {
  const fieldNames = {
    address: ["billing.address", "shipping.address"],
    city: ["billing.city", "shipping.city"],
    postCode: ["billing.postcode", "shipping.postcode"],
  };

  return <HotwireLocation fieldNames={fieldNames} />;
}
```

## Handling Location Data

When the user taps the native location icon, the native app sends an event:

- **`turbo:hotwire-app-fill-addresses`**: Contains a standard geocoded address object.

### Manual Event Handling

If you are not using the React wrapper, you can listen for the event manually:

```ts
window.addEventListener("turbo:hotwire-app-fill-addresses", (e: any) => {
    const data = e.detail.data;
    const address = data.display_name;
    const city = data.address.city || data.address.town;
    // Map data to your form fields
});
```

## Ready Event & Race Conditions

Listen for the `bagisto-native:location-ready` event to ensure the bridge is ready.

| Event Name | Frequency | Description |
| :--- | :--- | :--- |
| `bagisto-native:location-ready` | Dispatched once | Dispatched once the component connects and is ready. |

## Creating a Custom Wrapper

For custom implementations:

```ts
import '@bagisto-native/core';
// Template: <hotwire-location style="display: none;"></hotwire-location>
```

## Next Steps

- Explore [Hotwire history sync](./hotwire-history-sync.md)
- Learn about [Hotwire theme mode](./hotwire-theme-mode.md)
- Understand [Utility Functions](../utility-functions.md)
