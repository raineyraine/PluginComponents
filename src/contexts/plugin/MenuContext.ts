import { createContext } from "@rbxts/react";

const MenuContext = createContext(undefined as unknown as PluginMenu);
MenuContext.displayName = "PluginMenuContext";

export default MenuContext;
