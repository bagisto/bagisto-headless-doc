# Review Prompt Component

The `ReviewPromptComponent` allows the web application to trigger the standard native iOS "Rate this App" dialog.

## Basic Info

- **Native Class**: `ReviewPromptComponent.swift`
- **GitHub Path**: [ReviewPromptComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/ReviewPromptComponent.swift)

## Description

This component wraps the `SKStoreReviewController.requestReview()` method. It is highly recommended to trigger this only after a positive user action, such as a successful order placement.

## How to Use

### 1. Web Implementation

```javascript
import { useReviewPrompt } from '@bagisto-native/react';

const OrderSuccess = () => {
    const { requestReview } = useReviewPrompt();

    useEffect(() => {
        // Request review after 2 seconds on order success
        const timer = setTimeout(() => requestReview(), 2000);
        return () => clearTimeout(timer);
    }, []);

    return <div>Thank you for your order!</div>;
};
```

### 2. Native Side
The native component calls the StoreKit review API. Note that iOS limits how often this prompt can be shown.

```swift
Hotwire.registerBridgeComponents([ReviewPromptComponent.self])
```
