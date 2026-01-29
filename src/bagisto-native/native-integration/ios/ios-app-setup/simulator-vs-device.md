# Simulator vs Device

Testing your Bagisto Native app on both simulators and physical devices is crucial for a smooth user experience.

## iOS Simulator
The simulator is great for rapid UI development and debugging.
- **Pros**: Fast build times, easy to test different screen sizes.
- **Cons**: Does not simulate camera, sensors, or real-world network conditions.
- **Accessing Localhost**: Use `http://localhost:3000` or `http://127.0.0.1:3000`.

## Physical iOS Device
A real device is necessary for final verification and native functionality testing.
- **Pros**: Real-world performance, accurate touch interactions, camera support.
- **Cons**: Requires a Wi-Fi connection and manual IP configuration.
- **Accessing Localhost**: Use your Mac's IP address (e.g., `http://192.168.1.50:3000`).

### Which one to use?

| Scenario | Simulator | Physical Device |
| :--- | :--- | :--- |
| **Initial UI Layout** | Preferred | Good |
| **Native Bridge Tests** | Good | Preferred |
| **Performance Benchmarking** | No | Preferred |
| **Animation Smoothness** | No | Preferred |

> [!TIP]
> Always do a final "smoke test" on a physical device before any major release.
