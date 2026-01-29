# iOS Integration Guide

This guide will help you integrate your existing **Next.js** or **React.js** project with our **iOS Native Bridge**.

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

## ⚙️ Step 3: Setup iOS App Container

1. Clone the [BagistoNative_iOS](https://github.com/SocialMobikul/BagistoNative_iOS) repository.
2. Navigate to the `Example` directory.

### 🧩 Open Example Project in Xcode

```bash
cd Example
open Example.xcodeproj
```

## 🔧 Step 4: Configure Your Project URL

Inside the iOS project, locate the configuration file and set the `base_url` to point to your web application:

```swift
let base_url = "https://your-web-project-url.com"
```

## 🚀 Step 5: Build & Run

1. Select a simulator or connected device in Xcode.
2. Click **Run** (`Command + R`).
3. Your web app should now be running inside the native iOS container with bridge capabilities enabled.

## Next Steps
- Explore [iOS App Setup](./ios-app-setup/repository-overview.md)
- Learn about [Base URL Configuration](./base-url-configuration/where-to-set.md)
- Understand [Build and Run](./build-and-run/how-to-run.md)
- Explore [Bridge Components](./bridge-components/overview.md)
- Compare [Hotwire vs. Native](./hotwire-vs-native.md)
