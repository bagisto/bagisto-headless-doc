# Where to Set Base URL in Android

The Base URL is the entry point for your Bagisto headless store in the Android app. This guide explains where and how to configure it.

## Configuration Locations

There are multiple ways to set the Base URL in your Android application:

### 1. Navigator Configuration (Recommended)

The most common and recommended approach is to set the URL in your `MainActivity`:

```kotlin
package com.example.yourapp

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import dev.hotwire.navigation.activities.HotwireActivity
import dev.hotwire.navigation.navigator.NavigatorConfiguration

class MainActivity : HotwireActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun navigatorConfigurations() = listOf(
        NavigatorConfiguration(
            name = "main",
            startLocation = "https://your-store.bagisto.com"
        )
    )
}
```

### 2. HotwireConfig

You can also configure it globally in your Application class:

```kotlin
package com.example.yourapp

import android.app.Application
import dev.hotwire.core.config.HotwireConfig
import dev.hotwire.core.bridge.KotlinXJsonConverter
import dev.hotwire.navigation.config.HotwireNavigationConfig

class YourApplication : Application() {
    
    override fun onCreate() {
        super.onCreate()
        
        val config = HotwireConfig(
            navigation = HotwireNavigationConfig(
                startLocation = "https://your-store.bagisto.com"
            )
        )
        
        Hotwire.configure(config)
        Hotwire.config.jsonConverter = KotlinXJsonConverter()
    }
}
```

### 3. Strings Resource

Store your URL in strings.xml for easy environment switching:

```xml
<!-- res/values/strings.xml -->
<resources>
    <string name="base_url">https://your-store.bagisto.com</string>
</resources>
```

```kotlin
// Usage in NavigatorConfiguration
override fun navigatorConfigurations() = listOf(
    NavigatorConfiguration(
        name = "main",
        startLocation = getString(R.string.base_url)
    )
)
```

### 4. Build Config (Environment-Based)

Use different URLs for different build variants:

```kotlin
// build.gradle.kts (app level)
android {
    buildTypes {
        release {
            buildConfigField("String", "BASE_URL", "\"https://store.bagisto.com\"")
        }
        debug {
            buildConfigField("String", "BASE_URL", "\"https://test-store.bagisto.com\"")
        }
    }
}
```

```kotlin
// Usage
NavigatorConfiguration(
    name = "main",
    startLocation = BuildConfig.BASE_URL
)
```

## Best Practices

### ✅ Do's

1. **Use HTTPS** - Always encrypt your connection
2. **Configure in One Place** - Centralize URL management
3. **Use Build Variants** - Separate dev/staging/production URLs
4. **Handle Offline** - Provide fallback for no connectivity

### ❌ Don'ts

1. **Hardcode URLs** - Avoid inline URLs in code
2. **Multiple Configurations** - Don't set URL in multiple places
3. **Ignore SSL Errors** - Don't disable certificate validation in production
4. **Skip URL Validation** - Always validate URLs before use

## Environment Configuration Example

### Development vs Production

```kotlin
object AppConfig {
    val baseUrl: String
        get() = when (BuildConfig.BUILD_TYPE) {
            "debug" -> "https://dev-store.bagisto.com"
            "staging" -> "https://staging-store.bagisto.com"
            "release" -> "https://store.bagisto.com"
            else -> "https://store.bagisto.com"
        }
}
```

### Multiple Environments

```kotlin
// environments.kt
enum class Environment(val url: String) {
    DEVELOPMENT("https://dev.bagisto.com"),
    STAGING("https://staging.bagisto.com"),
    PRODUCTION("https://bagisto.com")
}

// Configure via Gradle
// build.gradle.kts
android {
    defaultConfig {
        buildConfigField(
            "String", 
            "ENVIRONMENT", 
            "\"DEVELOPMENT\""
        )
    }
}
```

## Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| White screen on launch | Check URL is accessible and HTTPS |
| Redirects not working | Ensure URL matches exactly |
| CORS errors | Configure CORS headers on server |
| SSL errors | Install valid SSL certificate |

### Debug Mode

Enable logging to debug URL issues:

```kotlin
Hotwire.config.logging = true
```

## Next Steps

- [Environment Switching](./environment-switching) - Configure multiple environments
- [Common Mistakes](./common-mistakes) - Avoid typical configuration errors
- [Build & Run](../build-and-run/how-to-run) - Test your configuration
