# Toast Component

The `ToastComponent` allows the web application to display non-intrusive native success, error, or informational messages.

## Basic Info

- **Native Class**: `ToastComponent.swift`
- **GitHub Path**: [ToastComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/ToastComponent.swift)

## Description

This component presents a custom native view overlay that fades in and out. It is ideal for providing quick feedback on background actions like "Add to Cart" or "Coupon Applied."

## How to Use

### 1. Web Implementation

```javascript
import { useToast } from '@bagisto-native/react';

const MyComponent = () => {
    const { showToast } = useToast();

    const notify = () => {
        showToast("Success", "Settings saved natively!", "success");
    };

    return <button onClick={notify}>Save Settings</button>;
};
```

### 2. Native Side
The native component receives the message and presents the `ToastView`.

```swift
Hotwire.registerBridgeComponents([ToastComponent.self])
```
