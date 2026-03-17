# Theme Mode Component

The `ThemeModeComponent` provides granular control over theme settings and persistence.

## Basic Info

- **Native Class**: `ThemeModeComponent.kt`
- **GitHub Path**: [ThemeModeComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/ThemeModeComponent.kt)

## Description

This component extends theme functionality with custom colors, font scaling, and persistence options.

## How to Use

### 1. Web Implementation

```javascript
import { useThemeMode } from '@bagisto-native/react';

const ThemeSettings = () => {
    const { 
        setThemeMode, 
        getThemeMode,
        setCustomColors,
        setFontScale,
        persistTheme 
    } = useThemeMode();

    const handleModeChange = async () => {
        const mode = await getThemeMode();
        console.log("Current mode:", mode);
    };

    const handleCustomTheme = () => {
        setThemeMode("custom");
        setCustomColors({
            primary: "#FF5722",
            secondary: "#03A9F4",
            background: "#FFFFFF",
            surface: "#F5F5F5"
        });
    };

    const handleFontScale = () => {
        setFontScale(1.2); // 120% scale
    };

    const handlePersist = () => {
        persistTheme(); // Save current theme to storage
    };

    return (
        <div>
            <button onClick={handleModeChange}>Get Mode</button>
            <button onClick={handleCustomTheme}>Custom Theme</button>
            <button onClick={handleFontScale}>Set Font</button>
            <button onClick={handlePersist}>Save Theme</button>
        </div>
    );
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("themeMode", ThemeModeComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `setThemeMode(mode)` | Function | No | Set mode: "light", "dark", "system", "custom" |
| `getThemeMode()` | Function | No | Get current theme mode |
| `setCustomColors(colors)` | Function | No | Set custom color scheme |
| `setFontScale(scale)` | Function | No | Set font scale (0.8-2.0) |
| `persistTheme()` | Function | No | Save theme to storage |

## Theme Modes

| Mode | Description |
|------|-------------|
| `light` | Force light theme |
| `dark` | Force dark theme |
| `system` | Follow system preference |
| `custom` | Custom color scheme |

## Custom Colors

| Property | Type | Description |
|----------|------|-------------|
| `primary` | String | Primary color (hex) |
| `secondary` | String | Secondary color (hex) |
| `background` | String | Background color (hex) |
| `surface` | String | Surface color (hex) |
| `text` | String | Text color (hex) |

## Next Steps

- [Theme Component](./theme.md) - Basic theme control
- [Alert Component](./alert.md) - Show themed alerts
