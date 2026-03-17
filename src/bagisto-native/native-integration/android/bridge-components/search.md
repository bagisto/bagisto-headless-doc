# Search Component

The `SearchComponent` provides native search UI with voice input and suggestions.

## Basic Info

- **Native Class**: `SearchComponent.kt`
- **GitHub Path**: [SearchComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/SearchComponent.kt)

## Description

This component provides native search functionality with voice input, recent searches, and suggestions.

## How to Use

### 1. Web Implementation

```javascript
import { useSearch } from '@bagisto-native/react';

const SearchBar = () => {
    const { 
        openSearch, 
        setSuggestions, 
        clearHistory,
        getRecentSearches 
    } = useSearch();

    const handleSearch = (query) => {
        console.log("Searching for:", query);
        // Perform search
    };

    const handleVoiceSearch = () => {
        openSearch({
            mode: "voice",
            onResult: (query) => {
                handleSearch(query);
            }
        });
    };

    const handleTextSearch = () => {
        openSearch({
            mode: "text",
            placeholder: "Search products...",
            suggestions: ["iPhone", "Samsung", "Laptop"],
            onQuery: handleSearch,
            onRecentSearches: async () => {
                const recent = await getRecentSearches();
                return recent;
            }
        });
    };

    return (
        <button onClick={handleTextSearch}>
            Open Search
        </button>
    );
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("search", SearchComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `mode` | String | No | "text" or "voice" |
| `placeholder` | String | No | Search placeholder |
| `suggestions` | Array | No | Auto-complete suggestions |
| `onQuery` | Function | Yes | Search callback |
| `onResult` | Function | No | Voice result callback |
| `getRecentSearches()` | Function | No | Get search history |
| `clearHistory()` | Function | No | Clear search history |

## Search Modes

| Mode | Description |
|------|-------------|
| `text` | Standard text input with suggestions |
| `voice` | Voice input using speech recognition |

## Required Permissions

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

## Next Steps

- [Image Search Component](./image-search.md) - Search by image
- [Barcode Scanner](./barcode-scanner.md) - Scan product barcodes
