# How to Install SPM Package

Swift Package Manager (SPM) is the native tool for managing Swift code distribution, integrated directly into Xcode.

## Step 1: Open Package Settings
1. Open your project in Xcode.
2. Select your project in the **Project Navigator** (the blue icon at the top left).
3. Select your project under the **Project** heading.
4. Click on the **Package Dependencies** tab.

## Step 2: Add a New Package
1. Click the **+** (plus) button at the bottom of the list.
2. In the search bar at the top right, paste the repository URL (e.g., `https://github.com/SocialMobikul/BagistoNative_iOS`).
3. Choose the **Dependency Rule**:
   - **Up to Next Major Version**: Get the latest bug fixes and features.
   - **Branch**: Targeted for specific development branches.
   - **Exact Version**: Stick to one specific release.

## Step 3: Select Targets
1. Xcode will fetch the package.
2. Select the library/module you want to add to your app target.
3. Click **Add Package**.

## Step 4: Verify
The package should now appear in the **Package Dependencies** section of the Project Navigator.
