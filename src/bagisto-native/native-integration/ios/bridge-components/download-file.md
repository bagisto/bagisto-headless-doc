# Download File Component

The `DownloadFile` component enables the native iOS app to handle file downloads initiated from the webview.

## Basic Info

- **Native Class**: `DownloadFile.swift`
- **GitHub Path**: [DownloadFile.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/DownloadFile.swift)

## Description

When a download link is clicked in the webview, this component intercepts the request, presents a native progress indicator, and utilizes native iOS APIs to save or share the file.

## How to Use

### 1. Web Implementation
Simply trigger a download bridge event with the file URL.

```javascript
import { useDownloader } from '@bagisto-native/react';

const InvoiceDownload = ({ url }) => {
    const { downloadFile } = useDownloader();

    return (
        <button onClick={() => downloadFile(url, "invoice.pdf")}>
            Download PDF
        </button>
    );
};
```

### 2. Native Side
Registers a listener that captures download events and initiates a `URLSessionDownloadTask`.

```swift
Hotwire.registerBridgeComponents([DownloadFile.self])
```
