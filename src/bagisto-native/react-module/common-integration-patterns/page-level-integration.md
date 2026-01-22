# Page-level Integration

Use `<DynamicButton>` inside specific page components.

```tsx
/* app/product/[id]/page.tsx */
export default function ProductPage() {
  return (
    <>
      <DynamicButton pageType="product" />
      <ProductDetails />
    </>
  );
}
```

This ensures the "Share" button only appears when the user is actually viewing a product.

## Next Steps

- Understand [Layout-level Integration](./layout-level-integration.md)
- Explore [App-level Providers](./app-level-providers.md)
- Learn about [Native App Integration](../../native-integration/project-url-concept.md)
