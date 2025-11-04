import React, { ReactNode, useState } from "@rbxts/react";
import {
	BUTTON_DEFAULT_HEIGHT,
	DEFAULT_FONT_NORMAL,
	DEFAULT_ICON_SIZE,
	DEFAULT_TEXT_SIZE,
	SPRING_FAST,
} from "../constants";
// import useStudioTheme from "ui/hooks/useStudioTheme";
import useTheme from "../hooks/useTheme";
import Icon from "./Icon";
import getTextSize from "../util/getTextSize";
import { useSpring } from "@rbxts/pretty-react-hooks";

const PADDING_X = 12;
const PADDING_Y = 4;

export interface ButtonProps extends CommonElementProps {
	main?: boolean;
	leadingVisual?: ButtonIconProps;
	trailingVisual?: ButtonIconProps;
	text?: string;
	disabled?: boolean;
	selected?: boolean;
	contents?: ReactNode;
	automaticSize?: Enum.AutomaticSize;
	handleClick?: () => void;
}

export interface ButtonIconProps {
	image: string;
	rectSize?: Vector2;
	rectoffset?: Vector2;
	ResampleMode?: Enum.ResamplerMode;
	size?: Vector2;
}

export default function Button({
	children,
	Size,
	Position,
	AnchorPoint,
	ZIndex,
	LayoutOrder,
	main,
	disabled,
	selected,
	leadingVisual,
	trailingVisual,
	automaticSize,

	text,
	handleClick,
}: ButtonProps) {
	const theme = useTheme();

	let modifer: ColorModifier;

	const [hovered, setHovered] = useState(false);
	const [pressed, setPressed] = useState(false);

	if (disabled === true) {
		modifer = "Disabled";
	} else if (selected === true) {
		modifer = "Selected";
	} else if (hovered === true && pressed === true) {
		modifer = "Pressed";
	} else if (hovered === true) {
		modifer = "Hovered";
	} else {
		modifer = "Default";
	}

	/* eslint-disable roblox-ts/lua-truthiness */
	const borderColor = theme.Button.Border[modifer];
	const bgColor = main ? theme.Button.MainButton.bg[modifer] : theme.Button.SecondaryButton.bg[modifer];
	const contentColor = main
		? theme.Button.MainButton.content[modifer]
		: theme.Button.SecondaryButton.content[modifer];
	const textSize = text ? getTextSize(text) : Vector2.zero;
	const leadingIconSize = leadingVisual ? leadingVisual?.size || DEFAULT_ICON_SIZE : Vector2.zero;
	const trailingIconSize = trailingVisual ? trailingVisual?.size || DEFAULT_ICON_SIZE : Vector2.zero;

	let contentWidth = textSize.X + leadingIconSize.X + trailingIconSize.X;
	if (text || leadingVisual || trailingVisual) {
		contentWidth += PADDING_X;
	}

	let contentHeight = textSize.Y;
	if (leadingVisual || trailingVisual) {
		contentHeight = math.max(contentHeight, leadingIconSize.Y, trailingIconSize.Y);
	}
	/* eslint-enable roblox-ts/lua-truthiness */

	const contents = [];
	if (leadingVisual !== undefined) {
		contents.push(
			<Icon
				key="leading-icon"
				image={leadingVisual.image}
				color={contentColor}
				rectSize={leadingVisual.rectSize}
				rectoffset={leadingVisual.rectoffset}
				ResampleMode={leadingVisual.ResampleMode}
				size={leadingVisual.size}
				LayoutOrder={0}
			/>,
		);
	}

	if (text !== undefined) {
		contents.push(
			<textlabel
				key="label"
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				Font={DEFAULT_FONT_NORMAL}
				Text={text}
				TextSize={DEFAULT_TEXT_SIZE}
				TextColor3={contentColor}
				LayoutOrder={1}
			></textlabel>,
		);
	}
	if (trailingVisual !== undefined) {
		contents.push(
			<Icon
				key="trailing-icon"
				image={trailingVisual.image}
				color={contentColor}
				rectSize={trailingVisual.rectSize}
				rectoffset={trailingVisual.rectoffset}
				size={trailingVisual.size}
				ResampleMode={trailingVisual.ResampleMode}
				LayoutOrder={2}
			/>,
		);
	}

	let buttonSize = Size || new UDim2(1, 0, 0, BUTTON_DEFAULT_HEIGHT);

	if (automaticSize === Enum.AutomaticSize.X || automaticSize === Enum.AutomaticSize.XY) {
		buttonSize = new UDim2(0, contentWidth + PADDING_X * 2, buttonSize.Height.Scale, buttonSize.Height.Offset);
	}

	if (automaticSize === Enum.AutomaticSize.Y || automaticSize === Enum.AutomaticSize.XY) {
		buttonSize = new UDim2(
			buttonSize.Width.Scale,
			buttonSize.Width.Offset,
			0,
			math.max(BUTTON_DEFAULT_HEIGHT, contentHeight + PADDING_Y * 2),
		);
	}

	const bgColorSpring = useSpring(bgColor, SPRING_FAST);
	return (
		<imagebutton
			BackgroundColor3={bgColorSpring}
			BorderSizePixel={0}
			Size={buttonSize}
			AnchorPoint={AnchorPoint}
			Position={Position}
			ZIndex={ZIndex}
			LayoutOrder={LayoutOrder}
			AutoButtonColor={false}
			Event={{
				InputBegan: (_, input) => {
					if (input.UserInputType === Enum.UserInputType.MouseMovement) {
						setHovered(true);
					} else if (input.UserInputType === Enum.UserInputType.MouseButton1) {
						setPressed(true);
					}
				},
				InputEnded: (_, input) => {
					if (input.UserInputType === Enum.UserInputType.MouseMovement) {
						setHovered(false);
					} else if (input.UserInputType === Enum.UserInputType.MouseButton1) {
						setPressed(false);
					}
				},
				Activated: () => {
					if (!disabled && handleClick) {
						handleClick();
					}
				},
			}}
		>
			<uicorner CornerRadius={new UDim(0, 8)} />
			<uistroke Thickness={1} Color={borderColor} />
			<uisizeconstraint MinSize={new Vector2(0, BUTTON_DEFAULT_HEIGHT)} />
			<uilistlayout
				SortOrder={Enum.SortOrder.LayoutOrder}
				Padding={new UDim(0, 8)}
				FillDirection={"Horizontal"}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
			/>
			{contents}
			{children}
		</imagebutton>
	);
}
