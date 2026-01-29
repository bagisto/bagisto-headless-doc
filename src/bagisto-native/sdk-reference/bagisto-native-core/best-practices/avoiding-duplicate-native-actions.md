# Avoiding Duplicate Native Actions

## The Double-Header Problem
Since your web app has a header/navbar and the native app has its own native toolbar, you often end up with **two headers**.

### Solution
Use `isTurboNativeUserAgent` to conditionally **hide** the web header when running inside the native app.

```jsx
if (isTurboNativeUserAgent()) {
  return <main>{children}</main>; // No Header
} else {
  return <Layout>{children}</Layout>; // Web Header
}
```

## The Double-Toast Problem
Do not show a web toast AND a native toast. Pick one based on the environment check.

## Next Steps

- Understand [Performance](./performance.md)
- Explore [Event Safety](./event-safety.md)
- Learn about the [React Module](../../bagisto-native-react/react-overview.md)
