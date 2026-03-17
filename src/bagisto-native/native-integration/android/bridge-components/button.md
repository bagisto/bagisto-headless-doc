# Button Component

The `ButtonComponent` provides native button styling and interactions with platform-specific behaviors.

## Basic Info

- **Native Class**: `ButtonComponent.kt`
- **GitHub Path**: [ButtonComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/ButtonComponent.kt)

## Description

This component renders native buttons with Material Design styling, haptic feedback, and loading states.

## How to Use

### 1. Web Implementation

```javascript
import { useButton } from '@bagisto-native/react';

const NativeButton = ({ onClick }) => {
    const { buttonProps } = useButton({
        variant: "primary", // "primary", "secondary", "outline", "text"
        size: "medium", // "small", "medium", "large"
        fullWidth: false,
        loading: false,
        disabled: false,
        haptic: "light", // "light", "medium", "heavy", "none"
        onPress: onClick
    });

    return (
        <button {...buttonProps}>
            Add to Cart
        </button>
    );
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("button", ButtonComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `variant` | String | No | Button style: "primary", "secondary", "outline", "text" |
| `size` | String | No | Button size: "small", "medium", "large" |
| `fullWidth` | Boolean | No | Full-width button |
| `loading` | Boolean | No | Show loading state |
| `disabled` | Boolean | No | Disabled state |
| `haptic` | String | No | Haptic feedback type |
| `onPress` | Function | No | Press callback |

## Button Variants

| Variant | Description |
|---------|-------------|
| `primary` | Filled primary action button |
| `secondary` | Secondary filled button |
| `outline` | Outlined button |
| `text` | Text-only button |

## Button Sizes

| Size | Height | Use Case |
|------|--------|----------|
| `small` | 32dp | Compact UIs |
| `medium` | 40dp | Default |
| `large` | 48dp | Prominent actions |

## Next Steps

- [Alert Component](./alert.md) - Show alerts
- [Toast Component](./toast.md) - Show notifications
