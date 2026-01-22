# Bagisto Native Framework

The **Bagisto Native Framework** is the bridge layer that enables seamless communication between your web application (Bagisto Headless) and native mobile applications. It consists of two npm packages: `@bagisto-native/core` and `@bagisto-native/react`.

## Overview

```mermaid
graph TB
    subgraph "Bagisto Native Framework"
        A[@bagisto-native/core] --> B[Web Components]
        A --> C[Utility Functions]
        A --> D[bundle.js]
        E[@bagisto-native/react] --> F[React Wrappers]
        F --> B
    end
    
    G[Bagisto Headless] --> E
    G --> A
    D <--> H[Native Apps]
    
    style A fill:#45b7d1
    style E fill:#96ceb4
```

## Package Architecture

### @bagisto-native/core

The foundation package providing core functionality.

```
@bagisto-native/core/
  ├── src/
  │   ├── components/          # Web Component definitions
  │   │   ├── toast.ts
  │   │   ├── search.ts
  │   │   ├── location.ts
  │   │   └── dynamic-button.ts
  │   ├── utils/               # Utility functions
  │   │   ├── user-agent.ts
  │   │   └── events.ts
  │   ├── triggers/            # Event trigger functions
  │   │   ├── toast.ts
  │   │   ├── theme.ts
  │   │   └── cart.ts
  │   └── index.ts             # Main export
  ├── public/
  │   └── bundle.js            # Minified Hotwire components
  └── package.json
```

### @bagisto-native/react

React-specific wrappers for seamless integration.

```
@bagisto-native/react/
  ├── src/
  │   ├── components/          # React component wrappers
  │   │   ├── HotwireToast.tsx
  │   │   ├── HotwireSearch.tsx
  │   │   ├── HotwireLocation.tsx
  │   │   ├── HotwireHistorySync.tsx
  │   │   ├── HotwireThemeMode.tsx
  │   │   └── DynamicButton.tsx
  │   └── index.ts             # Main export
  └── package.json
```

## Core Responsibilities

### 1. Web Components

Provides custom Web Components for native interactions.

#### Component List:

| Component | Purpose | Direction |
|-----------|---------|-----------|
| HotwireToast | Show native toast messages | Web → Native |
| HotwireSearch | Native search integration | Native → Web |
| HotwireLocation | Get device location | Native → Web |
| HotwireHistorySync | Sync navigation history | Web → Native |
| HotwireThemeMode | Theme mode synchronization | Web → Native |
| DynamicButton | Multi-purpose native buttons | Both |

#### Web Component Definition Example:

```typescript
// core/src/components/toast.ts
export class HotwireToastElement extends HTMLElement {
  connectedCallback() {
    this.addEventListener('turbo:toast', this.handleToast);
  }
  
  disconnectedCallback() {
    this.removeEventListener('turbo:toast', this.handleToast);
  }
  
  handleToast(event: CustomEvent) {
    const message = event.detail.message;
    // Bridge handles native communication
    console.log('Toast:', message);
  }
}

// Register the custom element
customElements.define('hotwire-toast', HotwireToastElement);
```

### 2. Event Trigger Functions

Provides JavaScript functions to dispatch events to native apps.

#### Available Triggers:

```typescript
// core/src/triggers/toast.ts
export function triggerHotwireNativeToast(message: string): void {
  const event = new CustomEvent('turbo:toast', {
    detail: { message },
    bubbles: true
  });
  window.dispatchEvent(event);
}

// core/src/triggers/theme.ts
export function triggerThemeModeEvent(mode: 'light' | 'dark'): void {
  const event = new CustomEvent('turbo:theme-mode', {
    detail: { mode },
    bubbles: true
  });
  window.dispatchEvent(event);
}

// core/src/triggers/cart.ts
export function triggerCartCountValue(count: number): void {
  const event = new CustomEvent('turbo:cart-count', {
    detail: { count },
    bubbles: true
  });
  window.dispatchEvent(event);
}

// core/src/triggers/history.ts
export function triggerHistorySyncEvent(url: URL): void {
  const event = new CustomEvent('turbo:history-sync', {
    detail: { 
      url: url.toString(),
      pathname: url.pathname,
      search: url.search
    },
    bubbles: true
  });
  window.dispatchEvent(event);
}
```

### 3. Utility Functions

Helper functions for common tasks.

#### User Agent Detection:

```typescript
// core/src/utils/user-agent.ts

/**
 * Check if running in Turbo Native environment
 * @param userAgent - Optional user agent string (for server-side)
 * @returns boolean indicating if Turbo Native
 */
export function isTurboNativeUserAgent(userAgent?: string): boolean {
  const ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  return /Turbo Native/i.test(ua);
}

/**
 * Get platform (iOS or Android)
 * @returns 'ios' | 'android' | 'web'
 */
export function getPlatform(): 'ios' | 'android' | 'web' {
  if (!isTurboNativeUserAgent()) return 'web';
  
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  
  return 'web';
}
```

#### Event Utilities:

```typescript
// core/src/utils/events.ts

/**
 * Create a typed custom event
 */
export function createTypedEvent<T>(
  type: string, 
  detail: T
): CustomEvent<T> {
  return new CustomEvent(type, {
    detail,
    bubbles: true,
    composed: true
  });
}

/**
 * Add event listener with automatic cleanup
 */
export function addManagedListener<T>(
  eventType: string,
  handler: (event: CustomEvent<T>) => void
): () => void {
  const wrappedHandler = (e: Event) => handler(e as CustomEvent<T>);
  window.addEventListener(eventType, wrappedHandler);
  
  // Return cleanup function
  return () => window.removeEventListener(eventType, wrappedHandler);
}
```

### 4. bundle.js - The Bridge

The heart of the framework: minified Hotwire web components.

#### What bundle.js Contains:

```javascript
// Simplified representation of bundle.js
(function() {
  // Turbo Native bridge initialization
  const bridge = {
    platform: detectPlatform(),
    
    // Send message to native
    postMessage(type, data) {
      if (this.platform === 'ios') {
        window.webkit.messageHandlers.nativeBridge.postMessage({
          type, data
        });
      } else if (this.platform === 'android') {
        window.NativeBridge.postMessage(JSON.stringify({
          type, data
        }));
      }
    },
    
    // Receive message from native
    receiveMessage(type, data) {
      const event = new CustomEvent(type, { detail: data });
      window.dispatchEvent(event);
    }
  };
  
  // Expose to window
  window.turboNativeBridge = bridge;
  
  // Listen for web events and forward to native
  window.addEventListener('turbo:toast', (e) => {
    bridge.postMessage('toast', e.detail);
  });
  
  // ... more event listeners
})();
```

#### How bundle.js Works:

1. **Platform Detection**: Identifies iOS/Android/Web
2. **Bridge Initialization**: Sets up native communication channels
3. **Event Interception**: Listens for custom events from web
4. **Message Serialization**: Converts events to native messages
5. **Native Communication**: Sends messages via platform-specific APIs
6. **Response Handling**: Receives native responses and dispatches events

## React Integration

### @bagisto-native/react Components

React wrappers that provide a seamless developer experience.

#### HotwireToast Component:

```typescript
// react/src/components/HotwireToast.tsx
import React, { useEffect, useRef } from 'react';

export interface HotwireToastProps {
  style?: React.CSSProperties;
  className?: string;
}

export const HotwireToast: React.FC<HotwireToastProps> = ({ 
  style, 
  className 
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Load web component if not already loaded
    if (!customElements.get('hotwire-toast')) {
      import('@bagisto-native/core').then(({ HotwireToastElement }) => {
        customElements.define('hotwire-toast', HotwireToastElement);
      });
    }
  }, []);
  
  return (
    <hotwire-toast 
      ref={elementRef}
      style={style}
      className={className}
    />
  );
};
```

#### HotwireLocation Component:

```typescript
// react/src/components/HotwireLocation.tsx
import React from 'react';

export interface FieldNames {
  address: string[];
  city: string[];
  postCode: string[];
}

export interface HotwireLocationProps {
  fieldNames: FieldNames;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const HotwireLocation: React.FC<HotwireLocationProps> = ({
  fieldNames,
  style,
  children
}) => {
  useEffect(() => {
    // Register field name mapping
    const event = new CustomEvent('turbo:location-register', {
      detail: { fieldNames }
    });
    window.dispatchEvent(event);
    
    // Cleanup
    return () => {
      const cleanupEvent = new CustomEvent('turbo:location-unregister');
      window.dispatchEvent(cleanupEvent);
    };
  }, [fieldNames]);
  
  return (
    <hotwire-location style={style}>
      {children}
    </hotwire-location>
  );
};
```

#### DynamicButton Component:

```typescript
// react/src/components/DynamicButton.tsx
import React, { useEffect } from 'react';

export interface DynamicButtonProps {
  pageType?: 'home' | 'product';
  cartCountEvent?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const DynamicButton: React.FC<DynamicButtonProps> = ({
  pageType,
  cartCountEvent = false,
  style,
  children
}) => {
  useEffect(() => {
    if (pageType) {
      // Notify native of page type for appropriate buttons
      const event = new CustomEvent('turbo:page-type', {
        detail: { pageType }
      });
      window.dispatchEvent(event);
    }
  }, [pageType]);
  
  return (
    <dynamic-button 
      data-page-type={pageType}
      data-cart-count={cartCountEvent}
      style={style}
    >
      {children}
    </dynamic-button>
  );
};
```

## Installation & Setup

### 1. Install Packages

```bash
npm install @bagisto-native/core @bagisto-native/react
```

### 2. Copy bundle.js

```bash
# Navigate to core package
cd node_modules/@bagisto-native/core/public

# Copy bundle.js to your public directory
cp bundle.js /path/to/your/project/public/
```

### 3. Load bundle.js in Your App

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Load bundle.js */}
        <script src="/bundle.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 4. Add Native Components

```typescript
// app/providers.tsx
'use client';

import { HotwireToast, HotwireHistorySync } from '@bagisto-native/react';

export function NativeProviders() {
  return (
    <>
      <HotwireToast />
      <HotwireHistorySync />
    </>
  );
}
```

## Usage Examples

### Example 1: Show Native Toast

```typescript
import { triggerHotwireNativeToast } from '@bagisto-native/core';

function ProductCard({ product }) {
  const handleAddToCart = async () => {
    await addToCart(product.id);
    
    // Show native toast
    triggerHotwireNativeToast('Product added to cart!');
  };
  
  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
```

### Example 2: Update Cart Badge

```typescript
import { triggerCartCountValue } from '@bagisto-native/core';

function CartContext() {
  const updateCartCount = (count: number) => {
    // Update native cart badge
    triggerCartCountValue(count);
  };
  
  return { updateCartCount };
}
```

### Example 3: Theme Synchronization

```typescript
import { triggerThemeModeEvent } from '@bagisto-native/core';
import { useEffect } from 'react';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    // Sync theme with native app
    triggerThemeModeEvent(theme);
  }, [theme]);
  
  return <ThemeContext.Provider value={{ theme, setTheme }}>
    {children}
  </ThemeContext.Provider>;
}
```

### Example 4: Location Auto-fill

```typescript
import { HotwireLocation } from '@bagisto-native/react';

function CheckoutForm() {
  return (
    <form>
      <HotwireLocation 
        fieldNames={{
          address: ['shipping.address', 'billing.address'],
          city: ['shipping.city', 'billing.city'],
          postCode: ['shipping.postcode', 'billing.postcode']
        }}
        style={{ display: 'none' }}
      />
      
      <input name="shipping.address" />
      <input name="shipping.city" />
      <input name="shipping.postcode" />
    </form>
  );
}
```

## TypeScript Support

### Type Definitions

```typescript
// Type definitions included in packages

// Event detail types
export interface ToastDetail {
  message: string;
}

export interface ThemeDetail {
  mode: 'light' | 'dark';
}

export interface CartCountDetail {
  count: number;
}

export interface SearchDetail {
  query?: string;
  code?: string;
}

export interface LocationDetail {
  address: string;
  city: string;
  postCode: string;
}

// Custom event types
export type TurboToastEvent = CustomEvent<ToastDetail>;
export type TurboThemeEvent = CustomEvent<ThemeDetail>;
export type TurboSearchEvent = CustomEvent<SearchDetail>;
export type TurboLocationEvent = CustomEvent<LocationDetail>;
```

### Using Types

```typescript
import type { TurboSearchEvent } from '@bagisto-native/core';

window.addEventListener('turbo:next-search', (e: Event) => {
  const searchEvent = e as TurboSearchEvent;
  const query = searchEvent.detail.query;
  // TypeScript knows the shape of detail
});
```

## Extending the Framework

### Adding Custom Components

```typescript
// 1. Define web component
export class CustomFeatureElement extends HTMLElement {
  connectedCallback() {
    this.addEventListener('custom:event', this.handleEvent);
  }
  
  handleEvent(event: CustomEvent) {
    // Custom logic
  }
}

// 2. Register component
customElements.define('custom-feature', CustomFeatureElement);

// 3. Create trigger function
export function triggerCustomFeature(data: any) {
  const event = new CustomEvent('custom:event', {
    detail: data,
    bubbles: true
  });
  window.dispatchEvent(event);
}

// 4. Create React wrapper
export const CustomFeature: React.FC = () => {
  return <custom-feature />;
};
```

## Performance Considerations

### 1. Lazy Loading Components

```typescript
// Only load when needed
const HotwireLocation = dynamic(
  () => import('@bagisto-native/react').then(m => m.HotwireLocation),
  { ssr: false }
);
```

### 2. Event Throttling

```typescript
import { debounce } from 'lodash';

const sendThemeMode = debounce((mode: string) => {
  triggerThemeModeEvent(mode);
}, 300);
```

### 3. Conditional Loading

```typescript
import { isTurboNativeUserAgent } from '@bagisto-native/core';

function App() {
  const isNative = isTurboNativeUserAgent();
  
  return (
    <>
      {isNative && <HotwireToast />}
      {/* Only load in native environment */}
    </>
  );
}
```

## Testing

### Unit Testing

```typescript
// __tests__/toast.test.ts
import { triggerHotwireNativeToast } from '@bagisto-native/core';

describe('Toast Trigger', () => {
  it('dispatches toast event', () => {
    const eventSpy = jest.fn();
    window.addEventListener('turbo:toast', eventSpy);
    
    triggerHotwireNativeToast('Test message');
    
    expect(eventSpy).toHaveBeenCalled();
    expect(eventSpy.mock.calls[0][0].detail.message).toBe('Test message');
  });
});
```

### Integration Testing

```typescript
// __tests__/integration/native-bridge.test.tsx
import { render, screen } from '@testing-library/react';
import { HotwireToast } from '@bagisto-native/react';

describe('Native Bridge Integration', () => {
  it('renders toast component', () => {
    render(<HotwireToast />);
    expect(document.querySelector('hotwire-toast')).toBeInTheDocument();
  });
});
```

## Versioning & Compatibility

### Semantic Versioning

```
@bagisto-native/core@1.2.3
  │  │  └─ Patch: Bug fixes
  │  └──── Minor: New features (backward compatible)
  └────── Major: Breaking changes
```

### Compatibility Matrix

| Framework Version | React Version | Next.js Version | Node Version |
|------------------|---------------|-----------------|--------------|
| 1.x | 18+ | 15+ | 18+ |
| 2.x | 18+ | 15+ | 20+ |

## Best Practices

1. **Always Load bundle.js First**: Before any native components
2. **Use TypeScript**: Leverage type safety
3. **Lazy Load Components**: Only load what's needed
4. **Handle Both Environments**: Code should work in web and native
5. **Clean Up Event Listeners**: Prevent memory leaks
6. **Version Lock Dependencies**: Ensure consistency
7. **Test Thoroughly**: Unit and integration tests
8. **Document Custom Components**: Help future developers

## Troubleshooting

### Common Issues

**Issue**: Components not rendering
```typescript
// Solution: Ensure bundle.js is loaded
<script src="/bundle.js" />
```

**Issue**: Events not firing
```typescript
// Solution: Check event listener setup
window.addEventListener('turbo:toast', handler);
```

**Issue**: TypeScript errors
```typescript
// Solution: Import types
import type { TurboToastEvent } from '@bagisto-native/core';
```

## Next Steps

- Learn about [Native Apps](./native-apps.md)
- Understand [Hotwire & Turbo Native](../hotwire-turbo-native.md)
- Explore [Web ↔ Native Communication](../web-native-communication-flow.md)

## Additional Resources

- [npm: @bagisto-native/core](https://www.npmjs.com/package/@bagisto-native/core)
- [npm: @bagisto-native/react](https://www.npmjs.com/package/@bagisto-native/react)
- [Web Components Standard](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
## Next Steps

- Explore [Native Apps](./native-apps.md)
- Learn about [Communication Flow](../web-native-communication-flow.md)
- Understand [Hotwire & Turbo Native](../hotwire-turbo-native.md)
