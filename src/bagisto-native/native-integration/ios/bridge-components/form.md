# Form Component

The `FormComponent` optimizes the interaction between native iOS input handling and web-based forms.

## Basic Info

- **Native Class**: `FormComponent.swift`
- **GitHub Path**: [FormComponent.swift](https://github.com/SocialMobikul/BagistoNative_iOS/blob/main/Sources/BagistoNative_iOS/Classes/Components/FormComponent.swift)

## Description

This component helps in managing focus, specialized keyboards (like numeric or email), and auto-fill suggestions for web forms within the native app container.

## How to Use

### 1. Web Implementation
Usually handled automatically by the core library or by using specific attributes on your HTML inputs.

```html
<input 
    type="text" 
    data-bridge-component="form-input" 
    data-keyboard-type="email" 
/>
```

### 2. Native Side
The component listens for focus events and adjusts the `WKWebView` configuration or the native keyboard type accordingly.

```swift
Hotwire.registerBridgeComponents([FormComponent.self])
```
