# Share Component

The `ShareComponent` provides native sharing capabilities for text, URLs, images, and files.

## Basic Info

- **Native Class**: `ShareComponent.kt`
- **GitHub Path**: [ShareComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/ShareComponent.kt)

## Description

This component enables native share sheets for sharing content to other apps and platforms.

## How to Use

### 1. Web Implementation

```javascript
import { useShare } from '@bagisto-native/react';

const ShareButton = () => {
    const { share } = useShare();

    const handleShare = () => {
        share({
            title: "Check out this product",
            text: "I found this amazing product on the app!",
            url: "https://example.com/product/123",
            // Or share an image
            // image: "base64 encoded image or file:// path",
            onSuccess: () => {
                console.log("Share completed");
            },
            onError: (error) => {
                console.log("Share failed:", error);
            }
        });
    };

    return <button onClick={handleShare}>Share</button>;
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("share", ShareComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | String | No | Share sheet title |
| `text` | String | No | Text to share |
| `url` | String | No | URL to share |
| `image` | String | No | Image path or base64 |
| `file` | String | No | File path to share |
| `onSuccess` | Function | No | Success callback |
| `onError` | Function | No | Error callback |

## Share Types

### Text Share
```javascript
share({ text: "Hello World" });
```

### URL Share
```javascript
share({ 
    title: "Product Page",
    url: "https://example.com/product/123"
});
```

### Image Share
```javascript
share({ 
    image: "file:///path/to/image.jpg"
});
```

### File Share
```javascript
share({ 
    title: "Download Report",
    file: "file:///path/to/report.pdf"
});
```

## Next Steps

- [Download File Component](./download-file.md) - Download files
- [Form Component](./form.md) - Handle form submissions
