# Navbar Button Component

The `NavbarButtonComponent` provides native navigation bar button support with badges and interactions.

## Basic Info

- **Native Class**: `NavbarButtonComponent.kt`
- **GitHub Path**: [NavbarButtonComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/NavbarButtonComponent.kt)

## Description

This component renders buttons in the native navigation bar with badge support and custom actions.

## How to Use

### 1. Web Implementation

```javascript
import { useNavbarButton } from '@bagisto-native/react';

const NavbarButton = ({ type, onClick }) => {
    const { buttonProps, setBadge, clearBadge } = useNavbarButton({
        position: "right", // "left" or "right"
        icon: "cart", // Icon name
        badge: 0, // Badge count (0 = hidden)
        haptic: true,
        onPress: onClick
    });

    // Update badge programmatically
    useEffect(() => {
        setBadge(5); // Show badge with 5
    }, []);

    return null; // Button is rendered in native navbar
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("navbarButton", NavbarButtonComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `position` | String | Yes | "left" or "right" |
| `icon` | String | Yes | Icon name |
| `badge` | Number | No | Badge count (0 hides) |
| `haptic` | Boolean | No | Enable haptic feedback |
| `onPress` | Function | No | Press callback |
| `setBadge(count)` | Function | No | Programmatically set badge |
| `clearBadge()` | Function | No | Clear badge |

## Available Icons

| Icon Name | Description |
|-----------|-------------|
| `cart` | Shopping cart |
| `search` | Search icon |
| `menu` | Menu icon |
| `back` | Back arrow |
| `close` | Close icon |
| `filter` | Filter icon |
| `heart` | Wishlist icon |
| `user` | Profile icon |

## Use Cases

- Cart button with item count badge
- Search button in navigation
- Filter toggle button
- Profile access button

## Next Steps

- [Menu Component](./menu.md) - Show menu
- [Navigation History](./navigation-history.md) - Handle navigation
