import React, { ReactNode } from "@rbxts/react";
import PluginContext from "../../contexts/plugin/PluginContext";

//#region component-interface
export interface PluginProviderProps {
	/**
	 * `children` is handled by React, do not use.
	 */
	children?: ReactNode;
	/**
	 * The Plugin global must be passed in here.
	 */
	plugin: Plugin;
}
//#endregion component-interface

/**
 * `PluginProvider` is a **required** wrapper for component that provides the internal `PluginContext` React Context to its children.
 *  It should be used near the root of your plugin's React tree.
 */
export default function PluginProvider({ children, plugin }: PluginProviderProps) {
	return <PluginContext.Provider value={plugin}>{children}</PluginContext.Provider>;
}
