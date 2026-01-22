# Custom Bridge Components

The Bagisto Native framework provides a comprehensive, pre-built set of bridge components designed to handle common e-commerce scenarios out of the box.

## Framework Scope

It is important to understand that Bagisto Native is designed as a **pre-configured framework** with a fixed set of bridge components. 

> [!IMPORTANT]
> We do not provide a built-in "plugin system" or a standard way to register third-party custom bridge components within the `@bagisto-native` package itself. 

The framework currently includes and supports the following components:
- `DynamicButton`
- `HotwireToast`
- `HotwireSearch`
- `HotwireLocation`
- `HotwireHistorySync`
- `HotwireThemeMode`

## Implementing Your Own Components

If your project requires native features that are not covered by the default Bagisto Native components, you can still implement custom functionality. However, you must do so by following the standard [Hotwire Native](https://native.hotwired.dev/) and [Strada](https://strada.hotwired.dev/) documentation independently.

To implement custom bridge-to-native communication outside of the framework:

1.  **Web Side**: Create your own Stimulus controllers and register them with your own Stimulus application instance.
2.  **Native Side**: Implement the corresponding bridge components in your iOS (Swift) or Android (Kotlin) app using the respective Strada libraries.

By following this approach, your custom components will operate alongside Bagisto Native without interfering with the framework's core logic.

---

For more details on building native-web bridges from scratch, refer to the [Strada Handbook](https://strada.hotwired.dev/handbook/introduction).

## Next Steps

- Learn about [Deployment](../deployment/hosting.md)
- Explore [Native Release Workflow](../deployment/native-release-workflow.md)
- Understand [Best Practices](../core-module/best-practices.md)
