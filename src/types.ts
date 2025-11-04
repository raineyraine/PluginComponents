import React from "@rbxts/react";

export interface CommonElementProps {
	children?: React.ReactNode;

	Size?: UDim2;
	Position?: UDim2;
	AnchorPoint?: Vector2;
	ZIndex?: number;
	LayoutOrder?: number;
}

export type InputStyle = "basic" | "main" | "invisible" | "danger";
