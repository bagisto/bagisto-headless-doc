# Image Search Component

The `ImageSearchComponent` provides ML Kit-powered image recognition for visual product search.

## Basic Info

- **Native Class**: `ImageSearchComponent.kt`
- **GitHub Path**: [ImageSearchComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/ImageSearchComponent.kt)

## Description

This component allows users to take or select photos and search for similar products using ML Kit's image recognition capabilities.

## How to Use

### 1. Web Implementation

```javascript
import { useImageSearch } from '@bagisto-native/react';

const SearchComponent = () => {
    const { searchByImage } = useImageSearch();

    const handleImageSearch = () => {
        searchByImage({
            source: "camera", // or "gallery"
            onResults: (results) => {
                console.log("Found products:", results);
                // Display matching products
            },
            onError: (error) => {
                console.log("Search failed:", error);
            }
        });
    };

    return <button onClick={handleImageSearch}>Search by Image</button>;
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("imageSearch", ImageSearchComponent(this))
```

## Required Permissions

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `source` | String | No | "camera" or "gallery" |
| `onResults` | Function | Yes | Callback with search results |
| `onError` | Function | No | Error callback |

## Next Steps

- [Barcode Scanner](./barcode-scanner.md) - Scan product barcodes
- [Location Component](./location.md) - Add location features
