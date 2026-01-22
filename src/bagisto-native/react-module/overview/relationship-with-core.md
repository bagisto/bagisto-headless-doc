# Relationship with Core

The React package is a **thin layer** on top of the Core package.

*   `@bagisto-native/react` **depends on** `@bagisto-native/core`.
*   It does *not* contain the business logic. It just renders the underlying custom element from Core.

## Dependency Graph

```text
Your Next.js App
  └── @bagisto-native/react
       └── @bagisto-native/core (Contains the actual Logic & Bridge)
```

This means you **must** have `@bagisto-native/core` installed for the React package to work.

## Next Steps

- Learn about [Usage Rules](../usage-rules.md)
- Explore the [Components Reference](../components-reference.md)
- Understand [Integration Patterns](../integration-patterns.md)
