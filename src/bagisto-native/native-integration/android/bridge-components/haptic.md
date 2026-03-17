# Haptic Component

The `HapticComponent` provides access to native haptic feedback (vibration) on the device.

## Basic Info

- **Native Class**: `HapticComponent.kt`
- **GitHub Path**: [HapticComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/HapticComponent.kt)

## Description

This component allows the web application to trigger various haptic feedback patterns, such as light taps, heavy impacts, or success/error vibrations.

## How to Use

### 1. Web Implementation

```javascript
import { useHaptic } from '@bagisto-native/react';

const MyComponent = () => {
    const { triggerHaptic } = useHaptic();

    const onButtonPress = () => {
        triggerHaptic("light");
    };

    const onSuccess = () => {
        triggerHaptic("success");
    };

    const onError = () => {
        triggerHaptic("error");
    };

    return (
        <div>
            <button onClick={onButtonPress}>Tap</button>
            <button onClick={onSuccess}>Success</button>
            <button onClick={onError}>Error</button>
        </div>
    );
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("haptic", HapticComponent(this))
```

## API Reference

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | String | "light", "medium", "heavy", "success", "error", "warning" |

## Next Steps

- [Toast Component](./toast.md) - Show notifications
- [Alert Component](./alert.md) - Show dialogs
