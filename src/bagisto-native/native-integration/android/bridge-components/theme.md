# Theme Component

The `ThemeComponent` provides native theme support for dark/light mode, custom colors, and system theme detection.

## Basic Info

- **Native Class**: `ThemeComponent.kt`
- **GitHub Path**: [ThemeComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/ThemeComponent.kt)

## Description

This component manages native theming including system theme detection, manual theme switching, and custom color schemes.

## How to Use

### 1. Web Implementation

```javascript
import { useTheme } from '@bagisto-native/react';

const ThemeController = () => {
    const { 
        getSystemTheme, 
        setTheme, 
        getCurrentTheme,
        onThemeChange 
    } = useTheme();

    // Get current system theme
    useEffect(() => {
        const systemTheme = getSystemTheme();
        console.log("System theme:", systemTheme);
        
        // Listen for theme changes
        const unsubscribe = onThemeChange((theme) => {
            console.log("Theme changed to:", theme);
            // Update app theme
        });
        
        return () => unsubscribe();
    }, []);

    const handleThemeChange = (mode) => {
        setTheme(mode); // "light", "dark", or "system"
    };

    return (
        <div>
            <button onClick={() => handleThemeChange('light')}>Light</button>
            <button onClick={() => handleThemeChange('dark')}>Dark</button>
            <button onClick={() => handleThemeChange('system')}>System</button>
        </div>
    );
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("theme", ThemeComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `getSystemTheme()` | Function | No | Get current system theme |
| `setTheme(mode)` | Function | No | Set theme: "light", "dark", "system" |
| `getCurrentTheme()` | Function | No | Get current active theme |
| `onThemeChange(callback)` | Function | No | Listen for theme changes |

## Theme Modes

| Mode | Description |
|------|-------------|
| `light` | Force light theme |
| `dark` | Force dark theme |
| `system` | Follow system preference |

## Next Steps

- [Theme Mode Component](./theme-mode.md) - Detailed theme mode settings
- [Alert Component](./alert.md) - Show themed alerts
