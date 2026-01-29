# HotwireLocation

The `HotwireLocation` component enables the "Current Location" feature in the native app. When tapped, it fetches the user's GPS coordinates, reverse geocodes them, and fills the checkout form address fields automatically.

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `fieldNames` | `FieldNames` | A mapping object linking address types to your form input names. |

### FieldNames Type definition
```typescript
type FieldNames = {
    address: string[];  // Input names for Street Address
    city: string[];     // Input names for City
    postCode: string[]; // Input names for Zip/Postcode
}
```

## Example Usage

Place this component on your Checkout or Address Edit page.

```tsx
'use client';
import dynamic from "next/dynamic";

const HotwireLocation = dynamic(
    () => import('@bagisto-native/react').then(mod => mod.HotwireLocation),
    { ssr: false }
);

export default function CheckoutLocationHelper() {
    return (
        <HotwireLocation 
            style={{ display: 'none' }}
            fieldNames={{
                // Start with primary field, then fallbacks
                address: ["billing.address1", "shipping.address1", "address1"],
                city: ["billing.city", "shipping.city", "city"],
                postCode: ["billing.postcode", "shipping.postcode", "postcode"],
            }} 
        >
            Hotwire Location
        </HotwireLocation>
    );
}
```
## Handling Location Events

The `fieldNames` prop is optional. If you don't provide it, or if you want to perform custom logic with the geocoded address, you can listen for the `turbo:hotwire-app-fill-addresses` event.

### Custom Implementation Flow

1.  Add `HotwireLocation` to your page (even without props).
2.  The native app shows the location icon.
3.  On tap, the bridge fetches coordinates and reverse geocodes them.
4.  The bridge emits the `turbo:hotwire-app-fill-addresses` event.

### React Example: Custom Event Listener

```tsx
useEffect(() => {
    const handleLocationData = (e: Event) => {
        const customEvent = e as CustomEvent<{ data: any }>;
        const geocodedData = customEvent.detail.data;
        
        console.log("Geocoded Address:", geocodedData);
        // Do something with geocodedData.address.city, etc.
    };

    window.addEventListener("turbo:hotwire-app-fill-addresses", handleLocationData);
    return () => window.removeEventListener("turbo:hotwire-app-fill-addresses", handleLocationData);
}, []);
```

---

## Ready Event

| Event Name | Description |
| :--- | :--- |
| `bagisto-native:location-component-ready` | Emitted when the bridge component is initialized. |

## Next Steps

- Explore [HotwireHistorySync](./hotwire-history-sync.md)
- Learn about [HotwireThemeMode](./hotwire-theme-mode.md)
- Understand [Common Integration Patterns](../common-integration-patterns/app-level-providers.md)
