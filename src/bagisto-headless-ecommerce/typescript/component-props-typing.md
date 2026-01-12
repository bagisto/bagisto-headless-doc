# Component Props Typing

This guide explains how React component props are typed in the Bagisto Headless storefront to ensure data integrity and developer efficiency.

## Overview

The storefront uses TypeScript interfaces and type aliases to define the contract between a component and its consumers. This prevents passing invalid data and provides excellent IDE support via IntelliSense.

## 1. Using Interfaces for Props

The most common way to type props is by defining a dedicated interface. This is especially useful for complex components with many configuration options.

**Example: Checkout Stepper**
```typescript
interface CheckOutProps {
  billingAddress?: any; // Consider using specific address types
  shippingAddress?: any;
  currentStep: string;
  selectedPayment?: any;
  selectedPaymentTitle?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedShippingRate?: any;
  selectedShippingRateTitle?: string;
}

export default function CheckOut(props: CheckOutProps) {
  // ...
}
```

## 2. Using React.FC (FunctionComponent)

For simpler components or when you want to take advantage of standard React types, the `FC` (Function Component) generic is used.

**Example: Payment Step Wrapper**
```tsx
import { FC } from "react";

const Payment: FC<{
  selectedPayment?: {
    method: string;
    methodTitle?: string;
  };
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}> = ({ selectedPayment, isOpen, setIsOpen }) => {
  // ...
};
```

## 3. Organizing Shared Prop Types

For core UI elements used across the site, prop types are often centralized in a `type.ts` file within the component's directory.

**Example Directory:** `src/components/common/`
- `NextImage.tsx` (Component)
- `type.ts` (Prop interfaces)

```typescript
// src/components/common/type.ts
export interface NextImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}
```

## 4. Handling Callbacks & Events

Callback props are typed as functions that return `void` or a specific value.

```typescript
interface ModalProps {
  onClose: () => void;
  onConfirm: (data: string) => Promise<boolean>;
}
```

## Best Practices

1. **Avoid `any`:** Try to use specific types from `src/types/types.ts` (like `AddressDataTypes` or `ProductData`) instead of `any`.
2. **Optional vs Required:** Use the `?` modifier to clearly indicate which props are optional for the component to function.
3. **Destructuring with Defaults:** Combine prop typing with ES6 destructuring to provide clean default values for optional props.
4. **Documentation:** Add JSDoc comments to complex props to explain their purpose to other developers.

## Next Steps

- 📘 [Type Definitions](/bagisto-headless-ecommerce/typescript/type-definitions.md) - Core models used as prop types.
- 🏗️ [Architecture Overview](/bagisto-headless-ecommerce/overview/architecture-overview.md) - The high-level component hierarchy.
- 🧱 [Reusable Components](/bagisto-headless-ecommerce/overview/architecture-overview/reusable-components.md) - See these types in action in common UI elements.
