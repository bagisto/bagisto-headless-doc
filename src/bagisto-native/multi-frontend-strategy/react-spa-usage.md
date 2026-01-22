# Using with React SPA (Vite/CRA)


While Next.js is recommended, Bagisto Native is fully compatible with standard React Single Page Applications (SPAs) built with Vite or Create React App.

## Setup Differences

### 1. Turbo Drive & Virtual DOM

In an SPA, you typically use `react-router-dom`. Turbo Drive (used by Hotwire Native) is designed to intercept link clicks and fetch HTML.

**Hybrid Approach:**
- **Native Shell**: The native app delegates navigation to Turbo.
- **Web**: You can continue to use `react-router` for web-only users, OR adopt Turbo Drive for the entire experience.

Recommended: If building a dedicated mobile-web experience for the native app, allow Turbo Drive to handle the navigation. It effectively turns your SPA into a "Multi-Page App" feel which native apps prefer.

### 2. Initialization

Initialize the bridge in your `main.tsx` or `App.tsx`:

```tsx
import { startBridge } from '@bagisto-native/core';

// Initialize on app mount
useEffect(() => {
   startBridge();
}, []);
```

### 3. Handling Navigation

If you are using `react-router-dom` `Link`, Turbo might not intercept it if it performs `e.preventDefault()`.

To ensure native transitions work:
- Use standard `<a>` tags for major page transitions (Product -> Cart).
- Or, programmatically trigger Turbo visits:

```javascript
import * as Turbo from '@hotwired/turbo';

function goToCart() {
    if (window.BagistoNative) {
        Turbo.visit('/cart');
    } else {
        navigate('/cart'); // React Router fallback
    }
}
```

## SEO Considerations

SPAs traditionally suffer from poor SEO unless you use prerendering. If your native app points to the same URL as your public website, ensure your SPA is serving meta tags correctly (e.g., using `react-helmet`).

## Next Steps

- Learn about [Shared API Strategy](./shared-api-strategy.md)
- Explore [Future Support](./future-support.md)
- Understand the [React Module](../react-module/react-overview.md)
