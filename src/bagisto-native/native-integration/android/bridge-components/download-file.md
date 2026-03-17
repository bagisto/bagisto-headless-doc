# Download File Component

The `DownloadFileComponent` enables downloading files from the web to the device's storage.

## Basic Info

- **Native Class**: `DownloadFileComponent.kt`
- **GitHub Path**: [DownloadFileComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/DownloadFileComponent.kt)

## Description

This component allows users to download files (PDFs, images, documents) directly to the device's download folder, with progress tracking and completion callbacks.

## How to Use

### 1. Web Implementation

```javascript
import { useDownload } from '@bagisto-native/react';

const DownloadComponent = () => {
    const { downloadFile } = useDownload();

    const handleDownload = () => {
        downloadFile({
            url: "https://example.com/invoice.pdf",
            fileName: "invoice.pdf",
            onProgress: (progress) => {
                console.log("Download progress:", progress + "%");
            },
            onComplete: (filePath) => {
                console.log("Downloaded to:", filePath);
            },
            onError: (error) => {
                console.log("Download failed:", error);
            }
        });
    };

    return <button onClick={handleDownload}>Download Invoice</button>;
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("downloadFile", DownloadFileComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `url` | String | Yes | URL to download |
| `fileName` | String | No | Custom file name |
| `onProgress` | Function | No | Progress callback (0-100) |
| `onComplete` | Function | No | Success callback |
| `onError` | Function | No | Error callback |

## Required Permissions

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## Next Steps

- [Share Component](./share.md) - Share downloaded files
- [Form Component](./form.md) - Handle form submissions
