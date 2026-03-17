# How to Run the Android App

After configuring the base URL, follow these steps to build and run your application on an emulator or a physical device.

## Step 1: Open and Select a Target Device

1. Open Android Studio and load your project
2. At the top of the Android Studio window, click on the **Run/Debug Configurations** menu
3. Select an **Emulator** (e.g., Pixel 7) or your connected **Physical Device**

## Step 2: Build and Run

1. Click the **Run** button (the "Play" icon) in the top right, or press `Shift + F10`
2. Android Studio will begin compiling the source code and linking dependencies
3. Once the build is successful, the app will launch automatically on the selected device

## Step 3: Verify the Application

1. Ensure your **web storefront** server is running and accessible from the device
2. When the app opens, it should load your storefront home page
3. Test key functionalities to ensure everything is working:
   - **Catalog**: Browse products and categories
   - **Cart**: Add items to the cart and verify the count
   - **Native Bridge**: Verify that native toasts or navigation events are firing correctly

## Troubleshooting Common Issues

### ❌ App Fails to Load URL

- Verify that the base URL in your code exactly matches your active storefront URL
- If using a local server, ensure your computer and device are on the same Wi-Fi network
- Check if the URL is accessible via a browser on the same device

### ❌ Build Errors

- **Clean Project**: Go to **Build → Clean Project**
- **Rebuild Project**: Go to **Build → Rebuild Project**
- Ensure you are using the latest stable version of Android Studio

### ❌ Connection Refused

- If testing locally, use your computer's local IP address (e.g., `http://192.168.1.5:3000`) instead of `localhost`
- For emulator, use `10.0.2.2` to access host machine
