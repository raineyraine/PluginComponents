# Start Project
You can create a simple project with the following code:

```tsx:line-numbers {10-11}
import { PluginProvider } from "@rbxts/PluginComponents"
import React, { StrictMode } from "@rbxts/React"
import { createPortal, createRoot } from "@rbxts/react-roblox";

import App from "path.to.App";

const root = createRoot(path.to.pluginFolder)

root.render(
    <StrictMode>
        <PluginProvider>
            <App />
        </PluginProvider>
    </StrictMode>
)
```
::: info
Note the `<StrictMode>`s and `<PluginProvider>`s in the React tree.

`PluginProvider` is *required* at the root of your tree, as it provides a value for the interal PluginContext that is used by components that require access to the [`plugin`](https://create.roblox.com/docs/reference/engine/globals/RobloxGlobals#plugin) Roblox global.

[`StrictMode`](https://react.dev/reference/react/StrictMode) is a tool used in React development.
:::
