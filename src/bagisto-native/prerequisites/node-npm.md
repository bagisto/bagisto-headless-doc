# Node.js & npm

Bagisto Native relies heavily on the JavaScript ecosystem. Proper version management is crucial for avoiding dependencies conflicts.

## Recommended Versions

| Tool | Version | Notes |
| :--- | :--- | :--- |
| **Node.js** | `>= 18.x` | `v20.x` (LTS) is highly recommended. |
| **npm** | `>= 9.x` | Usually comes bundled with Node.js. |

## Checking Your Version

Run the following commands in your terminal to check your installed versions:

```bash
node -v
npm -v
```

## Version Management

We strongly recommend using a version manager like **nvm** (Node Version Manager) or **fnm** (Fast Node Manager) to switch between Node versions easily.

### Installing nvm (macOS/Linux)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

### Using nvm
```bash
nvm install 20
nvm use 20
```

::: warning Legacy Versions
Do not use Node.js versions older than 18. The Next.js framework and server components used in Bagisto Native require modern Node capabilities.
:::

## Next Steps

- Understand [Bagisto Backend Setup](./bagisto-backend-setup.md)
- Explore [iOS Requirements](./ios-requirements.md)
- Check [Network Requirements](./network-requirements.md)
