# How to Create a Project in iOS

This guide covers the steps to start a new iOS application from scratch using Xcode.

## Step 1: Launch Xcode
Open Xcode and select **"Create a new Xcode project"** from the welcome screen, or go to **File > New > Project...**

## Step 2: Choose a Template
1. Select the **iOS** tab at the top.
2. Choose **App** under the Application section.
3. Click **Next**.

## Step 3: Configure Project Options
Fill in the following details:
- **Product Name**: Your app's name (e.g., "MyBagistoStore").
- **Organization Identifier**: Usually your domain in reverse (e.g., `com.example`).
- **Interface**: Choose **SwiftUI** (modern) or **Storyboard** (classic).
- **Language**: **Swift**.
- **Storage**: Select a location on your Mac to save the project.

## Step 4: Project Initialization
Xcode will generate the basic folder structure and files:
- `AppDelegate.swift` / `App.swift`: Entry point of the app.
- `ContentView.swift`: Initial UI view.
- `Assets.xcassets`: Where images and icons live.

## Next Steps
Now that your project is created, you may want to add dependencies:
- [How to Install SPM Package](./install-spm-package.md)
