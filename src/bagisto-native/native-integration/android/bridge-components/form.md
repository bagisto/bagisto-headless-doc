# Form Component

The `FormComponent` provides native form capabilities including input validation, autofill, and secure storage.

## Basic Info

- **Native Class**: `FormComponent.kt`
- **GitHub Path**: [FormComponent.kt](https://github.com/SocialMobikul/BagistoNative_Android/blob/main/library/src/main/java/com/bagisto/native.library/components/FormComponent.kt)

## Description

This component handles native form interactions with enhanced security and autofill support.

## How to Use

### 1. Web Implementation

```javascript
import { useForm } from '@bagisto-native/react';

const CheckoutForm = () => {
    const { 
        autofillAddress, 
        validateField, 
        saveAddress,
        scanCreditCard 
    } = useForm();

    const handleAutofill = async () => {
        const address = await autofillAddress({
            type: "shipping", // or "billing"
            onComplete: (address) => {
                console.log("Autofilled address:", address);
                // Fill form fields
            }
        });
    };

    const handleCardScan = async () => {
        const cardData = await scanCreditCard({
            onSuccess: (card) => {
                console.log("Scanned card:", card);
                // Auto-fill card fields
            },
            onError: (error) => {
                console.log("Scan failed:", error);
            }
        });
    };

    return (
        <form>
            <button type="button" onClick={handleAutofill}>
                Autofill Address
            </button>
            <button type="button" onClick={handleCardScan}>
                Scan Card
            </button>
        </form>
    );
};
```

### 2. Native Side

```kotlin
navigator.registerBridgeComponent("form", FormComponent(this))
```

## API Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `autofillAddress()` | Function | No | Trigger address autofill |
| `validateField()` | Function | No | Validate specific field |
| `saveAddress()` | Function | No | Save address for future use |
| `scanCreditCard()` | Function | No | OCR scan credit card |

## Autofill Types

| Type | Description |
|------|-------------|
| `shipping` | Shipping address |
| `billing` | Billing address |
| `contact` | Contact information |

## Required Permissions

Add to `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

## Next Steps

- [Alert Component](./alert.md) - Show validation errors
- [Toast Component](./toast.md) - Show success messages
