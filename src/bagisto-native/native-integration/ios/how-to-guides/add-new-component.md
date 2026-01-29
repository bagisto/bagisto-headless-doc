# How to Create a New Component

Learn how to extend the iOS bridge by creating your own custom native components.

> [!NOTE]
> This guide uses a **Flashlight Toggle** as a demonstration example. Please note that the Flashlight component is not built into the core library; it is used here to show the end-to-end process of adding a new feature.

## Overview

Creating a custom component involves three steps:
1. **Native Implementation**: Writing the Swift code that performs the device action.
2. **Registration**: Telling the bridge about your new component.
3. **Web Trigger**: Calling the component from your React/Next.js application.

## 1. Native Implementation (Swift)

Create a new file named `FlashlightComponent.swift` in your iOS project:

```swift
import WebKit
import AVFoundation
import HotwireNative

class FlashlightComponent: BridgeComponent {
    override var name: String { "flashlight" }

    override func onReceive(message: Message) {
        guard let data = message.data as? [String: Any],
              let active = data["active"] as? Bool else { return }
        
        toggleFlashlight(on: active)
    }

    private func toggleFlashlight(on: Bool) {
        guard let device = AVCaptureDevice.default(for: .video), device.hasTorch else { return }
        
        do {
            try device.lockForConfiguration()
            device.torchMode = on ? .on : .off
            device.unlockForConfiguration()
        } catch {
            print("Flashlight could not be used")
        }
    }
}
```

## 2. Registration

Register your component in `AppDelegate.swift`:

```swift
Hotwire.registerBridgeComponents([
    // ... other components
    FlashlightComponent.self
])
```

## 3. Web Implementation (React)

Create a hook or utility to trigger the native flashlight:

```javascript
import { useBridge } from '@bagisto-native/react';

const FlashlightButton = () => {
    const { send } = useBridge();

    const toggle = (isOn) => {
        // 'flashlight' matches the 'name' property in Swift
        send('flashlight', { active: isOn });
    };

    return (
        <div>
            <button onClick={() => toggle(true)}>Turn On</button>
            <button onClick={() => toggle(false)}>Turn Off</button>
        </div>
    );
};
```

## Troubleshooting

- **Name Mismatch**: Ensure the string passed to `send()` in JavaScript exactly matches the `name` property in your Swift class.
- **Data Types**: The `message.data` in Swift is a dictionary. Ensure your JavaScript object keys and values match the types you expect in Swift.
- **Hardware Permissions**: Some components (like camera or location) require entries in `Info.plist`.
