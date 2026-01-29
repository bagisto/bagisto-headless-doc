# Hotwire Location (`<hotwire-location>`)

The `<hotwire-location>` component enables address autofill functionality using the device's GPS and Native Geocoder.

## Usage

The `<hotwire-location>` component enables location-based features in your application. When this component is present in the DOM:

1.  A **Location** icon appears in the native top navigation bar.
2.  When the user taps the icon, the native app fetches the current GPS coordinates.
3.  The bridge then performs reverse geocoding to convert coordinates into a human-readable address.
4.  The bridge emits a global `turbo:hotwire-app-fill-addresses` event containing the address data.

### Event Handling

If you are using the core module directly, you can listen for the location event on the `window` object to receive the address details.

```javascript
window.addEventListener("turbo:hotwire-app-fill-addresses", (event) => {
    const addressData = event.detail.data;
    console.log("Received location data:", addressData);
    
    // Example: Accessing city from the geocoded response
    const city = addressData.address.city;
    // Update your UI or store accordingly
});
```

---

## Example

```html
<hotwire-location style="display:none;"></hotwire-location>
```

## Ready Event

| Event Name | Frequency |
| :--- | :--- |
| `bagisto-native:location-component-ready` | Dispatched once the component connects and is ready. |

## Next Steps

- Explore [Hotwire history sync](./hotwire-history-sync.md)
- Learn about [Hotwire theme mode](./hotwire-theme-mode.md)
- Understand [When to Use Directly vs React Wrappers](./when-to-use-directly-vs-react-wrappers.md)
