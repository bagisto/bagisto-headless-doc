# Location Component

The `LocationComponent` synchronizes the WebView's location and provides access to native Android geo-location services.

## Basic Info

- **Native Class**: `LocationComponent.kt`
- **GitHub Path**: [LocationComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native/library/components/LocationComponent.kt)

## Description

This component is used to manage location-based features, such as "Store Locator" or "Find Me," by bridging the `FusedLocationProviderClient` results to the WebView. It also ensures the native app is aware of the current web URL for navigation tracking.

## How to Use

### 1. Web Implementation

```javascript
import { useLocation } from '@bagisto-native/react';

const NearMe = () => {
    const { getCurrentPosition } = useLocation();

    const findStores = () => {
        getCurrentPosition((pos) => {
            console.log("Lat:", pos.latitude, "Lng:", pos.longitude);
        });
    };

    return <button onClick={findStores}>Find Stores Nearby</button>;
};
```

### 2. Native Side

The component manages location permissions and updates.

```kotlin
navigator.registerBridgeComponent("location", LocationComponent(this))
```

## Required Permissions

Add these to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

## API Reference

| Method | Description |
|--------|-------------|
| `getCurrentPosition()` | Returns current latitude and longitude |
| `watchPosition()` | Continuously watch location changes |
| `clearWatch()` | Stop watching location |

## Next Steps

- [Alert Component](./alert.md) - Show dialogs
- [Barcode Scanner](./barcode-scanner.md) - Scan product barcodes
