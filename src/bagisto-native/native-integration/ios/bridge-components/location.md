# Location Component

The `LocationComponent` synchronizes the webview's location and provides access to native iOS geo-location services.

## Basic Info

- **Native Class**: `LocationComponent.swift`
- **GitHub Path**: [LocationComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/LocationComponent.swift)

## Description

This component is used to manage location-based features, such as "Store Locator" or "Find Me," by bridging the `CLLocationManager` results to the webview. It also ensures the native app is aware of the current web URL for navigation tracking.

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
The component manages `CoreLocation` permissions and updates.

```swift
Hotwire.registerBridgeComponents([LocationComponent.self])
```
