# Bagisto Native

This guide shows how to build a **fully native mobile application** using the **Bagisto Native Framework**.

By following it, you’ll be able to create a production-ready native app step by step.

---

## Architecture Overview

<div align="center">

<pre>
┌──────────────────────────────┐
│      Bagisto Backend         │
│     (Laravel + APIs)         │
└─────────────▲────────────────┘
              │
              │ REST / GraphQL
              │
┌─────────────┴────────────────┐
│      Bagisto Headless        │
│  ┌─────────────────────────┐ │
│  │ @bagisto-native/core    │ │
│  │ @bagisto-native/react   │ │
│  └─────────────────────────┘ │
└─────────────▲────────────────┘
              │
              │ Native Bridge
              │
┌─────────────┴────────────────┐
│     Bagisto Native App       │
│   (Swift/Android + WebView)  │
└──────────────────────────────┘
</pre>

</div>

---

## 📋 Prerequisites

Before starting, ensure you have:

- Node.js (LTS recommended)
- PHP & Composer (for Bagisto backend)
- Xcode (latest stable version)
- macOS system

---

## 🛠️ Step 1: Create Bagisto Headless Commerce

Bagisto Headless acts as the API layer between your Bagisto backend and native apps.

### Create Headless Storefront

> **Note:** To create **Bagisto Headless Commerce**, use the following command:

```bash
npx -y @bagisto-headless/create your-storefront
```

### Repository Reference

Bagisto Headless Repository: https://github.com/bagisto/nextjs-commerce

---

## ⚙️ Step 2: Configure & Run Bagisto Headless

Navigate to the generated project:

```bash
cd your-storefront
```

Install dependencies, configure the .env file, and start the development server:

```bash
npm install
npm run dev
```

---

## 🔗 Step 3: Integrate Bagisto Native Framework

To enable native app communication, you must integrate the **Bagisto Native Framework**
inside your **Bagisto Headless (Next.js)** project.

This step is **mandatory** before setting up the native application.

### What this step includes

- Installing:
  - [**@bagisto-native/core**](https://www.npmjs.com/package/@bagisto-native/core)

  ```bash  
   npm install @bagisto-native/core
  ```

  - [**@bagisto-native/react**](https://www.npmjs.com/package/@bagisto-native/react)

  ```bash  
   npm install @bagisto-native/react
  ```

- Adding the Hotwire `bundle.js`
- Registering required Hotwire bridge components
- Wiring native events (toast, navigation, cart, search, etc.)

📘 **Follow the official Bagisto Native Framework documentation**  
Refer to the root `README.md` of the Bagisto Native Framework and complete **all integration steps** inside your Bagisto Headless Next.js project.

> Once this step is complete, your web application becomes **native-ready**
> and can be safely loaded inside the Bagisto Native app.

---

## 🌐 Step 4: Determine Your Project URL

Your native application will communicate with Bagisto Headless using a **Project URL**.

> ⚠️ Ensure your device or simulator is on the same network.

---

## Step 5: Set Up Bagisto Native iOS app

### Clone the iOS Repository

```bash
git clone https://github.com/SocialMobikul/BagistoNative_iOS.git
cd BagistoNative_iOS
```

Repository reference:  
https://github.com/SocialMobikul/BagistoNative_iOS

---

### 🧩 Open Project in Xcode

```bash
open BagistoNative.xcodeproj
```

---

## 🔧 Step 6: Configure Base URL in iOS App

Inside the iOS project:

```swift
let base_url = "https://your-headless-base-url"
```

Example:

```swift
let base_url = "https://your-storefront.vercel.app"
```

Update the base_url value with your **Project Url**.

---

## 🚀 Step 7: Build & Run the iOS Application

1. Select a simulator or connected iPhone
2. Click **Run** in Xcode
3. Verify products, cart, checkout, and API connectivity

---

## Congratulations

Your **Bagisto Native application** is now ready.

---

## 🔗 Helpful Resources

- Bagisto Headless: https://github.com/bagisto/nextjs-commerce
- Bagisto Native iOS: https://github.com/SocialMobikul/BagistoNative_iOS
## Next Steps

- Explore [iOS App Setup](./ios-app-setup.md)
- Learn about [Base URL Configuration](./base-url-configuration.md)
- Understand [Build and Run](./build-and-run.md)
