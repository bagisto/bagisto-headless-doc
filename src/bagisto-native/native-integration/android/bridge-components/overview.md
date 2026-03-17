# Bridge Components Overview

This section documents all available native bridge components for Android.

## What Are Bridge Components?

Bridge components are native Android modules that provide specific functionality accessible from the web layer. They enable the web application to leverage native device capabilities.

## Available Components

### Core Components

| Component | Description |
|-----------|-------------|
| [Alert](./alert.md) | Show native alerts and dialogs |
| [Toast](./toast.md) | Display temporary notifications |
| [Button](./button.md) | Native button styling and interactions |
| [Menu](./menu.md) | Bottom sheets and context menus |
| [Form](./form.md) | Native form with autofill support |

### Navigation Components

| Component | Description |
|-----------|-------------|
| [Navigation History](./navigation-history.md) | Manage navigation stack |
| [Navbar Button](./navbar-button.md) | Navigation bar buttons with badges |

### Device Features

| Component | Description |
|-----------|-------------|
| [Location](./location.md) | GPS and location services |
| [Barcode Scanner](./barcode-scanner.md) | Scan product barcodes |
| [Image Search](./image-search.md) | ML-based image recognition |
| [Haptic](./haptic.md) | Tactile feedback |

### Media & Files

| Component | Description |
|-----------|-------------|
| [Download File](./download-file.md) | Download files to device |
| [Share](./share.md) | Native share sheet |
| [Search](./search.md) | Native search with voice |

### User Experience

| Component | Description |
|-----------|-------------|
| [Theme](./theme.md) | Dark/light mode support |
| [Theme Mode](./theme-mode.md) | Custom theme settings |
| [Review Prompt](./review-prompt.md) | In-app review requests |

### Account

| Component | Description |
|-----------|-------------|
| [Logout](./logout.md) | Secure logout handling |

## Registration

Each component must be registered in the native app:

```kotlin
navigator.registerBridgeComponent("componentName", ComponentClass(this))
```

See [Registration Guide](./registration.md) for detailed setup instructions.

## Next Steps

- [Getting Started](../getting-started.md) - Set up Android integration
- [Registration](./registration.md) - Register components
- [Bridge Components (iOS)](../ios/bridge-components/overview.md) - iOS equivalents
