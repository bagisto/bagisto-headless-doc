# Barcode Scanner Component

The `BarcodeScannerComponent` provides a bridge to the device's native camera for scanning barcodes and QR codes.

## Basic Info

- **Native Class**: `BarcodeScannerComponent.swift`
- **GitHub Path**: [BarcodeScannerComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/BarcodeScannerComponent.swift)

## Description

This component launches a native view controller equipped with `AVFoundation` to scan various barcode types. Once a code is scanned, the result is sent back to the webview via a bridge event.

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
The `BarcodeScannerComponent` manages the transition to `BarcodeScannerViewController`.

```swift
// Registered via coreComponents or individually
Hotwire.registerBridgeComponents([BarcodeScannerComponent.self])
```
