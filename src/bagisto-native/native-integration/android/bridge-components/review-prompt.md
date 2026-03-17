# Review Prompt Component

The `ReviewPromptComponent` manages in-app review prompts using Android's In-App Review API.

## Basic Info

- **Native Class**: `ReviewPromptComponent.kt`
- **GitHub Path**: [ReviewPromptComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/ReviewPromptComponent.kt)

## Description

This component triggers Google Play's in-app review flow, allowing users to rate the app without leaving it.

## How to Use

### 1. Web Implementation

```javascript
import { useReviewPrompt } from '@bagisto-native/react';

const ReviewButton = () => {
    const { requestReview, canRequestReview } = useReviewPrompt();

    const handleReviewRequest = async () => {
        if (await canRequestReview()) {
            const result = await requestReview({
                onComplete: (rating) => {
                    console.log("Review completed with rating:", rating);
                },
                onError: (error) => {
                    console.log("Review failed:", error);
                }
            });
        } else {
            console.log("Review not available yet");
        }
    };

    return <button onClick={handleReviewRequest}>Rate App</button>;
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("reviewPrompt", ReviewPromptComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `requestReview()` | Function | Yes | Trigger review flow |
| `canRequestReview()` | Function | No | Check if review is available |
| `onComplete` | Function | No | Callback when review completes |
| `onError` | Function | No | Error callback |

## Usage Guidelines

Google enforces limits on how often users can be prompted:

- Maximum 1 review request per user per month
- App must be installed for at least 24 hours
- User must have used the app for a sufficient time

## Best Practices

1. **Timing**: Prompt after positive user experiences
2. **Frequency**: Don't over-prompt, respect limits
3. **UX**: Never interrupt critical flows

## Next Steps

- [Share Component](./share.md) - Share app with friends
- [Location Component](./location.md) - Add location features
