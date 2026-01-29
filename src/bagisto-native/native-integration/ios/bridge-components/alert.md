# Alert Component

The `AlertComponent` allows your web application to trigger native iOS alert dialogs for confirmations, warnings, or simple notifications.

## Basic Info

- **Native Class**: `AlertComponent.swift`
- **GitHub Path**: [AlertComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/AlertComponent.swift)

## Description

This component bridges the standard JavaScript `alert()` or `confirm()` functionality to a more polish, native `UIAlertController` on iOS. It supports custom titles, messages, and button actions.

## How to Use

### 1. Web Implementation
Use the `@bagisto-native/react` hook to trigger a native alert.

```javascript
import { useAlert } from '@bagisto-native/react';

const MyComponent = () => {
    const { showAlert } = useAlert();

    const triggerAlert = () => {
        showAlert({
            title: "Confirm Action",
            message: "Are you sure you want to proceed?",
            buttons: [
                { text: "Cancel", style: "cancel" },
                { text: "Proceed", style: "default", action: "proceed_confirmed" }
            ]
        });
    };

    return <button onClick={triggerAlert}>Show Native Alert</button>;
};
```

### 2. Native Side
Ensure the component is registered in your `AppDelegate`.

```swift
Hotwire.registerBridgeComponents([AlertComponent.self])
```

The native component will receive the payload and present the `UIAlertController`.
