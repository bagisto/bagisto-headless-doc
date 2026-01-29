# Debugging Basics

Efficiently troubleshooting your Bagisto Native app involves using both Xcode and Web development tools.

## 1. Xcode Debug Console
The primary source for native errors and bridge logs.
- **Initialization Logs**: Check if the Navigator starts correctly.
- **Bridge Messages**: Enable `Hotwire.config.debugLoggingEnabled = true` to see every message sent from web to native.
- **Swift Crashes**: Look for stack traces if the app closes unexpectedly.

## 2. Safari Web Inspector
Essential for debugging the web content inside the WebView.
- **Console**: View JavaScript errors or network failures.
- **Network Tab**: See if API calls from the headless storefront are failing.
- **Elements**: Inspect the DOM to ensure bridge component tags are correctly formatted.

## 3. Hotwire Native Logs
Hotwire provides detailed logs about navigation and restoration.
- Search the console for `[Hotwire]` to find these specific log entries.

## 4. Common Troubleshooting Commands
If the build is failing or weirdly stuck:
1. **Clean Build Folder**: `Cmd + Shift + K`.
2. **Reset Package Cache**: `File → Packages → Reset Package Cache`.
3. **Delete Derived Data**: `~/Library/Developer/Xcode/DerivedData`.
