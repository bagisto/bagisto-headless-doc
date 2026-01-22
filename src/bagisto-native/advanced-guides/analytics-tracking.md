# Analytics & Tracking


Integrating analytics in a hybrid Web/Native app requires a unified strategy to avoid duplicate events and ensure accurate attribution.

> [!IMPORTANT]
> **Bagisto Native** does not provide a pre-built analytics bridge. The following section serves as a guide for developers who wish to implement their own custom analytics bridge using standard Hotwire Native/Strada practices.

## Manual Strategy: Bridge-Based Tracking

Instead of running Google Analytics or Firebase SDKs directly in the WebView (which works but loses native context like Device ID or Advertising ID), you can proxy important events to the Native layer by building your own component.

### 1. Create a Manual Analytics Bridge

**Web Side (`analytics_controller.js`):**
```javascript
import { BridgeComponent } from "@hotwired/hotwire-native-bridge";

export default class AnalyticsController extends BridgeComponent {
    static component = "analytics";

    connect() {
        super.connect();
    }

    logEvent(name, params = {}) {
        this.send("logEvent", { name, params });
    }
}
```

### 2. Triggering Events

You can define a helper function or React hook to use this controller.

**Usage:**
```javascript
// On "Add to Cart" button click
function handleAddToCart(product) {
    // ... logic ...
    
    // Find the analytics controller element and invoke method
    const element = document.querySelector("[data-controller='bridge--analytics']");
    if (element) {
        // Access the controller instance (requires access to Stimulus application or custom event)
        // Alternatively, dispatch a custom event that the controller listens to:
        window.dispatchEvent(new CustomEvent("analytics:log", { 
            detail: { name: "add_to_cart", params: { id: product.id } } 
        }));
    }
}
```

And update `AnalyticsController` to listen to window events:
```javascript
connect() {
    super.connect();
    window.addEventListener("analytics:log", this.handleLog.bind(this));
}

handleLog(event) {
    this.logEvent(event.detail.name, event.detail.params);
}
```

## Native Handling

On the native side, the `AnalyticsBridge` receives the `logEvent` message. You can then map this to:
- Firebase Analytics
- Facebook App Events
- Mixpanel / Amplitude

This ensures that all events (Web and Native) are associated with the same native User/Device ID.


## Next Steps

- Understand [Checkout Edge Cases](./checkout-edge-cases.md)
- Explore [Custom Bridge Components](./custom-bridge-components.md)
- Learn about [Deployment](../deployment/hosting.md)
