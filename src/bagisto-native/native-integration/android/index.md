# Android Integration Guide

This guide will help you integrate your existing **Next.js** or **React.js** project with our **Android Native Bridge**.

> [!NOTE]
> For an overview of the architecture and prerequisites, please refer to the [Introduction](./introduction.md) page.

## 🛠️ Step 1: Prepare Your Web Project

Ensure your web application is running and accessible. This could be a local development server or a production deployment.

## 🔗 Step 2: Install Native Bridge Libraries

To enable native app communication, you must install the bridge libraries in your web project.

### Installation

Run the following command in your project root:

```bash
npm install @bagisto-native/core @bagisto-native/react
```

### Setup Provider (React/Next.js)

In your main entry file (e.g., `_app.js` or `layout.tsx`), wrap your application with the bridge provider:

```javascript
import { NativeBridgeProvider } from '@bagisto-native/react';

function MyApp({ Component, pageProps }) {
  return (
    <NativeBridgeProvider>
      <Component {...pageProps} />
    </NativeBridgeProvider>
  );
}
```

## ⚙️ Step 3: Setup Android App Container

1. Clone the [BagistoNative_Android](https://github.com/SocialMobikul/BagistoNative_Android) repository.
2. Open the project in Android Studio.

### 🧩 Open Project in Android Studio

```bash
open BagistoNative_Android
```

## 🔧 Step 4: Configure Your Project URL

Inside the Android project, locate your `MainActivity.kt` and set the `startLocation` to point to your web application:

```kotlin
override fun navigatorConfigurations() = listOf(
    NavigatorConfiguration(
        name = "main",
        startLocation = "https://your-web-project-url.com"
    )
)
```

## 🚀 Step 5: Build & Run

1. Select a simulator or connected device in Android Studio.
2. Click **Run** (`Shift + F10`).
3. Your web app should now be running inside the native Android container with bridge capabilities enabled.

## Next Steps

- Explore [Android App Setup](./android-app-setup/repository-overview.md)
- Learn about [Base URL Configuration](./base-url-configuration/where-to-set.md)
- Understand [Build and Run](./build-and-run/how-to-run.md)
- Explore [Bridge Components](./bridge-components/overview.md)
- Compare [Hotwire vs. Native](./hotwire-vs-native.md)
