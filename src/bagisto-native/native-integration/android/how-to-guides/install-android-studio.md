# How to Install Android Studio

Android Studio is the official integrated development environment (IDE) for building Android apps.

## Step 1: Check System Requirements

Before installing, ensure your computer meets the following:

- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: At least 8GB of free space
- **Java**: JDK 17 or higher

## Step 2: Download Android Studio

1. Visit the [Android Studio website](https://developer.android.com/studio).
2. Click **Download Android Studio**.
3. Accept the terms and conditions.
4. Save the installer to your computer.

## Step 3: Install Android Studio

### macOS
1. Open the downloaded `.dmg` file.
2. Drag **Android Studio** to your Applications folder.
3. Open Android Studio from Applications.

### Windows
1. Run the downloaded `.exe` installer.
2. Follow the installation wizard.
3. Choose default settings for all options.

### Linux
1. Extract the downloaded `.zip` file.
2. Navigate to the `android-studio/bin` directory.
3. Run `./studio.sh`.

## Step 4: Configure SDK Components

When you first launch Android Studio:

1. The **SDK Manager** will open automatically.
2. Install the following components:
   - **Android SDK Platform** (API 34)
   - **Android SDK Build-Tools**
   - **Android SDK Platform-Tools**
   - **Android Emulator**

## Step 5: Verify Installation

Open a terminal and run:

```bash
# Check if Android SDK is available
echo $ANDROID_HOME

# Or list installed platforms
ls $ANDROID_HOME/platforms
```

## Next Steps

- [Create Android Project](./create-android-project.md) - Start a new project
- [Android Studio Setup](../android-app-setup/android-studio-setup.md) - Configure the IDE
