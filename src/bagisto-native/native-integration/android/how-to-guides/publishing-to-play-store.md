# Publishing to Play Store

Complete guide to publishing your Bagisto Native Android app on Google Play Store.

## Prerequisites

Before publishing, ensure you have:
- Google Play Developer Account ($25 one-time fee)
- App icon (512x512 PNG)
- Feature graphics (1024x500 PNG)
- Screenshots (multiple sizes)
- Privacy Policy URL
- App Bundle (AAB) or APK

## Build Configuration

### 1. Update Version Information

In `app/build.gradle.kts`:

```kotlin
android {
    defaultConfig {
        versionCode = 1          // Increment for each release
        versionName = "1.0.0"    // User-visible version
        applicationId = "com.yourcompany.yourapp"
    }
}
```

### 2. Configure ProGuard/R8

In `app/proguard-rules.pro`:

```kotlin
# Keep native methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep Mobikul bagisto library classes
-keep class com.mobikul.bagisto.** { *; }

# Keep your custom components
-keep class com.yourcompany.yourapp.components.** { *; }

# Kotlin serialization
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt

# Coroutines
-keepnames class kotlinx.coroutines.internal.MainDispatcherFactory {}
-keepnames class kotlinx.coroutines.CoroutineExceptionHandler {}
```

### 3. Build Release APK

```bash
# Build debug APK
./gradlew assembleDebug

# Build release APK
./gradlew assembleRelease

# Build App Bundle (recommended)
./gradlew bundleRelease
```

## App Store Listing

### Required Information

| Field | Description |
|-------|-------------|
| **Title** | Short name (max 50 chars) |
| **Short Description** | Feature highlight (max 80 chars) |
| **Full Description** | Detailed info (max 4000 chars) |
| **Screenshots** | At least 2 screenshots |
| **Icon** | 512x512 PNG |
| **Feature Graphic** | 1024x500 PNG |

### Screenshots Required

| Size | Description |
|------|-------------|
| 1080x1920 | Phone portrait |
| 1800x1200 | 7" tablet |
| 2560x1440 | 10" tablet |

## Store Optimization Tips

### 1. App Title
- Include keywords: "Bagisto", "Store", "Shop"
- Example: "Bagisto Mobile Store"

### 2. Description

```
📱 Bagisto Mobile Store

Shop your favorite products on the go with our mobile app!

✅ Easy checkout
✅ Fast browsing
✅ Secure payments
✅ Order tracking

Download now and start shopping!
```

### 3. Graphics
- Use high-quality images
- Show real device frames
- Highlight key features

## Publishing Steps

### 1. Create Release

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app
3. Go to **Release → Production**
4. Click **Create new release**

### 2. Upload Bundle

1. Upload your AAB file
2. Add release notes
3. Click **Save**

### 3. Review & Rollout

1. Review release details
2. Click **Start rollout to Production**
3. Wait for review (usually 1-2 hours)

## App Signing

### Option 1: App Signing by Google Play (Recommended)

Google manages your signing keys:
- More secure
- Automatic updates
- No key management needed

### Option 2: Self-managed

Upload your own signing key:
- Keep key secure
- Use same key for updates

## Post-Publishing

### 1. Monitor Performance

Track these metrics:
- Downloads
- Ratings & Reviews
- Crash reports
- ANR (Application Not Responding)

### 2. Updates

```kotlin
// Bump version for updates
android {
    defaultConfig {
        versionCode = 2    // Increment
        versionName = "1.0.1"  // Update
    }
}
```

### 3. Pre-registration (Optional)

For upcoming apps:
1. Create pre-registration campaign
2. Users can sign up before launch
3. Notify when app goes live

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Rejected for policy | Review guidelines, fix issues |
| Rejected for functionality | Test thoroughly before submit |
| Bundle too large | Enable R8 minification |
| Signing error | Check keystore configuration |

## Best Practices

1. **Test thoroughly** before release
2. **Use App Bundle** for smaller size
3. **Set up App Signing** by Google Play
4. **Write clear descriptions** with keywords
5. **Collect user feedback** and iterate
6. **Monitor crashes** and fix quickly
