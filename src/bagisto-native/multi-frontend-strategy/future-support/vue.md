# Vue.js Support

## Status: Planned

Vue.js is a first-class citizen in the Bagisto ecosystem (the default admin panel and shop are built with it).

### Implementation Strategy

The `@bagisto-native/core` library is written in vanilla TypeScript/JavaScript, meaning it can be used in Vue apps today by manually attaching Stimulus controllers to DOM elements.

**Future `@bagisto-native/vue` Package:**
- wrappers for `<DynamicButton />`
- Vue composables `useNativeBridge()`
- Directives `v-native-hide`, `v-native-show`

### Community Contribution

If you are interested in accelerating Vue support, please look at the `packages/react` source code. Porting the simplistic React wrappers to Vue components is a great way to contribute!

## Next Steps

- Explore [Future Support for Angular](./angular.md)
- Learn about [Shared API Strategy](../shared-api-strategy.md)
- Understand [React SPA Usage](../react-spa-usage.md)
