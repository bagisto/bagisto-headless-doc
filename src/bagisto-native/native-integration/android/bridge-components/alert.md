# Alert Component

The `AlertComponent` allows your web application to trigger native Android alert dialogs for confirmations, warnings, or simple notifications.

## Basic Info

- **Native Class**: `AlertComponent.kt`
- **GitHub Path**: [AlertComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native/library/components/AlertComponent.kt)

## Description

This component bridges the standard JavaScript `alert()` or `confirm()` functionality to a more polished, native `AlertDialog` on Android. It supports custom titles, messages, and button actions.

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

Ensure the component is registered in your `MainActivity`.

```kotlin
navigator.registerBridgeComponent("alert", AlertComponent(this))
```

The native component will receive the payload and present the `AlertDialog`.

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | String | No | Dialog title |
| `message` | String | No | Dialog message |
| `buttons` | Array | No | Button configurations |

## Button Configuration

| Property | Type | Description |
|----------|------|-------------|
| `text` | String | Button label |
| `style` | String | "default", "cancel", "destructive" |
| `action` | String | Action identifier for callback |

## Next Steps

- [Toast Component](./toast.md) - Show brief notifications
- [Component Registration](./registration.md) - Register more components
