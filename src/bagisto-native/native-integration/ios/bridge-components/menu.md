# Menu Component

The `MenuComponent` enables the web application to control native menu elements like side drawers or tab bars.

## Basic Info

- **Native Class**: `MenuComponent.swift`
- **GitHub Path**: [MenuComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/MenuComponent.swift)

## Description

Use this component to programmatically open or close the native side menu (drawer) or to update the state of the native navigation elements based on web events.

## How to Use

### 1. Web Implementation

```javascript
import { useMenu } from '@bagisto-native/react';

const Header = () => {
    const { toggleDrawer } = useMenu();

    return (
        <button onClick={() => toggleDrawer(true)}>
            Open Native Menu
        </button>
    );
};
```

### 2. Native Side
The component interacts with the `LeftDrawerVC` or the root `NavigationController` to toggle the menu state.

```swift
Hotwire.registerBridgeComponents([MenuComponent.self])
```
