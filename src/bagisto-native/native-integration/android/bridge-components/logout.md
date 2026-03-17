# Logout Component

The `LogoutComponent` handles user logout with secure session clearing and navigation.

## Basic Info

- **Native Class**: `LogoutComponent.kt`
- **GitHub Path**: [LogoutComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/LogoutComponent.kt)

## Description

This component manages user logout, clearing tokens, cached data, and redirecting to login.

## How to Use

### 1. Web Implementation

```javascript
import { useLogout } from '@bagisto-native/react';

const LogoutButton = () => {
    const { logout, isLoggingOut } = useLogout();

    const handleLogout = async () => {
        await logout({
            clearTokens: true,
            clearCache: true,
            redirectTo: "/login",
            onComplete: () => {
                console.log("Logged out successfully");
            },
            onError: (error) => {
                console.log("Logout failed:", error);
            }
        });
    };

    return (
        <button onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
    );
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("logout", LogoutComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `clearTokens` | Boolean | No | Clear auth tokens (default: true) |
| `clearCache` | Boolean | No | Clear cached data (default: true) |
| `redirectTo` | String | No | Redirect URL after logout |
| `onComplete` | Function | No | Success callback |
| `onError` | Function | No | Error callback |

## Data Cleared on Logout

| Data Type | Cleared by Default |
|-----------|---------------------|
| Auth Tokens | Yes |
| Refresh Tokens | Yes |
| User Session | Yes |
| Cart Data | Optional |
| Wishlist | Optional |
| Cached API Responses | Optional |

## Next Steps

- [Theme Component](./theme.md) - Customize appearance
- [Navigation History](./navigation-history.md) - Manage navigation
