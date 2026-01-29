# Network Considerations

A stable and correctly configured network is essential for the communication between the iOS app and the Bagisto storefront.

## 1. Local Networking (Physical Devices)
If you are testing on a real iPhone/iPad:
- Both the **Mac (Server)** and the **iOS Device** must be on the **same Wi-Fi network**.
- Firewalls on the Mac must allow incoming connections on the storefront's port (e.g., 3000).

## 2. HTTPS & SSL
While `http` works for local development, production environments require `https`.
- In local development, if you use `http`, you may need to add exceptions to `Info.plist` under `NSAppTransportSecurity` (though not recommended for production).

## 3. Latency & Timeouts
The native bridge expects responsive web content. Highly latent connections may trigger timeout loaders in the Hotwire Native shell.

## 4. VPN and Proxies
If using a VPN, ensure it doesn't block local network discovery or the specific IP address of your development server.
