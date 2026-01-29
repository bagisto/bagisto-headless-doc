# How to Setup Apple Account with iOS App and Xcode

To distribute your app or run it on a physical device, you need to link your Apple ID to Xcode.

## Step 1: Add Apple ID to Xcode
1. Open **Xcode > Settings...** (or Preferences).
2. Click the **Accounts** tab.
3. Click the **+** button and select **Apple ID**.
4. Sign in with your Apple developer credentials.

## Step 2: Configure Team Settings
1. Select your project in the Navigator.
2. Select your main App Target.
3. Go to **Signing & Capabilities**.
4. In the **Team** dropdown, select the account you just added.

## Step 3: Automated Signing (Recommended)
1. Ensure **"Automatically manage signing"** is checked.
2. Xcode will automatically create provisioning profiles and certificates for you.

## Step 4: Register Devices
If you connect a new iPhone, Xcode will ask if you want to register it.
1. Click **Register Device**.
2. This allows you to install and debug your app on that specific hardware.
