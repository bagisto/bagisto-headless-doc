# Search Component

The `SearchComponent` bridges web-based search inputs with the native iOS search experience.

## Basic Info

- **Native Class**: `SearchComponent.swift`
- **GitHub Path**: [SearchComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/SearchComponent.swift)

## Description

This component allows the native app to provide a focused search UI (like a native search bar in the header) that sends queries directly to the webview's search engine.

## How to Use

### 1. Web Implementation

```javascript
import { useSearch } from '@bagisto-native/react';

const Header = () => {
    const { onSearchQuery } = useSearch();

    useEffect(() => {
        // Listen for queries from the native search bar
        onSearchQuery((query) => {
            window.location.href = `/search?q=${query}`;
        });
    }, []);

    return <div>My Web Storefront</div>;
};
```

### 2. Native Side
The component typically activates the `UISearchController` in the `NavigationItem`.

```swift
Hotwire.registerBridgeComponents([SearchComponent.self])
```
