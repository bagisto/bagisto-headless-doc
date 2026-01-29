# Component & Bridge Integration

Integrating **Bagisto Native** into your storefront involves two distinct layers that convert your web application into a native-ready powerhouse.

## What you will do in this section:

1.  **UI Component Anchors**: Direct React components from `@bagisto-native/react` that act as native UI hooks.
2.  **Functional Bridges**: Event-driven logic that handles bidirectional communication.
3.  **Performance Optimization**: Implementation of lazy-loading for native-specific bridge components.


## 1. UI Component Integration

These components are required for the native bridge to identify "hooks" in your web page. They are rendered as hidden elements that the native app detects.

### Pattern: Lazy-Loaded Wrappers
Since these components depend on the browser `window` and DOM, they must be client-only.

```tsx
// src/components/native/HotwireSearch.tsx
'use client';
import dynamic from "next/dynamic";

const HotwireSearch = dynamic(
    () => import('@bagisto-native/react').then(mod => mod.HotwireSearch),
    { ssr: false }
);

export default function NativeSearch() {
    return <HotwireSearch />;
}
```

---

## 2. Functional Bridge Integration

Bridges are "headless" components (returning `null`) that synchronize state or handle routing.

### A. Routing Bridge (Native → Web)
Used to handle events triggered by native actions, such as a **Barcode Scan** or an **Image Search** result.

```tsx
// src/components/hotwire/TurboSearchRouterBridge.tsx
'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function TurboSearchRouterBridge() {
  const router = useRouter();

  useEffect(() => {
    const handleTurboSearch = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string; code?: string }>;
      const query = customEvent.detail.query || customEvent.detail.code;
      
      if (query) {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    };

    window.addEventListener("turbo:next-search", handleTurboSearch);
    return () => window.removeEventListener("turbo:next-search", handleTurboSearch);
  }, [router]);

  return null; 
}
```

### B. UI Synchronization Bridge (Native ↔ Web)
Used when the native application needs to trigger a web-based UI element, like opening the **Cart Slide-over** from a native button.

```tsx
// src/components/hotwire/TurboCartModalBridge.tsx
'use client';
import { useEffect } from "react";
import { triggerDynamicButtonModalOpenEvent } from "@bagisto-native/core";

export default function TurboCartModalBridge({ onOpen, isOpen }) {
  useEffect(() => {
    const handleTurboCartModalOpen = (e: Event) => {
      if (!isOpen) {
        triggerDynamicButtonModalOpenEvent(); // Sync state to bridge
        onOpen(); // Open web cart modal
      }
    };

    window.addEventListener("turbo:next-cart-modal", handleTurboCartModalOpen);
    return () => window.removeEventListener("turbo:next-cart-modal", handleTurboCartModalOpen);
  }, [isOpen, onOpen]);

  return null;
}
```

### C. State Synchronization (Web → Native)
Used to inform the native app of web-side changes, such as **Navigation/History** changes or updating a **Cart Count Badge**.

```tsx
// src/components/hotwire/HistorySync.tsx
'use client';
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function HistorySync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = new URL(`${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
    const seoTitle = document?.title || "";

    const bridgeElement = document.querySelector("[data-controller='bridge--historysync']");

    if (bridgeElement) {
      bridgeElement.dispatchEvent(new CustomEvent("turbo:next-history-sync", {
        detail: { url, seoTitle },
        bubbles: true
      }));
    }
  }, [pathname, searchParams]);

  return null;
}
```

---

## 3. Global Orchestration

In your `RootLayout`, you should mount these bridges alongside the bridge script to ensure consistent behavior across all pages.

```tsx
// src/app/layout.tsx
import Script from "next/script";
import TurboSearchRouterBridge from "@/components/hotwire/TurboSearchRouterBridge";
import HistorySync from "@/components/hotwire/HistorySync";
import NativeToast from "@/components/native/HotwireToast";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script strategy="beforeInteractive" src="/hotwire/bundle.js" />
      </head>
      <body>
        {children}
        
        {/* Logic Bridges */}
        <TurboSearchRouterBridge />
        <HistorySync />
        
        {/* UI Anchors */}
        <NativeToast />
      </body>
    </html>
  );
}
```

---

## 4. Summary of Bridge Patterns

| Pattern | Interaction Direction | Real-world Example |
| :--- | :--- | :--- |
| **Routing Bridge** | Native → Web | Redirecting web app after a Barcode Scan. |
| **Logic Bridge** | Native → Web | App shell button opening the web Cart modal. |
| **Sync Bridge** | Web → Native | Updating the App's Title Bar on navigation. |
| **UI Components** | Native ↔ Web | Triggering native "Image Search" from a web button. |

By combining **React Wrappers** with **Functional Bridges**, you create a truly integrated experience where the web and native layers behave as a single, fluid application.
