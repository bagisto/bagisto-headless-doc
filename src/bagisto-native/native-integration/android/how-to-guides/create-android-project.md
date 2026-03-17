# How to Create an Android Project

This guide walks you through creating a new Android project for Bagisto Native.

## Step 1: Clone the Repository

Clone the Bagisto Native Android repository:

```bash
git clone https://github.com/SocialMobikul/BagistoNative_Android.git
cd BagistoNative_Android
```

## Step 2: Open in Android Studio

1. Open **Android Studio**.
2. Select **Open an existing project**.
3. Navigate to the `BagistoNative_Android` folder.
4. Click **OK**.

## Step 3: Wait for Gradle Sync

Android Studio will automatically:

1. Download required dependencies
2. Set up the project structure
3. Index files for code completion

This may take a few minutes on first run.

## Step 4: Configure Project

Edit `app/build.gradle.kts` to configure your app:

```kotlin
android {
    namespace = "com.example.yourapp"
    defaultConfig {
        applicationId = "com.example.yourapp"
        versionCode = 1
        versionName = "1.0.0"
    }
}
```

## Step 5: Set Base URL

In `MainActivity.kt`, set your storefront URL:

```kotlin
override fun navigatorConfigurations() = listOf(
    NavigatorConfiguration(
        name = "main",
        startLocation = "https://your-storefront.com"
    )
)
```

## Step 6: Run the Project

1. Click the **Run** button (green arrow) in the toolbar.
2. Select an emulator or connected device.
3. Your app will launch with your web content.

## Next Steps

- [Install Android Studio](./install-android-studio.md) - Set up development environment
- [Add Gradle Dependency](./add-gradle-dependency.md) - Add the library to your project
- [Build Release APK](./build-release-apk.md) - Prepare for Play Store
