# Local vs Production URLs

Transitioning from a development environment to a live production environment requires updating your app's configuration.

## Initial Setup (Development)
During development, your app usually points to a local storefront instance.
- **Simulator**: Can use `http://localhost:3000` or `http://127.0.0.1:3000`.
- **Physical Device**: Must use your computer's local IP address (e.g., `http://192.168.1.15:3000`).

## Going Live (Production)
For production, the app must point to your public domain.
- **Example**: `https://shop.yourdomain.com/`

### Comparison Table

| Feature | Local Development | Production |
| :--- | :--- | :--- |
| **Protocol** | `http` (usually) | `https` (required) |
| **Domain** | IP Address / localhost | Registered Domain |
| **Network** | Private/Local Wi-Fi | Public Internet |
| **Performance** | Fast (Direct) | Dependent on CDN/Server |

> [!CAUTION]
> Apple's **App Transport Security (ATS)** requires `https` for production. Ensure your production server has a valid SSL certificate.
