# Product Variants

This guide covers how product variants (configurable products) are handled in the Bagisto Headless storefront, including fetching variant data and managing user selection.


## Overview

In Bagisto, configurable products are made up of multiple variants, each distinguished by a set of attributes known as **Super Attributes** (e.g., Color, Size). The storefront fetches these attributes and their options to allow users to select the specific variant they wish to purchase.


## 1. Fetching Variant Data

To display variant options (swatches or dropdowns), the storefront uses a specialized query `GET_PRODUCT_SWATCH_REVIEW`. This query retrieves the `superAttributes` associated with a product.

### Super Attributes Query
The query fetches the attributes, their options, and visibility settings.

**File:** `src/graphql/catelog/queries/Product.ts`

```graphql
query ProductSwatchReview($id: ID!) {
  product(id: $id) {
    id
    name
    sku
    superAttributes {
      edges {
        node {
          id
          code
          adminName
          options {
            edges {
              node {
                id
                adminName
              }
            }
          }
        }
      }
    }
  }
}
```


## 2. UI Components

The variant selection is primarily handled by the `VariantSelector` component, which is integrated into the `ProductDescription`.

### Variant Selector Component
This client-side component renders the available options and updates the URL when a user makes a selection.

**File:** `src/components/catalog/product/VariantSelector.tsx`

```tsx
export function VariantSelector({
  variants,
  setUserInteracted,
}: {
  variants: AttributeData[];
  setUserInteracted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      {variants.map((option) => (
        <dl key={option.id}>
          <dt>{option.adminName}</dt>
          <dd>
            {option.options.edges.map(({ node }) => (
              <button
                key={node.id}
                onClick={() => {
                  const nextParams = new URLSearchParams(searchParams.toString());
                  nextParams.set(option.code, node.id);
                  const optionUrl = createUrl(pathname, nextParams);
                  router.replace(optionUrl, { scroll: false });
                }}
              >
                {node.adminName}
              </button>
            ))}
          </dd>
        </dl>
      ))}
    </>
  );
}
```


## 3. Selection Logic

Bagisto Headless uses URL search parameters to manage the state of selected variants. This approach has several benefits:
- **Shareable URLs:** Users can share a link to a specific variant (e.g., `?color=Red&size=M`).
- **SEO Friendly:** Search engines can index different variant states if configured.
- **Predictable State:** The UI always reflects the current URL, making the application state easier to reason about.

### How it Works
1. **Initial Load:** When the page loads, the `ProductDescription` component reads the current search parameters.
2. **User Interaction:** When a user clicks an option in `VariantSelector`, the `router.replace` function updates the URL with the new parameter.
3. **Reactive UI:** The `ProductDescription` and other sub-components react to the search parameter changes (using `useSearchParams`) to display the correct price, images, and availability for the selected variant.


## Summary

- **Super Attributes:** Fetched via `GET_PRODUCT_SWATCH_REVIEW` to build selection UI.
- **URL-based State:** Selection is managed via search parameters for shareability and predictability.
- **Client-side Interaction:** `VariantSelector` provides a fast, interactive experience for choosing options.


## Next Steps

- 🖼️ [Product Gallery](/bagisto-headless-ecommerce/features/catalog/product-details/product-images.md) - How variant images are displayed.

