# Dynamic Button

The `Dynamic Button` is a versatile iOS bridge component that dynamically manages navigation bar buttons, including cart badges, search/scan actions, and product share.

## Basic Info
- **Source File**: [CustomButtonView.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/CustomButtonView.swift)
- **Bridge Name**: `dynamicbutton`

## Incoming Events (Web → Native)

The component listens for several events dispatched from the web view.

| Event | Description | Data Structure | Metadata |
| :--- | :--- | :--- | :--- |
| `connect` / `home` | Configures the navigation bar for the home context (Cart, QR Scan, Barcode Scan). | `{"cart": "count_string"}` | N/A |
| `product` | Configures the navigation bar for the product context (Cart, Share). | `{"cart": "count_string"}` | `{"url": "share_url"}` |
| `navigationbackhide`| Hides the navigation back button. | N/A | N/A |
| `modalopen` | Hides the back button and shows a cross (dismiss) button. | N/A | N/A |
| `modaldismiss` | Shows the back button if the web view can go back. | N/A | N/A |
| `cartcount` | Updates the cart badge count dynamically. | `{"count": "count_string"}` | N/A |

### Detailed Event Logic

#### `home` / `connect`
Adds three buttons to the right side of the navigation bar:
1.  **Cart Button**: Shows a badge with the cart count (from `json.cart`). Tapping it sends a `cart` reply.
2.  **QR Scanner**: Opens a native QR code scanner. On completion, sends a `scan` reply with the result.
3.  **Barcode Scanner**: Opens an ML-powered barcode scanner with options for "Detect Object" or "Read Text". On completion, sends a `scan` reply with the result.

#### `product`
Adds two buttons to the right side of the navigation bar:
1.  **Cart Button**: Shows a badge with the cart count (from `json.cart`).
2.  **Share Button**: Opens the native iOS share sheet using the URL provided in `message.metadata.url`.


---

## Outgoing Events (Native → Web)

These are sent as replies to the initial message that registered the component or button.

| Action | Reply Type | Data Structure | Trigger |
| :--- | :--- | :--- | :--- |
| Tapping Cart Button | `cart` | N/A | User taps cart icon or badge. |
| Modal Dismissed | `modal_dismiss` | `{"code": "modal_dismiss"}` | User taps the cross (X) button. |
| QR/Barcode Scanned | `scan` | `{"code": "result_string"}` | Scanner successfully detects a code. |
| ML Object/Text Detected| `scan` | `{"code": "result_string"}` | ML scanner successfully detects object/text. |

---

## Technical Details

- **Cart Badge**: The badge updates automatically when the `cartcount` event is received or when context changes (`home`, `product`).
- **Back Button**: Automatically hides when `navigationbackhide` is received or when navigation starts in a modal context.
- **Scanner**: The QR scanner supports `.qr`, `.ean13`, and `.ean8` formats.
