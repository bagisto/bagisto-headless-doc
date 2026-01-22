# Layout-level Integration

If a `<DynamicButton>` should appear for a whole section of the site (e.g. "Home" button for the main feed), put it in the **Group Layout** or **Route Layout**.

```tsx
/* app/(shop)/layout.tsx */
export default function ShopLayout({ children }) {
  return (
    <>
      <DynamicButton pageType="home" /> 
      {children}
    </>
  );
}
```

This prevents the need to repeat `<DynamicButton pageType='home' />` on every single sub-page of the shop.

## Next Steps

- Explore [App-level Providers](./app-level-providers.md)
- Learn about [Page-level Integration](./page-level-integration.md)
- Understand [Native App Integration](../../native-integration/project-url-concept.md)
