# Button Component

The `ButtonComponent` handles interactions for both custom buttons in the webview and native navigation bar buttons.

## Basic Info

- **Native Class**: `ButtonComponent.swift` / `NavBarButton.swift`
- **GitHub Path**: [ButtonComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/ButtonComponent.swift)

## Description

This component is used to synchronize the state and actions of buttons between the web and native layers. It's particularly useful for adding buttons to the iOS navigation bar that trigger web actions.

## How to Use

### 1. Web Implementation
Register a button that should appear in the native navigation bar.

```javascript
import { NavBarButton } from '@bagisto-native/react';

const Page = () => {
    const handleShare = () => {
        // Share logic
    };

    return (
        <>
            <NavBarButton 
                id="share-button" 
                title="Share" 
                image="square.and.arrow.up" 
                onClick={handleShare} 
            />
            <div>Page Content</div>
        </>
    );
};
```

### 2. Native Side
The `NavBarButton` component on the native side will inject the button into the `navigationItem.rightBarButtonItems`.

```swift
Hotwire.registerBridgeComponents([ButtonComponent.swift])
```
