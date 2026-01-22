# Checkout Edge Cases


Checkout is the most critical part of the e-commerce flow. In a hybrid app, you face unique challenges regarding payments and 3rd-party redirects (PayPal, Stripe, etc.).

## 3rd Party Payment Redirects

Many payment gateways redirect the user to their own domain (e.g., `paypal.com`) to complete payment, then redirect back to your `success_url`.

### The Problem
Turbo Native apps are configured to only "capture" URLs belonging to your domain (`your-store.com`). If a user navigates to `paypal.com`, the app might:
1.  Open it in an external browser (Safari/Chrome), breaking the app flow.
2.  Or open it in a modal WebView without the bridge.

### The Solution

**Native Configuration:**
You must configure your native app's routing rules to handle known payment domains dynamically.
- **Internal WebView**: Allow `paypal.com`, `stripe.com`, etc., to open within the app's WebView (or a Modal WebView) so the user never leaves the app.

**Web Configuration:**
Ensure your `success_url` and `cancel_url` point back to your main domain.
- Success: `https://your-store.com/checkout/success`
- Cancel: `https://your-store.com/checkout/cart`

When the payment provider redirects back to `your-store.com`, the native app recognizes the domain and resumes normal functionality.

## Native Payment SDKs (Apple Pay / Google Pay)

If you want to use **Apple Pay** or **Google Pay**:
1.  **Web Request Basic**: You can use the [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API) which works in modern WebViews.
2.  **Native Bridge (Advanced)**: For a truly native experience, use a Bridge Component to trigger the native Apple Pay sheet.
    - Web: `this.send("payment", { provider: "apple_pay", total: 100.00 })`
    - Native: Presents `PKPaymentAuthorizationViewController`.
    - Native: Returns the payment token to Web via `this.replyTo("payment", { token: "..." })`.
    - Web: Submits the token to the backend.

## Order Success Hygiene

After a successful order:
1.  **Clear Cart**: Ensure backend clears the cart.
2.  **Sync Cart Count**: Immediately send a bridge message to update the native cart badge to "0".
    ```javascript
    // In success page controller
    this.send("cartcount", { count: "0" });
    ```
3.  **Rate App Prompt**: This is a great time to ask for a review.
    ```javascript
    this.send("system", { action: "requestReview" });
    ```


## Next Steps

- Explore [Custom Bridge Components](./custom-bridge-components.md)
- Learn about [Deployment](../deployment/hosting.md)
- Understand [Environment Variables](../getting-started/configure-and-run/environment-variables.md)
