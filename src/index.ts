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

	export type InputStyle = "basic" | "main" | "invisible" | "danger";

	export type ColorModifier = "Default" | "Selected" | "Hovered" | "Pressed" | "Disabled";
}
