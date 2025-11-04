import React, { ReactNode } from "@rbxts/react";

export interface IconProps {
	size?: Vector2;
	image: string;
	rectSize?: Vector2;
	rectoffset?: Vector2;
	transparency?: number;
	color?: Color3;
	ResampleMode?: Enum.ResamplerMode;
	ZIndex?: number;
	LayoutOrder?: number;
	children?: ReactNode;
}

export default function Icon({
	children,
	size,
	rectSize,
	rectoffset,
	transparency,
	color,
	ResampleMode,
	LayoutOrder,
	ZIndex,
	image,
}: IconProps) {
	return (
		<imagelabel
			Size={size ? UDim2.fromOffset(size.X, size.Y) : UDim2.fromOffset(16, 16)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			LayoutOrder={LayoutOrder}
			ImageRectSize={rectSize}
			ImageRectOffset={rectoffset}
			ImageTransparency={transparency}
			ImageColor3={color}
			ResampleMode={ResampleMode}
			ZIndex={ZIndex}
			Image={image}
		>
			{children}
		</imagelabel>
	);
}
