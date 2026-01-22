# Authentication Flows


Handling authentication in a hybrid app involves synchronizing the session state between the WebView (Cookies/LocalStorage) and the Native App.

## Cookie-Based Session (Standard)

By default, **Bagisto Native** relies on **HttpOnly Cookies** for authentication. This is the recommended approach as it requires no manual bridge configuration.

1.  **Login**: User logs in via the WebView form. The server sets a `session_id` cookie.
2.  **Persistence**: The Native App's `WebView` shares the cookie storage with the OS (to some extent) or persists it across app launches.
3.  **API Calls**: Subsequent requests from the WebView automatically include the cookie.

## Manual Token-Based Sync (Custom Extension)

If your native app needs to make direct API calls (e.g., for native widgets or background updates), you might need to sync the API token. 

> [!NOTE]
> Token synchronization is not a built-in feature of Bagisto Native. Developers must implement a custom bridge component for this purpose if required.

**Synchronizing Token after Login:**

1.  **Web**: After a successful login, use a Bridge Component to send the token to Native.

```javascript
// In your Login Helper
this.send("auth", { 
    event: "login", 
    token: "extracted_api_token",
    user: { id: 1, email: "..." }
});
```

2.  **Native**: The app receives the token and stores it in the KeyChain (iOS) or Keystore (Android).

## Handling Logout

When the user logs out from the web:
1.  Clear Cookies/LocalStorage.
2.  **Trigger Native Logout via Bridge**:
    ```javascript
    this.send("auth", { event: "logout" });
    ```
3.  **Native**: Clears the stored token and resets any native UI (e.g., remove "My Profile" tab badge).

## Session Expiry

If the backend session expires (401 Unauthorized):
1.  The Web app should redirect to `/login`.
2.  Turbo Native follows this redirect.
3.  **UX Tip**: To avoid a jarring full-page login appearing inside a nested flow, consider checking for 401s in your native networking delegate and prompting a native login modal (advanced) or simply ensuring the login page is responsive.


## Next Steps

- Learn about [Analytics & Tracking](./analytics-tracking.md)
- Understand [Checkout Edge Cases](./checkout-edge-cases.md)
- Explore [Custom Bridge Components](./custom-bridge-components.md)
