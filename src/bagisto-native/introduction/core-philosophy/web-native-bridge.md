# Web → Native Bridge

Bagisto Native creates a **seamless bridge** between your web application and native mobile functionality.

## What is the Web → Native Bridge?

The bridge connects your existing web codebase with native device features, enabling you to build mobile apps without starting from scratch.

## How It Works

### Hotwire Technology

- **Hotwire Bridge** enables web ↔ native communication
- Web Components trigger native functionality
- Native events inform the web layer

### Two-Way Communication
```
Web Application ←→ Hotwire Bridge ←→ Native Mobile App
```

- Web triggers native features (camera, location)
- Native sends data back to web (search results, coordinates)
- Seamless synchronization between layers

## Key Benefits

### Reuse Your Web Code

- Leverage existing web application
- No need to rebuild from scratch
- Single codebase for multiple platforms

### Native Device Access

- Camera for barcode/image scanning
- GPS for location services
- Native notifications and UI

### Unified Development

- Maintain one source of truth
- Update once, deploy everywhere
- Consistent business logic

## Components of the Bridge

### Web Components
- Trigger native functionality from web
- Listen for native events
- Synchronize state

### Hotwire Bundle
- Core bridge implementation
- Handles communication protocol
- Manages event flow

### Native Integration
- Platform-specific implementations
- Device feature access
- Native UI components

## Example Flow

1. User clicks search on web interface
2. Web component sends event through bridge
3. Native search component opens
4. User enters query using device keyboard
5. Native sends result back through bridge
6. Web receives and processes search query

The Web → Native Bridge makes it possible to combine the best of web development efficiency with native mobile capabilities.
## Next Steps

- Understand the [High-level Architecture](../../concepts-architecture/high-level-architecture.md)
- Explore [Web ↔ Native Communication Flow](../../concepts-architecture/web-native-communication-flow.md)
- Learn about [Roles of Components](../../concepts-architecture/roles-of-components.md)
