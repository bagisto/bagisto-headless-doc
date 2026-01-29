# SSR vs Client-side Considerations

## The Gold Rule: `ssr: false`

All components related to Bagisto Native (Core or React wrappers) **must** be client-side only.

*   **Why**: They rely on `window`, `document`, and `customElements`, which do not exist on the Node.js server.
*   **How**:
    *   **Components**: Use `next/dynamic` with `{ ssr: false }`.
    *   **Utilities**: The utility functions (like `triggerHotwireNativeToast`) effectively do nothing if called on the server, but it is best practice to wrap them in `useEffect` or event handlers that only run on the client.

## Conditional Rendering

Sometimes you want to show a "Back" button on the Web but hide it in the Native App (since the Native App has its own toolbar back button).

```tsx
import { isTurboNativeUserAgent } from '@bagisto-native/core';

// Inside a useEffect on the client
const [isNative, setIsNative] = useState(false);

useEffect(() => {
   setIsNative(isTurboNativeUserAgent());
}, []);

return (
  <>
    {!isNative && <MyWebBackButton />}
  </>
);
```

## Next Steps

- Explore [Web Components](../../sdk-reference/bagisto-native-core/web-components.md)
- Learn about [Utility Functions](../../sdk-reference/bagisto-native-core/utility-functions.md)
- Understand the [React Module](../../sdk-reference/bagisto-native-react/react-overview.md)
