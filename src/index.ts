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
export * from "./hooks/plugin/usePlugin";
export * from "./hooks/useStudioTheme";
export * from "./hooks/useTheme";

// Contexts
//export * from "./contexts/plugin/MenuContext"
//export * from "./contexts/plugin/PluginContext"
//export * from "./contexts/plugin/ToolbarContext"
//export * from "./contexts/plugin/WidgetContext"
//export * from "./contexts/ThemeContext"

// Components
export * from "./components/plugin/PluginProvider";
export * from "./components/plugin/PluginWidget";

export * from "./components/Background";
export * from "./components/Button";
export * from "./components/Icon";
export * from "./components/TabContainer";
