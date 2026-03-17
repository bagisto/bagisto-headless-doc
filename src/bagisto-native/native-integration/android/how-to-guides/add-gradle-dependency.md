# How to Add Gradle Dependency

This guide explains how to add the Bagisto Native Android library to your project using Gradle via JitPack.

## Step 1: Open Project Settings

In Android Studio:

1. Open your project
2. Navigate to `settings.gradle.kts` (Project Settings)

## Step 2: Add JitPack Repository

Add JitPack to your dependency resolution management:

```kotlin
// settings.gradle.kts
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        maven { url = uri("https://jitpack.io") }
    }
}
```

## Step 3: Add Library Dependency

Add the Bagisto Native library to your app module:

```kotlin
// app/build.gradle.kts
dependencies {
    implementation("com.github.SocialMobikul:BagistoNative_Android:1.0.0")
}
```

::: tip
Replace `1.0.0` with the latest release version from [GitHub Releases](https://github.com/SocialMobikul/BagistoNative_Android/releases)
:::

## Step 4: Sync Project

1. Click **Sync Now** in the banner that appears.
2. Or go to **File → Sync Project with Gradle Files**.

## Troubleshooting

### Dependency Not Found

- Verify JitPack repository is added correctly
- Check the [Bagisto Native Android releases](https://github.com/SocialMobikul/BagistoNative_Android/releases) for correct version

### Version Conflicts

If you have version conflicts, you can exclude specific dependencies:

```kotlin
dependencies {
    implementation("com.github.SocialMobikul:BagistoNative_Android:1.0.0") {
        exclude group: "org.jetbrains.kotlin", module: "kotlin-stdlib"
    }
}
```

## Next Steps

- [Adding Library to Project](./adding-library-to-project.md) - Complete integration guide
- [Use the Library](./use-library.md) - Configure components
- [Create Android Project](./create-android-project.md) - Start from scratch
