# Introduction to Android Integration

Welcome to the **Android Integration Guide**. This documentation is designed to help you transform **any** existing **Next.js** or **React.js** web application into a high-performance native Android experience.

While this framework is part of the Bagisto ecosystem, it is designed to be **platform-agnostic**. You can use it to bridge any responsive web project to Android, regardless of your backend technology.

You can check the [Android App Demo](https://play.google.com/store/apps/details?id=com.mobikul.bagistoandroidrunner) here.


## 🏗️ Core Architecture

This system follows a **Universal Three-Layer Architecture** that ensures your web logic is reused across all mobile platforms.

```mermaid
graph TD
    subgraph Backend_Layer ["1. DATA / API SOURCE"]
        BE["External APIs / DB<br/>(REST, GraphQL, CMS)"]
    end

    subgraph Web_Layer ["2. WEB APPLICATION LAYER"]
        WebApp["Next.js / React App<br/>+ Native SDK Hooks"]
    end

    subgraph Native_Layer ["3. NATIVE MOBILE LAYER"]
        Android["Android Kotlin Shell<br/>+ WebView"]
    end

    %% Connections
    BE -- "API Calls" --> WebApp
    WebApp -- "Bridge" --> Android

    %% Styling
    style Backend_Layer stroke:#fbc02d,stroke-width:2px
    style Web_Layer stroke:#9e9d24,stroke-width:2px
    style Native_Layer stroke:#34A853,stroke-width:2px
    style BE stroke:#fbc02d
    style WebApp stroke:#9e9d24
    style Android stroke:#34A853
```

### 1. Data / API Source

The framework is backend-agnostic. Whether you use **Bagisto (Laravel)**, **Node.js**, **Python**, or a **Headless CMS**, as long as your web app can consume the data, it can be bridged to Android.

### 2. Web Storefront Layer

Any responsive **Next.js** or **React.js** application. This layer manages your user interface and integrates our lightweight bridge hooks.

### 3. Bridge Layer (Bagisto Native Framework)

This is the communication engine. It provides the `@bagisto-native/core` and `@bagisto-native/react` SDKs that create the bi-directional link between your web code and the native device.

### 4. Native Layer (Turbo Native Android)

A high-performance Kotlin application that hosts your web project in a `WebView`. It provides native navigation, animations, and access to hardware features like the **Camera**, **Haptics**, and **Location Services**.

## 🔄 The Native Feature Flow

The bridge works the same way for any project:

```mermaid
sequenceDiagram
    participant Web as Web Layer
    participant Bridge as Native Bridge
    participant Native as Android Native
    
    Web->>Bridge: Trigger Action (showToast)
    Bridge->>Native: Serialize JSON Payload
    Native->>Native: Execute Native Action
    Native-->>Bridge: Return Result
    Bridge-->>Web: Callback to Web App
```

1. **Trigger**: A React component calls a hook (e.g., `showToast`).
2. **Dispatch**: The bridge serializes the request into a JSON payload.
3. **Execution**: The Android app intercepts the payload and performs the native action.
4. **Callback**: Any result (like a barcode scan string) is sent back to your web app.

## 🌟 Strategic Benefits

- **Backend Flexibility**: Use any API or backend infrastructure.
- **Universal Frontend**: Works with any React-based framework (Next.js, Vite, etc.).
- **Instant Updates**: Deploy changes to your web server and see them instantly in the app, bypassing the Play Store review process for UI tweaks.
- **Cross-Platform**: Reuse 80-90% of code between iOS and Android.

## 📋 Prerequisites

To be successful with this integration, you should have:

- A **responsive** web project (built with Next.js or React).
- **Android Studio** with the latest version installed.
- **Java Development Kit (JDK) 17** or higher.
- (Recommended) A basic understanding of your web app's routing and state management.

## 🗺️ Integration Roadmap

1.  **Prepare Web**: Install `@bagisto-native` SDKs in your web project.
2.  **Add Provider**: Wrap your application with the bridge provider.
3.  **Setup Android**: Configure the native shell project with your web URL.
4.  **Verify**: Test the bridge communication in the emulator.
5.  **Publish**: Bundle your application for the Google Play Store.

## Key Features

### Bridge Components

Bagisto Native Android includes 18 production-ready bridge components:

- **UI Components**: Alert, Button, Toast, Menu, Theme
- **Device Features**: Location, Camera, Barcode Scanner, Haptic Feedback
- **Advanced Features**: Image Search (ML Kit), Download Manager, Navigation Stack
- **Integration**: Form handling, Review Prompts, Share functionality

## Next Steps

Start with the [Integration Guide](./index.md) to add the bridge to your web project.
