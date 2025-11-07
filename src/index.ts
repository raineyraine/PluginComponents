import React from "@rbxts/react";

import PluginProviderImport from "./components/plugin/PluginProvider";
import PluginWidgetImport from "./components/plugin/PluginWidget";

import BackgroundImport from "./components/Background";
import ButtonImport from "./components/Button";
import IconImport from "./components/Icon";
import TabContainerImport, { Tab as TabImport } from "./components/TabContainer";

import usePluginImport from "./hooks/plugin/usePlugin";

import useStudioThemeImport from "./hooks/useStudioTheme";
import useThemeImport from "./hooks/useTheme";

import getTextSizeImport from "./util/getTextSize";

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

/* eslint-disable @typescript-eslint/no-namespace */
namespace PluginComponents {
	export const PluginProvider = PluginProviderImport;
	export const PluginWidget = PluginWidgetImport;

	export const Background = BackgroundImport;
	export const Button = ButtonImport;
	export const Icon = IconImport;
	export const TabContainer = TabContainerImport;
	export const Tab = TabImport;

	export const usePlugin = usePluginImport;
	export const useStudioTheme = useStudioThemeImport;
	export const useTheme = useThemeImport;

	export const getTextSize = getTextSizeImport;
}

export = PluginComponents;
