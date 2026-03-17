# How to Build Release APK

This guide explains how to build a release-ready APK for Google Play Store submission.

## Step 1: Configure Build

In `app/build.gradle.kts`, ensure release configuration:

```kotlin
buildTypes {
    release {
        isMinifyEnabled = true
        isShrinkResources = true
        proguardFiles(
            getDefaultProguardFile("proguard-android-optimize.txt"),
            "proguard-rules.pro"
        )
    }
}
```

## Step 2: Set Version

Update version information:

```kotlin
android {
    defaultConfig {
        versionCode = 1      // Increment for each release
        versionName = "1.0.0" // User-visible version
    }
}
```

## Step 3: Build Release APK

Run the following in terminal:

```bash
./gradlew assembleRelease
```

Or in Android Studio:

1. Go to **Build → Build Bundle(s) / APK(s) → Build APK(s)**

## Step 4: Locate APK

Find your APK at:

```
app/build/outputs/apk/release/app-release.apk
```

## Step 5: Verify APK

- Ensure APK size is reasonable (< 50MB recommended)
- Test the APK on a device before submission

## ProGuard Rules

Add to `proguard-rules.pro`:

```kotlin
# Keep native methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep Mobikul bagisto library classes
-keep class com.mobikul.bagisto.** { *; }
```

## Next Steps

- [Publish to Play Store](./publish-to-play-store.md) - Submit to Google Play
- [Google Play Setup](./google-play-setup.md) - Configure Play Console
