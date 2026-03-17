# DynamicButton

The `DynamicButton` component controls the native top navigation bar actions. It is context-aware and changes the available buttons based on the `pageType`.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `pageType` | `string` | `'home'` | The context for the native navbar: `'home'` or `'product'`. |
| `cartCountEvent` | `boolean` | `false` | If true, enables the silent cart count sync mode. |
| `modalOpenEvent` | `boolean` | `false` | If true, enables the silent modal open event. |
| `modalDismissEvent` | `boolean` | `false` | If true, enables the silent modal dismiss event. |
| `style` | `object` | `{ display: 'none' }` | Logic-only component, usually hidden. |

## Feature Integration

## Hotwire Barcode, Image Search & Cart Component

The **Hotwire Barcode, Image Search & Cart Component** allows you to use the native Barcode Search, Image Search, Native Cart Icon, and Cart Count Label. 

---

### Step 1: Add the Dynamic Button Component and pass pageType="home"

```tsx
'use client';
import dynamic from 'next/dynamic';

const DynamicButton = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.DynamicButton),
  { ssr: false }
);

export default function HotwireAppDynamicButtonComponent( props:{ dataPageType?: string } ) {
  return (
    <>
    <DynamicButton
      pageType={ props.dataPageType || 'home' }
      style={{ display: 'none' }}
    >
    </DynamicButton>

    {/* Cart Count */}
    <DynamicButton
      cartCountEvent={true}
      style={{ display: 'none' }}
    >
    </DynamicButton>
    </>
  );
}

/*
Note: Pass this Component on the Home Page of your website.

Example Use:
 <HotwireAppDynamicButtonComponent dataPageType="home" />
*/ 
```

---

### Step 2: Cart
At the top of the application, a cart icon appears. When the user clicks on the cart icon, the cart page or cart modal must be opened. To do this, follow the following instructions.

When the user clicks on the cart icon, the native application sends the **turbo:next-cart-modal** event. Listen to this event and take the necessary action. You can check the provided example code.

```ts
"use client";
import { useEffect } from "react";

type TurboCartModalBridgeProps = {
  onOpen: () => void;
};

export default function TurboCartModalBridge({ onOpen }: TurboCartModalBridgeProps) {
  useEffect(() => {
    const handleTurboCartModalOpen = (e: Event) => {
      onOpen();
    };

    window.addEventListener("turbo:next-cart-modal", handleTurboCartModalOpen);

    return () => {
      window.removeEventListener("turbo:next-cart-modal", handleTurboCartModalOpen);
    };
  }, [onOpen]);

  return null; 
}
```

---

### Step 3: Cart Count
When we add a product to the cart or increment the product count in the cart, the **Cart Count** badge must also be updated. To send the **Cart Count** info to the native side, you can refer to the following code example.

```ts
import {triggerCartCountValue} from "@bagisto-native/core";

const sendCartCountToNativeApp = (cartcount: number) => {
    triggerCartCountValue(cartcount);
}
```

---

### Step 4: Barcode Search & Image Search
At the top of the application, the Barcode Search Icon and Image Search Icon appear. When the user clicks on these icons, the native barcode and image search components run and send the result as an event. The result is basically a query string that the developer needs to use for calling the particular search result.
Kindly see the following code snippet...

```ts
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function TurboSearchRouterBridge() {
  const router = useRouter();

  useEffect(() => {
    // Listen for a custom event from Turbo.
    const handleTurboSearch = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string; code?: string }>;
      const query = customEvent.detail.query || customEvent.detail.code;
      if (!query) return;
      router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    window.addEventListener("turbo:next-search", handleTurboSearch);

    return () => {
      window.removeEventListener("turbo:next-search", handleTurboSearch);
    };
  }, [router]);

  return null; 
}
```

### Step 5: Modal Open & Modal Dismiss Events

When we click on the cart icon, it emits the turbo:next-cart-modal event. You can open the cart modal or route to the cart page as per your requirement by listening to this event.

If you want to open the cart modal and also include the native modal close button on the screen, you can use the following configuration of DynamicButton:

```tsx
<DynamicButton
  modalOpenEvent={true}
  style={{ display: 'none' }}
>
</DynamicButton>

<DynamicButton
  modalDismissEvent={true}
  style={{ display: 'none' }}
>
</DynamicButton>
```

Now, you also have to send the event to the native side of the application when you open the modal, and also send the event when you close the modal via external sources.

For sending the modal open event, use the following method:

```tsx
import { triggerDynamicButtonModalOpenEvent } from '@bagisto-native/core';

triggerDynamicButtonModalOpenEvent();
```

For sending the modal dismiss event, use the following method:

```tsx
import { triggerDynamicButtonModalDismissEvent } from '@bagisto-native/core';

triggerDynamicButtonModalDismissEvent();
```

However, without the native cart modal close icon, you can handle the cart modal or any other modal by only listening to the turbo:next-cart-modal event.

---

## Product Share, Cart & Cart Count

The **Dynamic Button** component allows you to use the Native Product Share, Native Cart Icon, and Cart Count Label.

---

### Step 1: Add the Dynamic Button Component and pass pageType="product"

```tsx
'use client';
import dynamic from 'next/dynamic';

const DynamicButton = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.DynamicButton),
  { ssr: false }
);

export default function HotwireAppDynamicButtonComponent( props:{ dataPageType?: string } ) {
  return (
    <>
    <DynamicButton
      pageType={ props.dataPageType || 'home' }
      style={{ display: 'none' }}
    >
    </DynamicButton>

    {/* Cart Count */}
    <DynamicButton
      cartCountEvent={true}
      style={{ display: 'none' }}
    >
    </DynamicButton>
    </>
  );
}

/*
Note: Include this Component on the Product Page of your website.

Example Use:
<HotwireAppDynamicButtonComponent dataPageType="product" />
*/ 
```

---

### Step 2: Product Share

On the product page, the Native Product Share Icon appears. When the user clicks on this icon, the native share component appears, containing the product page link that the user can use to share the product.

---

### Step 3: Cart & Cart Count

The functionality of cart and cart count remains the same as pageType="home". Kindly see the previous sections.

---

## Empty Page

The **Dynamic Button** component allows you to hide the previous page dynamic button icons.

### Step 1: Add the Dynamic Button Component and pass pageType="empty"

```tsx
'use client';
import dynamic from 'next/dynamic';

const DynamicButton = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.DynamicButton),
  { ssr: false }
);

export default function HotwireAppDynamicButtonComponent( props:{ dataPageType?: string } ) {
  return (
    <>
    <DynamicButton
      pageType={ props.dataPageType || 'home' }
      style={{ display: 'none' }}
    >
    </DynamicButton>
    </>
  );
}

/*
Note: Include this Component on the Empty Page of your website.

Example Use:
<HotwireAppDynamicButtonComponent dataPageType="empty" />
*/ 
```
---

## Ready Event & Race Conditions

To ensure the bridge is ready before sending data (especially during the first page load), listen for the ready event.

| Event Name | Description |
| :--- | :--- |
| `bagisto-native:dynamic-button-ready` | Emitted when the bridge element is fully connected. |

```tsx
window.addEventListener("bagisto-native:dynamic-button-ready", () => {
  // Safe to sync cart or trigger native actions
});
```

---

You can also check the sample repo [here](https://github.com/anikeshwebkul/bagisto-native-commerce).

## Next Steps

- Explore [HotwireToast](./hotwire-toast.md)
- Learn about [HotwireSearch](./hotwire-search.md)
- Understand [Common Integration Patterns](../common-integration-patterns/app-level-providers.md)
