# HotwireSearch

The `HotwireSearch` component enables the native search bar. When the user taps the search icon (enabled via `DynamicButton`), the native app opens a native search input. When they submit, it sends an event back to your web app.

## Setup

Place this component in your layout or page.

```tsx
'use client';
import dynamic from "next/dynamic";

const HotwireSearch = dynamic(
  () => import('@bagisto-native/react').then(mod => mod.HotwireSearch),
  { ssr: false }
);

export default function NativeSearchListener() {
  return <HotwireSearch />;
}
```

## Handling Search Results

You must listen for the global `turbo:next-search` event to react to the user's input.

```tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function TurboSearchBridge() {
  const router = useRouter();

  useEffect(() => {
    const handleTurboSearch = (e: Event) => {
      // Event structure: { detail: { query: string, code: string } }
      const customEvent = e as CustomEvent<{ query?: string; code?: string }>;
      
      // 'query' is from text search, 'code' is from barcode scanner
      const searchTerm = customEvent.detail.query || customEvent.detail.code;
      
      if (searchTerm) {
        router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
    };

    window.addEventListener("turbo:next-search", handleTurboSearch);
    return () => window.removeEventListener("turbo:next-search", handleTurboSearch);
  }, [router]);

  return null; 
}
```

## Next Steps

- Explore [HotwireLocation](./hotwire-location.md)
- Learn about [HotwireHistorySync](./hotwire-history-sync.md)
- Understand [Common Integration Patterns](../common-integration-patterns/app-level-providers.md)
