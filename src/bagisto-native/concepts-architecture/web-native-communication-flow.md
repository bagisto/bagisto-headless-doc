# Web to Native Communication Flow

This document explains how Bagisto Native uses an event-driven bridge (Hotwire + Stimulus + native bridge) to enable safe, decoupled two-way communication between a web app and a native mobile app.

It includes diagrams, code examples, event names, and a quick integration checklist.

---

## Architecture (high level) 🏗️

Mermaid diagram (copyable; render with a mermaid-supported viewer):

```mermaid
flowchart LR
  subgraph Web_App[Web App]
    A[Hidden Web Components<br/>(<hotwire-*>, data-controller)]
    B[Utilities (triggerHotwireNativeToast, ...)]
    C[window event listeners]
  end

  subgraph Hotwire_Bridge[Hotwire Bridge]
    D[Stimulus controllers + Bridge]
  end

  subgraph Native_App[Native App]
    E[Bridge Components (toast, dynamicbutton, location...)]
    F[Native UI / Actions]
  end

  B --> A
  A --> D
  D --> E
  E --> F
  F --> D
  D --> A
  A --> C
```

Fallback ASCII diagram:

```
Web App (React/Next)    <---- Hotwire Bridge ---->   Native App (iOS / Android)
[Hidden <hotwire-*>]  -- data-* attrs / clicks -->  [BridgeComponent.send(...)]
[window events]  <-- CustomEvent responses / callbacks --  [native sends events]
```

---

## Components Involved 🔧

- **@bagisto-native/core**
  - Web Components (e.g., `<hotwire-toast>`, `<dynamic-button>`, `<hotwire-location>`)
  - Stimulus controllers in `core/hotwire/controllers/`
  - Utilities in `core/src/utils/utils.ts`
- **@bagisto-native/react**
  - Thin React wrappers that render the hidden web components
- **Native side**
  - Bridge components implemented using `@hotwired/hotwire-native-bridge`

> **Note:** The `bundle.js` file from `@bagisto-native/core/public/hotwire` must be included in your app’s `public/` folder and loaded on pages that use native features.

---

## Message Flow — Web → Native ➡️

1. Web code calls a utility or sets a `data-bridge-*` attribute on a hidden web component.
2. The utility locates the element wired to a Stimulus controller, sets attributes (e.g., `data-bridge-message`) and triggers a `.click()` (or dispatches an event).
3. The Stimulus controller picks this up and calls `this.send(...)` through the Hotwire native bridge.
4. The native Bridge Component receives the message and performs the native action (toast, open cart, scan, etc.).

Example (utility usage):

```ts
import { triggerHotwireNativeToast } from "@bagisto-native/core";
triggerHotwireNativeToast("Profile updated!");
```

Under the hood:

```text
document.querySelector("[data-controller='bridge--toast']")
  .setAttribute('data-bridge-message', message);
document.querySelector(...).click();
// Stimulus controller handles click -> this.send("show", {message})
```

---

## Message Flow — Native → Web ⬅️

1. A native action occurs (user scanned a barcode, tapped share, etc.).
2. The native Bridge Component sends data back or triggers a web-visible response.
3. The web app receives a `CustomEvent` (e.g., `turbo:next-search`) or the Stimulus controller dispatches an event that the app listens for.

Common events emitted to web:
- `turbo:next-search` → { query?, code? } (search / scan results)
- `turbo:next-cart-modal` → (open cart modal)
- `turbo:hotwire-app-fill-addresses` → { data } (location reverse-geocode results)
- `turbo:next-history-sync` → { URL } (history sync)

Example (listening to native search):

```ts
window.addEventListener("turbo:next-search", (e) => {
  const customEvent = e as CustomEvent<{ query?: string; code?: string }>;
  const query = customEvent.detail.query || customEvent.detail.code;
  // handle the query (router push / filter)
});
```

---

## Sequence Example — History Sync 🔁

1. Web detects a route change (e.g., Next.js `usePathname`).
2. Web calls:

```ts
triggerHistorySyncEvent(new URL(window.location.href));
```

3. Utility finds the `bridge--historysync` element and dispatches `turbo:next-history-sync` with detail `{ url }`.
4. The Stimulus controller `bridge--historysync` handles the event and calls `this.send("history", { location: url.toString() })` to the native layer.

---

## Events & Utilities Reference (quick) ⚡

**Utilities (from `@bagisto-native/core`):**
- `isTurboNativeUserAgent(userAgent?: string): boolean`
- `triggerHotwireNativeToast(message: string): void`
- `triggerHistorySyncEvent(url: URL): void`
- `triggerThemeModeEvent(mode: 'light' | 'dark'): void`
- `triggerCartCountValue(cartcount: number): void`

**Events to watch for:**
- `turbo:next-search` — native → web (search)
- `turbo:next-cart-modal` — native → web (open cart)
- `turbo:hotwire-app-fill-addresses` — native → web (location)
- `turbo:next-history-sync` — web ↔ native (history sync)

---

## Quick copyable snippets ✅

Minimal toast trigger:

```ts
import { triggerHotwireNativeToast } from "@bagisto-native/core";
triggerHotwireNativeToast("Saved!");
```

History sync (Next.js):

<div v-pre>

```ts
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { triggerHistorySyncEvent } from "@bagisto-native/core";

export default function HistorySync() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const origin = window.location.origin;
    const search = searchParams.toString() ? "?" + searchParams.toString() : "";
    const url = new URL(origin + pathname + search);
    triggerHistorySyncEvent(url);
  }, [pathname, searchParams]);

  return null;
}
```

</div>

Listen to native search event:

<div v-pre>

```ts
useEffect(() => {
  const handleTurboSearch = (e: Event) => {
    const customEvent = e as CustomEvent<{ query?: string; code?: string }>;
    const query = customEvent.detail.query || customEvent.detail.code;
    if (!query) return;
    router.push("/search?q=" + encodeURIComponent(query));
  };

  window.addEventListener("turbo:next-search", handleTurboSearch);
  return () => window.removeEventListener("turbo:next-search", handleTurboSearch);
}, [router]);
```

</div>

---

## Integration Checklist ✅

- [ ] Install packages:

```bash
npm install @bagisto-native/core @bagisto-native/react
```
- [ ] Copy `node_modules/@bagisto-native/core/public/hotwire/bundle.js` → `public/hotwire/bundle.js` and include it on all pages.
- [ ] Render React wrapper components at the app root (hidden): e.g., `<HotwireToast />`, `<HotwireHistorySync />`, `<DynamicButton />`.
- [ ] Add `window` event listeners for:
  - `turbo:next-search`
  - `turbo:next-cart-modal`
  - `turbo:hotwire-app-fill-addresses`
  - `turbo:next-history-sync`
- [ ] Use utilities to trigger native interactions from app logic.
- [ ] Use `isTurboNativeUserAgent()` where behavior should be gated to native contexts.

---

## Best Practices & Troubleshooting 🧭

- Keep bridge elements hidden (e.g., `style=&#123;&#123; display: 'none' &#125;&#125;`) — they are anchors only.
- Utilities are SSR-safe (they check `document` first). Use them in client-only code.
- Ensure `bundle.js` is included; missing bundle is the most common cause of communication failures.
- Add console logs inside Stimulus controllers (or on native side) when diagnosing event flows.
- If events don’t appear in the web, confirm the native Bridge Component is sending data and the web's `window` listener is attached.

> Tip: For debugging, temporarily show the web components (remove `display:none`) and add `console.log` inside event handlers to observe attribute changes and dispatched events.

---

**Done.** This file documents the Web ↔ Native communication flow with diagrams, code examples, and an integration checklist.
## Next Steps

- Learn about [Roles of Components](./roles-of-components.md)
- Explore [Hotwire & Turbo Native](./hotwire-turbo-native.md)
- Understand [Why WebView + Native Bridge](./why-webview-native-bridge.md)
