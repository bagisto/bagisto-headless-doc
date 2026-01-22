# What Problems It Solves

Building hybrid or native-wrapped apps traditionally comes with several headaches. The Core module solves them:

## 1. The "Back Button" Problem
In a standard WebView app, pressing the native Android back button might close the app instead of going back in history.
**Solution**: The Core module syncs the browser history stack with the native activity stack using `HotwireHistorySync`.

## 2. The "Uncanny Valley" of UI
WebView apps often feel "fake" because native elements (like Toasts or Modals) are replaced by HTML equivalents.
**Solution**: The Core module triggers *actual* native toasts and dialogs, making the app feel indistinguishable from a purely native one.

## 3. Slow Navigation
Standard web navigation feels slow on mobile.
**Solution**: Through Hotwire/Turbo integration, page transitions are accelerated, and the body allows for skeletal loading while data fetches.

## Next Steps

- Explore [Web Components](../web-components.md)
- Learn about [Utility Functions](../utility-functions.md)
- Understand [Best Practices](../best-practices.md)
