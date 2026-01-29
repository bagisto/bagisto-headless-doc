# Haptic Component

The `HapticComponent` allows the web application to trigger native iOS haptic feedback (tactile vibrations).

## Basic Info

- **Native Class**: `HapticComponent.swift`
- **GitHub Path**: [HapticComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/HapticComponent.swift)

## Description

This component uses the `UIImpactFeedbackGenerator` and `UINotificationFeedbackGenerator` APIs to provide physical feedback to the user for specific actions.

## How to Use

### 1. Web Implementation

```javascript
import { useHaptics } from '@bagisto-native/react';

const PaymentButton = () => {
    const { triggerHaptic } = useHaptics();

    const handleSuccess = () => {
        triggerHaptic("success"); // Triggers success vibration
    };

    return <button onClick={handleSuccess}>Pay Now</button>;
};
```

### 2. Native Side
The component receives the "type" (success, warning, error, light, medium, heavy) and executes the corresponding native feedback.

```swift
Hotwire.registerBridgeComponents([HapticComponent.self])
```
