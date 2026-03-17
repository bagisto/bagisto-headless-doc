# Toast Component

The `ToastComponent` allows the web application to display non-intrusive native success, error, or informational messages.

## Basic Info

- **Native Class**: `ToastComponent.kt`
- **GitHub Path**: [ToastComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native/library/components/ToastComponent.kt)

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

The native component receives the message and presents the toast.

```kotlin
navigator.registerBridgeComponent("toast", ToastComponent(this))
```

## API Reference

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | String | Yes | Toast message text |
| `duration` | String | No | "short" (2s) or "long" (3.5s) |
| `type` | String | No | "success", "error", "info" |

## Next Steps

- [Alert Component](./alert.md) - Show dialogs
- [Haptic Component](./haptic.md) - Add vibration feedback
