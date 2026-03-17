# Performance Optimization

Guide to optimizing your Bagisto Native Android app for better performance.

## Performance Overview

A well-optimized app provides:
- Faster startup times
- Smoother navigation
- Lower battery usage
- Better user experience

## Startup Optimization

### 1. Enable Hardware Acceleration

```xml
<!-- AndroidManifest.xml -->
<application
    android:hardwareAccelerated="true"
    ... >
</application>
```

### 2. Reduce Initial Load Time

```kotlin
// MainActivity.kt
class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Use splash screen or minimal UI first
        setContentView(R.layout.splash_layout)
        
        // Initialize navigator asynchronously
        Handler(Looper.getMainLooper()).post {
            initializeNavigator()
        }
    }
    
    private fun initializeNavigator() {
        navigator = Navigator(this)
        
        val config = NavigatorConfiguration(
            name = "main",
            startLocation = "https://your-storefront.com"
        )
        
        navigator.configure(config)
        setContentView(navigator.getView())
    }
}
```

## WebView Optimization

### 1. Enable Fast Loading

```kotlin
val config = NavigatorConfiguration(
    name = "main",
    startLocation = "https://your-storefront.com"
).apply {
    // Enable fast rendering
    useWideViewPort = true
    loadWithOverviewMode = true
    
    // Enable hardware acceleration
    isForceDark = WebSettings.FORCE_DARK_ON
}
```

### 2. Optimize Resource Loading

```kotlin
webView.webViewClient = object : WebViewClient() {
    override fun shouldInterceptRequest(
        view: WebView?,
        request: WebResourceRequest?
    ): WebResourceResponse? {
        // Cache common resources
        val url = request?.url?.toString() ?: return null
        
        return when {
            url.endsWith(".css") -> getCachedResponse(url)
            url.endsWith(".js") -> getCachedResponse(url)
            url.endsWith(".png") -> getCachedResponse(url)
            else -> null
        }
    }
}
```

## Memory Optimization

### 1. Proper WebView Lifecycle

```kotlin
class MainActivity : AppCompatActivity() {

    private var webView: WebView? = null

    override fun onDestroy() {
        // Clean up WebView
        webView?.apply {
            stopLoading()
            removeAllViews()
            destroy()
        }
        webView = null
        super.onDestroy()
    }
}
```

### 2. Monitor Memory Usage

```kotlin
// Check memory
val runtime = Runtime.getRuntime()
val usedMemory = runtime.totalMemory() - runtime.freeMemory()
val maxMemory = runtime.maxMemory()

Log.d("Memory", "Used: ${usedMemory / 1024 / 1024}MB / ${maxMemory / 1024 / 1024}MB")
```

### 3. Clear Cache Periodically

```kotlin
// Clear old cache
webView.clearCache(true)
webView.clearHistory()
webView.clearFormData()
```

## Network Optimization

### 1. Enable Compression

```kotlin
val config = NavigatorConfiguration(
    name = "main",
    startLocation = "https://your-storefront.com"
).apply {
    // Enable gzip compression
    isAcceptThirdPartyCookies = true
}
```

### 2. Optimize Images

Server-side recommendations:
- Use WebP format
- Serve responsive images
- Implement lazy loading
- Use CDN

### 3. Prefetch Resources

```javascript
// In your web app
<link rel="prefetch" href="/next-page">
<link rel="dns-prefetch" href="https://your-storefront.com">
```

## Battery Optimization

### 1. Reduce Background Activity

```kotlin
override fun onPause() {
    super.onPause()
    // Pause JavaScript execution
    webView.onPause()
    webView.pauseTimers()
}

override fun onResume() {
    super.onResume()
    // Resume JavaScript execution
    webView.resumeTimers()
    webView.onResume()
}
```

### 2. Optimize Location Updates

```kotlin
// Use last known location when possible
val locationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager
val location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER)
```

## Build Optimization

### 1. Enable R8 Minification

```kotlin
// build.gradle.kts
buildTypes {
    release {
        isMinifyEnabled = true
        isShrinkResources = true
        proguardFiles(
            getDefaultProguardFile("proguard-android-optimize.txt"),
            "proguard-rules.pro"
        )
    }
}
```

### 2. Use App Bundle

```bash
# Build App Bundle instead of APK
./gradlew bundleRelease
```

This creates smaller download sizes.

## Performance Metrics

### Target Values

| Metric | Target | Measure |
|--------|--------|---------|
| Cold start | < 2s | Time to interactive |
| Warm start | < 500ms | Time to interactive |
| Memory | < 150MB | Peak usage |
| APK size | < 15MB | Download size |
| Battery | < 5%/hour | Idle drain |

### Monitoring Tools

1. **Android Profiler** - CPU, Memory, Network, Battery
2. **Firebase Performance** - Automatic monitoring
3. **Stetho** - Debug network and performance

## Best Practices Summary

| Optimization | Impact |
|--------------|--------|
| Hardware acceleration | High |
| Cache management | High |
| R8 minification | Medium |
| App Bundle | Medium |
| Image optimization | High |
| Lazy loading | Medium |
| Background pause | Low |
