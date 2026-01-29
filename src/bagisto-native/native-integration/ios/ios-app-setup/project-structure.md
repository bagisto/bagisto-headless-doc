# Project Structure

The iOS Native App project follows a standard Swift Package Manager (SPM) layout with an added Example application for testing.

## Directory Breakdown

### 1. `Sources/BagistoNative_iOS/`
The core library content. This is where the bridge components and shared logic live.
- **Components**: The native implementations that mirror your web components.
- **Extensions**: Helpers for Hotwire and standard library classes.

### 2. `Example/`
A full iOS application project.
- `AppDelegate.swift`: Handles app-wide setup and component registration.
- `SceneDelegate.swift`: Manages window scenes and Base URL configuration.
- `Example.xcodeproj`: The Xcode project file used to run the app.

### 3. `Tests/`
Unit and integration tests for the bridge library to ensure stability across updates.

## Key Files
- `Package.swift`: The manifest file defining dependencies (like Hotwire Native) and targets.
- `README.md`: Basic installation and quick-start instructions.
