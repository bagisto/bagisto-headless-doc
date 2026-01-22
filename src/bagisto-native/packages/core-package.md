# @bagisto-native/core

The `@bagisto-native/core` package is the foundation of the Bagisto Native framework. It provides the essential building blocks for enabling Hotwire-based communication between your web application and the native iOS/Android apps.

## Overview

This package handles the low-level integration with the native bridge. It is framework-agnostic, meaning it uses standard Web Components (Custom Elements) that can work with **any** web technology stack, whether it's Vanilla JS, Vue, React, or others.

::: info Core Responsibility
The primary role of this package is to define the custom elements (like `<dynamic-button>`) and providing the JavaScript bundle that facilitates the message passing to the native shell.
:::

## Installation

```bash
npm install @bagisto-native/core
```

## Key Components

*   **Native Bridge Bundle**: Access to the compiled `bundle.js`.
*   **Web Components**: Standard HTML custom elements for UI interactions.
*   **Utilities**: Helper functions for events like Toast, History Sync, and Theme switching.

## Learn More

*   [**What it provides**](./bagisto-native-core/what-it-provides.md) - Detailed breakdown of components and utilities.
*   [**When to use**](./bagisto-native-core/when-to-use.md) - Guidance on when to use this package directly.

## Next Steps

- Explore [What it provides](./bagisto-native-core/what-it-provides.md)
- Learn about [When to use](./bagisto-native-core/when-to-use.md)
- Understand the [React Package](./react-package.md)
