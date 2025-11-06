import { createContext } from "@rbxts/react";

const ToolbarContext = createContext(undefined as unknown as PluginToolbar);
ToolbarContext.displayName = "PluginToolbarContext";

export default ToolbarContext;
