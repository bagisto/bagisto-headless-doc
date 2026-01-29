# Quick Integration Note

Once you have followed the previous steps and guides, your **Web Application is now ready** to be converted into a native mobile experience. 

At this stage, your web app contains all the necessary Bagisto Native integrations. You can now proceed to use your **Web Application URL** to sync it with [**Bagisto Native iOS**](../native-integration/ios/introduction.md) for the final mobile build.

## The 3-Step Integration (TL;DR)

| Step | Action | Why? |
| :--- | :--- | :--- |
| **1. Install** | `npm install @bagisto-native/core @bagisto-native/react` | Adds the core bridge logic and React UI components. |
| **2. Include** | Add `bundle.js` to your root layout. | This is the "brain" that enables Web and Native communication. |
| **3. Register** | Add components (like `<HotwireHistorySync />`) as per your use. | Enables native behaviors. See the full [Component List](../sdk-reference/bagisto-native-core/web-components.md) for details. |

---

## Final Checklist

Before moving to the **Native App Integration**, ensure:
- [ ] No JavaScript errors are present in your browser console (check the "Stable Web = Stable App" rule).
- [ ] The `bundle.js` is loading successfully (check the Network tab).
- [ ] You are using `'use client'` for any project files that import Bagisto Native components.

## Next Steps

Now that your web application is prepared, it's time to connect it to the actual mobile shell:

- [**Native App Integration**](../native-integration/ios/introduction.md) - Learn how to point your iOS app to your web URL.
- [**SDK Reference**](../sdk-reference/core-package.md) - Look up specific component props or helper functions.
- [**Prerequisites**](./prerequisite.md) - Review the requirements again if needed.

::: tip Pro Tip
Always test your web changes in a mobile browser simulator during development to catch any layout issues early!
:::
