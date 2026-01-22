# Angular Support

## Status: Under Consideration

Angular support is currently not in active development but is on our radar.

### Implementation Strategy

Similar to Vue, Angular developers can utilize the `@bagisto-native/core` package directly. Hotwire/Stimulus controllers work by observing the DOM, so they are compatible with Angular's rendering engine as long as the DOM elements are present.

### Challenges

- **Navigation**: Angular's router would need to be integrated with Turbo Drive, similar to how `react-router` integration is handled.
- **Dependency Injection**: Creating an Angular module that allows injecting the Native Bridge service.

## Next Steps

- Explore [Future Support for Vue](./vue.md)
- Learn about [Shared API Strategy](../shared-api-strategy.md)
- Understand [React SPA Usage](../react-spa-usage.md)
