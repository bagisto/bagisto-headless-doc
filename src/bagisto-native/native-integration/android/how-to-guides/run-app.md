# How to Run Android App

This guide explains how to launch your application on an Android emulator or physical device.

## Step 1: Select a Device

1. In the Android Studio toolbar, click on the **Run/Debug Configurations** menu.
2. Choose either an **Emulator** (e.g., Pixel 6) or a **Physical Device** connected via USB.

## Step 2: USB Debugging (For Physical Devices)

If running on a real device:
1. Enable **Developer Options** on your device (tap Build Number 7 times)
2. Enable **USB Debugging** in Developer Options
3. Connect your device via USB
4. Authorize the computer on your device

## Step 3: Click Run

1. Click the **Run** button (▶️) in the top right or press `Shift + F10`.
2. Observe the **Build** output in the bottom panel.

## Step 4: Debugging

Once the app launches:
- Use **Logcat** (bottom of Android Studio) to view logs.
- Use the **Debugger** to inspect variables during breakpoints.
