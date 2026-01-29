# Theme Component

The `ThemeComponent` synchronizes the visual theme (Light/Dark mode) between the iOS system settings and the web application.

## Basic Info

- **Native Class**: `ThemeComponent.swift`
- **GitHub Path**: [ThemeComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/ThemeComponent.swift)

## Description

This component detects changes in the iOS `traitCollection` (User Interface Style) and informs the webview via a bridge event so it can toggle its CSS classes or theme provider.

## How to Use

### 1. Web Implementation

```javascript
import { useThemeSync } from '@bagisto-native/react';

const App = ({ children }) => {
    // Automatically listens for 'theme-changed' events from iOS
    useThemeSync();

    return <main className="theme-aware-container">{children}</main>;
};
```

### 2. Native Side
The component overrides `traitCollectionDidChange` and sends the current mode to the web.

```swift
Hotwire.registerBridgeComponents([ThemeComponent.self])
```
