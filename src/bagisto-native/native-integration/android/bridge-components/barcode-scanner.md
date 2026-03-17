# Barcode Scanner Component

The `BarcodeScannerComponent` provides a bridge to the device's native camera for scanning barcodes and QR codes.

## Basic Info

- **Native Class**: `BarcodeScannerComponent.kt`
- **GitHub Path**: [BarcodeScannerComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/BarcodeScannerComponent.kt)

## Description

This component launches a native view equipped with ML Kit to scan various barcode types. Once a code is scanned, the result is sent back to the WebView via a bridge event.

## How to Use

### 1. Web Implementation

Trigger the scanner and listen for the result.

```javascript
import { useBarcodeScanner } from '@bagisto-native/react';

const ScannerComponent = () => {
    const { startScanning } = useBarcodeScanner();

    const handleScan = () => {
        startScanning((result) => {
            console.log("Scanned Code:", result.code);
            // Handle the scanned result
        });
    };

    return <button onClick={handleScan}>Open Scanner</button>;
};
```

### 2. Native Side

The component manages camera permissions and scanning.

```kotlin
navigator.registerBridgeComponent("barcodeScanner", BarcodeScannerComponent(this))
```

## Required Permissions

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="true" />
```

## API Reference

| Method | Description |
|--------|-------------|
| `startScanning(callback)` | Opens camera and returns scanned result |
| `stopScanning()` | Closes the scanner |

## Next Steps

- [Location Component](./location.md) - Add GPS features
- [Image Search](./image-search.md) - Search products by image
