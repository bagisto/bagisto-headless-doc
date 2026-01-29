# How to Run the iOS App

After configuring the base URL, follow these steps to build and run your application on a simulator or a physical device.

## Step 1: Open and Select a Target Device

1. Navigate to the `Example` directory and open the project:
   ```bash
   cd Example
   open Example.xcodeproj
   ```
2. At the top of the Xcode window, click on the **Run Destination** menu (located next to the Run/Stop buttons).
3. Select a **Simulator** (e.g., iPhone 15) or your connected **Physical Device**.

## Step 2: Build and Run

1. Click the **Run** button (the "Play" icon) in the top-left corner of Xcode, or press `Command + R`.
2. Xcode will begin compiling the source code and linking dependencies.
3. Once the build is successful, the app will launch automatically on the selected device.

## Step 3: Verify the Application

1. Ensure your **your web storefront** server is running and accessible from the device.
2. When the app opens, it should load your storefront home page.
3. Test key functionalities to ensure everything is working:
   - **Catalog**: Browse products and categories.
   - **Cart**: Add items to the cart and verify the count.
   - **Native Bridge**: Verify that native toasts or navigation events are firing correctly.

## Troubleshooting Common Issues

### ❌ App Fails to Load URL
- Verify that the `base_url` in your code exactly matches your active storefront URL.
- If using a local server, ensure your Mac and device are on the same Wi-Fi network.
- Check if the URL is accessible via Safari on the same device.

### ❌ Build Errors
- **Clean Project**: Go to **Product → Clean Build Folder** (`Shift + Command + K`).
- **Update Packages**: Go to **File → Packages → Update to Latest Package Versions**.
- Ensure you are using the latest stable version of Xcode.

### ❌ Connection Refused
- If testing locally, use your computer's local IP address (e.g., `http://192.168.1.5:3000`) instead of `localhost`.
