# Debugging Common Issues

Solutions for common problems encountered when building Bagisto Native Android apps.

## WebView Issues

### 1. White Screen / Blank Page

**Symptoms:** WebView shows white screen

**Solutions:**
```kotlin
// Enable JavaScript
val config = NavigatorConfiguration(
    name = "main",
    startLocation = "https://your-storefront.com"
).apply {
    isJavaScriptEnabled = true
}

// Check network connectivity
fun isNetworkAvailable(): Boolean {
    val cm = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    return cm.activeNetworkInfo?.isConnected == true
}
```

### 2. WebView Not Loading

**Symptoms:** Page doesn't load, no error shown

**Solutions:**
```kotlin
// Add WebViewClient to handle errors
webView.webViewClient = object : WebViewClient() {
    override fun onReceivedError(
        view: WebView?,
        request: WebResourceRequest?,
        error: WebResourceError?
    ) {
        Log.e("WebView", "Error: ${error?.description}")
    }
}

// Check URL
Log.d("URL", "Loading: ${webView.url}")
```

## Bridge Communication Issues

### 1. JavaScript Bridge Not Working

**Symptoms:** `window.BagistoNative` is undefined

**Solutions:**
```kotlin
// Enable JavaScript interface
webView.settings.javaScriptEnabled = true
webView.addJavascriptInterface(MyBridgeInterface(), "BagistoNative")

// Wait for page to fully load
webView.webViewClient = object : WebViewClient() {
    override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        // Bridge is ready after page loads
    }
}
```

### 2. Methods Not Found

**Symptoms:** Method calls return "method not found"

**Solutions:**
```kotlin
// Register component
navigator.registerBridgeComponent("alert", AlertBridgeComponent(this))

// Check method name matches exactly
// Correct: window.BagistoNative.alert.show(...)
// Wrong: window.BagistoNative.Alert.show(...)
```

## Navigation Issues

### 1. Back Button Not Working

**Symptoms:** Pressing back exits app instead of going back

**Solution:**
```kotlin
override fun onBackPressed() {
    if (navigator.canGoBack()) {
        navigator.goBack()
    } else {
        super.onBackPressed()
    }
}
```

### 2. Deep Links Not Working

**Symptoms:** Deep links don't open the app

**Solutions:**
- Verify intent filter in AndroidManifest.xml
- Ensure `android:autoVerify="true"` is set
- Test with ADB: `adb shell am start -d "https://your-storefront.com/products/123"`

## Build Issues

### 1. Gradle Sync Failed

**Symptoms:** "Gradle sync failed" error

**Solutions:**
1. **File → Sync Project with Gradle Files**
2. Check internet connection
3. Verify Gradle version in `gradle-wrapper.properties`
4. Delete `.gradle` folder and rebuild

### 2. SDK Not Found

**Symptoms:** "SDK location not found"

**Solution:**
```properties
# Create local.properties
sdk.dir=/Users/yourname/Android/Sdk
```

### 3. Java Version Mismatch

**Symptoms:** "Source option is no longer supported"

**Solution:**
```kotlin
// build.gradle.kts
java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}
```

## Performance Issues

### 1. App Running Slow

**Solutions:**
- Enable hardware acceleration
- Optimize images
- Use release build for testing
- Check memory usage

### 2. High Memory Usage

**Solutions:**
```kotlin
// Clear WebView cache
webView.clearCache(true)
webView.clearHistory()
webView.clearFormData()

// Don't keep multiple WebViews
override fun onDestroy() {
    webView.destroy()
    super.onDestroy()
}
```

## Network Issues

### 1. SSL Certificate Errors

**Symptoms:** "SSL handshake failed"

**Solutions:**
- Ensure server has valid SSL certificate
- Use Let's Encrypt or similar
- Check certificate hasn't expired

### 2. CORS Errors

**Symptoms:** "Cross-origin request blocked"

**Solutions:**
```javascript
// Server-side: Add CORS headers
headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}
```

## Runtime Permissions

### 1. Permission Denied

**Symptoms:** App crashes or features don't work

**Solutions:**
```kotlin
// Request permissions at runtime
if (ContextCompat.checkSelfPermission(this, 
        Manifest.permission.ACCESS_FINE_LOCATION) 
    != PackageManager.PERMISSION_GRANTED) {
    
    ActivityCompat.requestPermissions(this,
        arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
        REQUEST_LOCATION_PERMISSION)
}

override fun onRequestPermissionsResult(...) {
    when (requestCode) {
        REQUEST_LOCATION_PERMISSION -> {
            // Handle permission result
        }
    }
}
```

## Debugging Tools

### 1. Logcat

```bash
# Filter by tag
adb logcat -s BagistoNative:D

# Show all
adb logcat | grep -i bagisto
```

### 2. Chrome Inspector

```kotlin
// Enable in code
WebView.setWebContentsDebuggingEnabled(true)
```

Then open `chrome://inspect` in Chrome desktop browser.

### 3. Stetho

```kotlin
// Add dependency
implementation("com.facebook.stetho:stetho:1.6.0")

// Initialize
Stetho.initializeWithDefaults(this)
```

Open `chrome://inspect` to debug network, database, and more.
