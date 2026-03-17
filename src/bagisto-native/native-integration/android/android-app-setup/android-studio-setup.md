# Android Studio Setup

This guide walks you through setting up Android Studio for Bagisto Native Android development.

## Prerequisites

Before starting, ensure you have:

1. **Java Development Kit (JDK) 17+**
2. **Android Studio** (Electric Eel or later)
3. **Android SDK** with required components
4. **Git** for version control

## Installation Steps

### 1. Install Android Studio

Download from: https://developer.android.com/studio

```bash
# Or via Homebrew
brew install --cask android-studio
```

### 2. Install Required SDK Components

Open Android Studio → Tools → SDK Manager

Install these components:
- **Android SDK Platform** (API 34)
- **Android SDK Build-Tools** (34.0.0)
- **Android SDK Platform-Tools**
- **Android Emulator**

### 3. Configure Environment Variables

Add to your `~/.zshrc` or `~/.bashrc`:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin
```

### 4. Clone the Repository

```bash
git clone https://github.com/SocialMobikul/BagistoNative_Android.git
cd BagistoNative_Android
```

## Opening the Project

### Method 1: From Android Studio

1. Open Android Studio
2. Select **Open**
3. Navigate to `BagistoNative_Android/`
4. Click **OK**

### Method 2: Command Line

```bash
# Open directly in Android Studio
open BagistoNative_Android
```

## Project Sync

After opening, Android Studio will:

1. **Index files** - Building symbol table
2. **Download dependencies** - Gradle sync
3. **Build shell project** - Verify configuration

Watch the bottom status bar for progress.

## Common Setup Issues

### Issue: Gradle Sync Failed

**Solution:**
- Check internet connection
- Verify Gradle version in `gradle/wrapper/gradle-wrapper.properties`
- Try: **File → Sync Project with Gradle Files**

### Issue: SDK Location Not Found

**Solution:**
- **File → Project Structure → SDK Location**
- Set Android SDK path

### Issue: Java Version Mismatch

**Solution:**
```bash
# Check Java version
java -version

# Should show: openjdk version "17.x.x"
```

### Issue: Missing Platform/Build Tools

**Solution:**
- Open SDK Manager
- Install missing components

## Running the App

### 1. Create Emulator

1. **Tools → Device Manager**
2. Click **Create Device**
3. Select device (Pixel 7 recommended)
4. Select system image (API 34)
5. Click **Finish**

### 2. Run the App

1. Select your device/emulator from toolbar
2. Click **Run** (▶️) or press `Shift + F10`

## Debugging

### Enable Debug Mode

In `app/build.gradle.kts`:

```kotlin
buildTypes {
    debug {
        isDebuggable = true
    }
}
```

### Logcat

Filter by app package:

```
tag:BagistoNative
```

### Chrome DevTools

Enable in WebView:

```kotlin
WebView.setWebContentsDebuggingEnabled(true)
```

Then open `chrome://inspect` in Chrome desktop.

## Build Variants

| Variant | Purpose | URL |
|---------|---------|-----|
| Debug | Development | localhost:3000 |
| Release | Production | your-domain.com |

### Switching Variants

- **Build → Select Build Variant**
- Or toolbar dropdown

## Tips

- Use **Instant Run** for faster development
- Enable **Jetifier** for older dependencies
- Use **R8** for release builds to reduce APK size
- Set up **proguard-rules.pro** for obfuscation
