# App-level Providers

Some components should exist for the entire lifecycle of the app.

Place `<HotwireToast>` and `<HotwireHistorySync>` in your **Root Layout** (`app/layout.tsx`).

```tsx
/* app/layout.tsx */
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
         <NativeBridgeListeners /> 
         {children}
      </body>
    </html>
  );
}
```

(See `NativeBridgeListeners` implementation in the "Installation" section).

## Next Steps

- Learn about [Page-level Integration](./page-level-integration.md)
- Understand [Layout-level Integration](./layout-level-integration.md)
- Explore [Native App Integration](../../native-integration/project-url-concept.md)
