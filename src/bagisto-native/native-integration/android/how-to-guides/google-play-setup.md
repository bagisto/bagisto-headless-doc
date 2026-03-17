# How to Set Up Google Play

This guide explains how to set up your Google Play Developer account for publishing your app.

## Step 1: Create Developer Account

1. Visit the [Google Play Console](https://play.google.com/console).
2. Click **Start your profile**.
3. Pay the one-time registration fee ($25 USD).
4. Complete your developer profile.

## Step 2: Prepare App Information

You'll need to provide:

- **App Name**: Your app's display name
- **Short Description**: Feature highlight (80 characters)
- **Full Description**: Detailed description (4000 characters)
- **Screenshots**: At least 2 screenshots (1080x1920)
- **Feature Graphic**: 1024x500 image
- **App Icon**: 512x512 PNG

## Step 3: Configure App

### App Categories

Choose appropriate categories:
- **Shopping** (for e-commerce apps)
- Or relevant category for your app

### Content Rating

Complete the content rating questionnaire honestly.

### Pricing & Distribution

- Choose **Free** or **Paid**
- Select countries for distribution

## Step 4: App Signing

### Option 1: App Signing by Google Play (Recommended)

Google manages your app signing:
1. Export a signing key from Android Studio
2. Upload it to Play Console
3. Google re-signs your app for distribution

### Option 2: Self-Managed

Keep your own signing key:
1. Use the same key for all updates
2. Securely store the keystore

## Step 5: Create Release

1. Go to **Release → Production**
2. Upload your APK/AAB
3. Add release notes
4. Click **Start Rollout**

## Step 6: Wait for Review

Google typically reviews within 24-72 hours.

## Pre-Launch Checklist

- [ ] App icon uploaded
- [ ] Screenshots uploaded
- [ ] Privacy policy URL added
- [ ] Content rating completed
- [ ] Tested on multiple devices
- [ ] Release APK built successfully

## Next Steps

- [Publish to Play Store](./publish-to-play-store.md) - Submit your app
- [Build Release APK](./build-release-apk.md) - Prepare the build
