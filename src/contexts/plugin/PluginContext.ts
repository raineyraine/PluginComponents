import { createContext } from "@rbxts/react";

const PluginContext = createContext(undefined as unknown as Plugin);
PluginContext.displayName = "PluginContext";

export default PluginContext;
