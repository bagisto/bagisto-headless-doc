# Menu Component

The `MenuComponent` provides native menu support for bottom sheets, context menus, and dropdown menus.

## Basic Info

- **Native Class**: `MenuComponent.kt`
- **GitHub Path**: [MenuComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/MenuComponent.kt)

## Description

This component enables native menu interactions including bottom sheets, context menus, and dropdown menus.

## How to Use

### 1. Web Implementation

```javascript
import { useMenu } from '@bagisto-native/react';

const MenuComponent = () => {
    const { showMenu } = useMenu();

    const handleShowMenu = () => {
        showMenu({
            type: "bottomSheet", // or "contextMenu", "dropdown"
            title: "Product Options",
            items: [
                { id: "add", label: "Add to Cart", icon: "cart" },
                { id: "wishlist", label: "Add to Wishlist", icon: "heart" },
                { id: "share", label: "Share", icon: "share" }
            ],
            onSelect: (item) => {
                console.log("Selected:", item.id);
                // Handle menu item selection
            },
            onDismiss: () => {
                console.log("Menu dismissed");
            }
        });
    };

    return <button onClick={handleShowMenu}>Show Menu</button>;
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("menu", MenuComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | String | Yes | "bottomSheet", "contextMenu", or "dropdown" |
| `title` | String | No | Menu title |
| `items` | Array | Yes | Menu items with id, label, icon |
| `onSelect` | Function | Yes | Selection callback |
| `onDismiss` | Function | No | Dismiss callback |

## Menu Types

### Bottom Sheet
- Full-width sliding panel from bottom
- Best for primary actions
- Supports icons and descriptions

### Context Menu
- Appears at touch location
- Best for secondary actions
- Compact display

### Dropdown
- Anchored to specific view
- Best for filtered selections
- Appears below anchor point

## Next Steps

- [Alert Component](./alert.md) - Show alerts
- [Toast Component](./toast.md) - Show notifications
