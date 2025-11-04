import React from "@rbxts/react";
import useTheme from "ui/hooks/useTheme";
import { CommonElementProps } from "ui/types";

export default function Background({ children, Size, Position, AnchorPoint, ZIndex, LayoutOrder }: CommonElementProps) {
	const theme = useTheme();

	return (
		<frame
			BackgroundColor3={theme.Background}
			BorderSizePixel={0}
			Size={Size || new UDim2(1, 0, 1, 0)}
			AnchorPoint={AnchorPoint}
			Position={Position}
			ZIndex={ZIndex}
			LayoutOrder={LayoutOrder}
		>
			{children}
		</frame>
	);
}
