# Image Search Component

The `ImageSearchComponent` provides a native bridge to the device's camera or photo library for image-based product discovery.

## Basic Info

- **Native Class**: `ImageSearchComponent.swift`
- **GitHub Path**: [ImageSearchComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/ImageSearchComponent.swift)

## Description

This component launches the native `UIImagePickerController` to capture or select an image. The resulting image is then processed (and optionally uploaded) to trigger a visual search on the your web backend.

## How to Use

### 1. Web Implementation
Trigger the image search process from your React component.

```javascript
import { useImageSearch } from '@bagisto-native/react';

const SearchByImage = () => {
    const { openImagePicker } = useImageSearch();

    const handleSearch = () => {
        openImagePicker((imageUrl) => {
            // Navigate to results or handle image URL
            window.location.href = `/search?image=${imageUrl}`;
        });
    };

    return <button onClick={handleSearch}>Search by Photo</button>;
};
```

### 2. Native Side
The component handles permissions and presents the `ImageSearchController`.

```swift
Hotwire.registerBridgeComponents([ImageSearchComponent.self])
```
