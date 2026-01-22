# Network Requirements

Developing a system with three distinct parts (Backend, Web Frontend, Native App) requires a proper network configuration, especially when physical devices are involved.

## 1. Local Development (Same WiFi)

If you are running the Bagisto backend and Next.js frontend on your laptop, and testing on a physical mobile phone:

*   **Connect to the same WiFi**: Your laptop and phone must be on the same network.
*   **Use IP Address**: Do **not** use `localhost` or `127.0.0.1`. The phone will try to connect to itself.
    *   Find your laptop's local IP (e.g., `192.168.1.5`).
    *   Configure the native app and web frontend to talk to `192.168.1.5:8000` (Backend) and `192.168.1.5:3000` (Frontend).

## 2. Firewall / Ports

Ensure your OS firewall is not blocking incoming connections on the development ports:
*   **Port 3000**: Next.js
*   **Port 8000**: Laravel/Bagisto default
*   **Port 80/443**: If using Docker/Virtual host

## 3. HTTPS (Recommended)

Some native APIs (like Location or Camera access) **require** the web page to be served over HTTPS.
*   Use tools like **ngrok** or **mkcert** to provide a secure tunnel or local SSL certificate for your development environment.

::: warning Ngrok
If using ngrok, the free tier often displays a "Visit Site" warning page which breaks the Native App's automatic navigation flow. Ensure you bypass this warning or use a paid plan/alternative.
:::

## Next Steps

- Explore [Getting Started](../getting-started/setup-flow-overview.md)
- Understand [Create Bagisto Headless Commerce](../getting-started/create-headless-commerce.md)
- Check [Limitations](../getting-started/limitations.md)
