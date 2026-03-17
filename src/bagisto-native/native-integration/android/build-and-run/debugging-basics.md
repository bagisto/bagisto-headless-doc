# Debugging Basics

Efficiently troubleshooting your Bagisto Native Android app involves using both Android Studio and web development tools.

## 1. Android Studio Logcat

The primary source for native errors and bridge logs.
- **Initialization Logs**: Check if the Navigator starts correctly.
- **Bridge Messages**: Enable debug logging to see every message sent from web to native.
- **Kotlin Crashes**: Look for stack traces if the app closes unexpectedly.

## 2. Chrome DevTools

Essential for debugging the web content inside the WebView.
- **Console**: View JavaScript errors or network failures.
- **Network Tab**: See if API calls from the headless storefront are failing.
- **Elements**: Inspect the DOM to ensure bridge component tags are correctly formatted.

To connect:
1. Enable WebView debugging in your app: `WebView.setWebContentsDebuggingEnabled(true)`
2. Open Chrome on your computer and navigate to `chrome://inspect`
3. Click on your app's WebView

## 3. Common Troubleshooting

If the build is failing or weirdly stuck:

1. **Clean Project**: `Build → Clean Project`
2. **Rebuild Project**: `Build → Rebuild Project`
3. **Invalidate Caches**: `File → Invalidate Caches → Invalidate and Restart`
