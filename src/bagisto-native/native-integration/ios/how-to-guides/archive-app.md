# How to Archive iOS App

Archiving is the process of creating a build of your app that can be distributed to testers or the App Store.

## Step 1: Prepare for Archiving
1. In the Scheme menu, select **"Any iOS Device (arm64)"** or a connected physical device. (You cannot archive for a simulator).
2. Ensure your build number is incremented (Project Settings > General).

## Step 2: Product Archive
1. Go to the top menu and select **Product > Archive**.
2. Xcode will begin building your project in Release mode.
3. This may take several minutes depending on the size of your project.

## Step 3: The Organizer Window
Once the archive is complete, the **Organizer** window will open automatically.
- Here you can see your archive name, version, and creation date.
- You can validate your build here before submitting it.

## Next Steps
After archiving, you'll likely want to distribute your app:
- [How to Live iOS App](./publish-to-app-store.md)
