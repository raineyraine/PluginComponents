import React from "@rbxts/react";

declare global {
	interface StudioProper extends Studio {
		Theme: StudioTheme;
	}

	interface CommonElementProps {
		children?: React.ReactNode;

		Size?: UDim2;
		Position?: UDim2;
		AnchorPoint?: Vector2;
		ZIndex?: number;
		LayoutOrder?: number;
	}

	type DestroyableBind<a extends unknown[]> = (callback: (...args: a) => void) => () => void;

	export type InputStyle = "basic" | "main" | "invisible" | "danger";

	export type ColorModifier = "Default" | "Selected" | "Hovered" | "Pressed" | "Disabled";
}

// Hooks
export * as useStudioTheme from "./hooks/useStudioTheme";
export * as useTheme from "./hooks/useTheme";

// Contexts
//export * from "./contexts/plugin/MenuContext"
//export * from "./contexts/plugin/PluginContext"
//export * from "./contexts/plugin/ToolbarContext"
//export * from "./contexts/plugin/WidgetContext"
//export * from "./contexts/ThemeContext"

// Components
export * as PluginProvider from "./components/plugin/PluginProvider";
export * as PluginWidget from "./components/plugin/PluginWidget";

export * as Background from "./components/Background";
export * as Button from "./components/Button";
export * as Icon from "./components/Icon";
export * as TabContainer from "./components/TabContainer";
