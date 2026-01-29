# How to Install Xcode

Xcode is the complete developer toolset for creating apps for Mac, iPhone, iPad, Apple Watch, and Apple TV.

## Step 1: Check System Requirements
Before installing, ensure your Mac meets the following:
- **macOS**: Check the latest Xcode version's requirements on the [Apple Developer website](https://developer.apple.com/support/xcode/).
- **Storage**: At least 40GB of free space is recommended.

## Step 2: Download from Mac App Store (Recommended)
1. Open the **App Store** on your Mac.
2. Search for **Xcode**.
3. Click **Get** or **Install**.
4. Once downloaded, open Xcode from your Applications folder.

## Step 3: Install Additional Components
When you first launch Xcode, it may ask to install "additional required components." 
1. Click **Install**.
2. Enter your Mac's administrator password when prompted.

## Step 4: Verify Installation
Open a terminal and run the following command to ensure the command-line tools are also set up:
```bash
xcode-select --install
```
If already installed, it will tell you. If not, follow the prompts to install them.
