# Event Safety

## Null Checks
The Core module is safe, but your logic might not be.

Always check if the `window` object exists before attempting to dispatch custom events manually (though using the provided Utility Functions handles this for you).

## Graceful Degradation
Your app should still work if the native bridge fails or if the user is in a regular browser.
*   **Toast Fallback**: If `isTurboNativeUserAgent()` is false, use a standard web toast library (like `react-toastify`) instead of `triggerHotwireNativeToast`.

## Next Steps

- Learn how to [Avoid Duplicate Native Actions](./avoiding-duplicate-native-actions.md)
- Understand [Performance](./performance.md)
- explore the [React Module](../../bagisto-native-react/react-overview.md)
