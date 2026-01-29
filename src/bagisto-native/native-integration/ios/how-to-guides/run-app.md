# How to Run iOS App

This guide explains how to launch your application on a virtual simulator or a real iPhone/iPad.

## Step 1: Select a Scheme and Destination
1. In the Xcode toolbar, click on the **Scheme** menu (usually showing your app's name).
2. To the right of that, click the **Device** menu.
3. Choose either a **Simulator** (e.g., iPhone 15) or a **Physical Device** connected via USB.

## Step 2: Code Signing (For Physical Devices)
If running on a real device:
1. Select your project in the Navigator.
2. Choose your App Target.
3. Go to **Signing & Capabilities**.
4. Select a **Team** (your Apple ID).
5. Ensure the **Bundle Identifier** is unique.

## Step 3: Click Run
1. Click the **Play button** in the top left or press `Command + R`.
2. Observe the **Build Status** in the center of the toolbar.

## Step 4: Debugging
Once the app launches:
- Use the **Debug Area** (bottom of Xcode) to view logs.
- Use the **Variables View** to inspect data during breakpoints.
