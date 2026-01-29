# Why React Wrappers Exist

Web Components (Custom Elements) are great, but they have some friction when used directly in React.

## 1. Boolean Attributes
In standard HTML, a boolean attribute is set by its presence (`<input disabled>`). In React, you expect to pass a boolean (`<Input disabled={true} />`). The wrapper handles this conversion.

## 2. Event Listeners
React uses synthetic events (`onClick`). Custom Elements dispatch native CustomEvents.
**Without Wrapper**:
```javascript
useEffect(() => {
  ref.current.addEventListener('turbo:click', handler);
  return () => ref.current.removeEventListener('turbo:click', handler);
}, []);
```
**With Wrapper**:
```javascript
<DynamicButton onTurboClick={handler} />
```

## 3. Server Side Rendering Check
React/Next.js will try to render the component on the server. Custom Elements often crash on the server because `HTMLElement` is not defined. The wrapper encapsulates the logic to ensure they only render on the client.

## Next Steps

- Understand the [Relationship with core](./relationship-with-core.md)
- Learn about [Usage Rules](../usage-rules.md)
- Explore the [Components Reference](../components-reference.md)
