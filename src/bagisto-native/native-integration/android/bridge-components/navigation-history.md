# Navigation History Component

The `NavigationHistoryComponent` manages navigation stack and allows programmatic navigation control.

## Basic Info

- **Native Class**: `NavigationHistoryComponent.kt`
- **GitHub Path**: [NavigationHistoryComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/NavigationHistoryComponent.kt)

## Description

This component provides access to navigation history, enabling go-back, go-forward, and stack inspection functionality.

## How to Use

### 1. Web Implementation

```javascript
import { useNavigationHistory } from '@bagisto-native/react';

const NavigationControls = () => {
    const { canGoBack, canGoForward, goBack, goForward, getHistory } = useNavigationHistory();

    const handleBack = () => {
        if (canGoBack()) {
            goBack();
        }
    };

    const handleHistoryCheck = async () => {
        const history = await getHistory();
        console.log("Navigation history:", history);
    };

    return (
        <div>
            <button onClick={handleBack} disabled={!canGoBack()}>
                Back
            </button>
            <button onClick={goForward} disabled={!canGoForward()}>
                Forward
            </button>
            <button onClick={handleHistoryCheck}>
                View History
            </button>
        </div>
    );
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("navigationHistory", NavigationHistoryComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `canGoBack()` | Function | No | Check if back navigation possible |
| `canGoForward()` | Function | No | Check if forward navigation possible |
| `goBack()` | Function | No | Navigate back in stack |
| `goForward()` | Function | No | Navigate forward in stack |
| `getHistory()` | Function | No | Get full navigation history |

## Navigation Events

The component also emits events for navigation state changes:

```javascript
import { useEffect } from 'react';
import { useEventListener } from '@bagisto-native/react';

const NavigationListener = () => {
    useEventListener('navigationChanged', (event) => {
        console.log("Navigation changed:", event.detail);
        // Handle navigation state change
    });

    return null;
};
```

## Use Cases

- Custom navigation buttons
- Swipe-back gesture handling
- Deep link interception
- Navigation state persistence

## Next Steps

- [Theme Component](./theme.md) - Customize appearance
- [Haptic Component](./haptic.md) - Add tactile feedback
