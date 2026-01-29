# How to Use SPM Package

Once you have installed a Swift Package, you need to import it into your Swift files to use its functionality.

## Step 1: Import the Module
At the top of your `.swift` file, add the import statement for the library:

```swift
import BagistoNative_iOS
import HotwireNative // If the package depends on other modules
```

## Step 2: Access Classes and Methods
You can now use any public classes, structs, or methods provided by the package.

**Example: Accessing Bridge Components**
```swift
func setupBridge() {
    // Accessing a class from the imported SPM package
    let coreComponents = Bridgework.coreComponents
    Hotwire.registerBridgeComponents(coreComponents)
}
```

## Troubleshooting
If you get a **"No such module"** error:
1. Ensure the package is added to the correct **Target** in your project settings.
2. Go to **File > Packages > Reset Package Caches**.
3. Clear your build folder (**Shift + Command + K**).
