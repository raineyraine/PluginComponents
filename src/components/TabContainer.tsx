import React, { ReactNode, useState, useMemo, Children } from "@rbxts/react";
import { DEFAULT_FONT_NORMAL, TAB_BUTTON_DEFAULT_HEIGHT } from "ui/constants";
import useStudioTheme from "ui/hooks/useStudioTheme";
import { CommonElementProps } from "ui/types";

/* eslint-disable roblox-ts/lua-truthiness */

const fixKey = (key: string) => {
	let cleanKey = key;

	if (cleanKey.match("^%.%$")[0]) {
		cleanKey = cleanKey.sub(3);
	}

	return cleanKey;
};

export interface TabProps {
	LayoutOrder?: number;
	displayName?: string;
	disabled?: boolean;
	children?: ReactNode;
	key: string;
}

export interface TabButtonProps extends CommonElementProps {
	text?: string;
	leadingIcon?: string;
	trailingIcon?: string;
	disabled?: boolean;
	selected?: boolean;
	handleClick?: () => void;
}

export interface TabContainerProps extends CommonElementProps {
	selectedTab: string;
	handleSelectedTab: (name: string) => void;
}

export function TabButton({
	children,
	Size,
	Position,
	AnchorPoint,
	ZIndex,
	LayoutOrder,
	disabled,
	selected,
	leadingIcon,
	trailingIcon,
	text,
	handleClick,
}: TabButtonProps) {
	const studioTheme = useStudioTheme();

	let modifer: Enum.StudioStyleGuideModifier;
	let color: Enum.StudioStyleGuideColor;

	const [hovered, setHovered] = useState(false);
	const [pressed, setPressed] = useState(false);

	if (disabled === true) {
		color = Enum.StudioStyleGuideColor.RibbonButton;
		modifer = Enum.StudioStyleGuideModifier.Disabled;
	} else if (selected === true) {
		color = Enum.StudioStyleGuideColor.MainButton;
		modifer = Enum.StudioStyleGuideModifier.Selected;
	} else if (hovered === true && pressed === true) {
		color = Enum.StudioStyleGuideColor.MainButton;
		modifer = Enum.StudioStyleGuideModifier.Pressed;
	} else if (hovered === true) {
		color = Enum.StudioStyleGuideColor.MainButton;
		modifer = Enum.StudioStyleGuideModifier.Hover;
	} else {
		color = Enum.StudioStyleGuideColor.Button;
		modifer = Enum.StudioStyleGuideModifier.Default;
	}

	//const borderColor = theme.GetColor(Enum.StudioStyleGuideColor.DialogButtonBorder, modifer);
	const bgColor = studioTheme.GetColor(color, modifer);
	const contentColor = studioTheme.GetColor(Enum.StudioStyleGuideColor.ButtonText, modifer);

	const contents = [];
	if (text !== undefined) {
		contents.push(
			<textlabel
				AutomaticSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
				Font={DEFAULT_FONT_NORMAL}
				Text={text}
				TextSize={18}
				TextColor3={contentColor}
			></textlabel>,
		);
	}

	return (
		<imagebutton
			ClipsDescendants={true}
			BackgroundColor3={studioTheme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
			BorderSizePixel={0}
			Size={Size}
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
			<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
				<uilistlayout
					Padding={new UDim(0, 8)}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
				/>
				{contents}
				{children}
			</frame>
			<frame
				BackgroundColor3={bgColor}
				Size={new UDim2(1, 0, 0, 4)}
				Position={new UDim2(0, 0, 1, 2)}
				AnchorPoint={new Vector2(0, 1)}
			>
				<uicorner CornerRadius={new UDim(0, 2)} />
			</frame>
		</imagebutton>
	);
}

export function Tab({ children }: TabProps) {
	return <>{children}</>;
}

export default function TabContainer({
	children,
	Size,
	Position,
	AnchorPoint,
	ZIndex,
	LayoutOrder,
	selectedTab,
	handleSelectedTab,
}: TabContainerProps) {
	const tabs = Children.toArray(children) as React.Element<TabProps>[];
	const tabData = useMemo(() => {
		return tabs.map((tab) => {
			const key = fixKey(tab.key as string);

			return {
				key: key,
				displayName: tab.props.displayName || key,
				LayoutOrder: tab.props.LayoutOrder,
				disabled: tab.props.disabled,
				content: tab.props.children,
				element: tab,
			};
		});
	}, [children]);

	const selectedTabContent = tabData.find((meta) => meta.key === selectedTab)?.content;

	return (
		<frame
			BackgroundTransparency={1}
			Size={Size}
			Position={Position}
			AnchorPoint={AnchorPoint}
			ZIndex={ZIndex}
			LayoutOrder={LayoutOrder}
		>
			<frame
				key="TabButton-group"
				BackgroundTransparency={1}
				Size={new UDim2(1, 0, 0, TAB_BUTTON_DEFAULT_HEIGHT)}
			>
				<uilistlayout
					HorizontalFlex="Fill"
					VerticalFlex="Fill"
					Padding={new UDim(0, 8)}
					FillDirection={"Horizontal"}
				/>
				{tabData.map((data) => {
					return (
						<TabButton
							LayoutOrder={data.LayoutOrder}
							text={data.displayName}
							disabled={data.disabled}
							selected={data.key === selectedTab}
							handleClick={() => {
								handleSelectedTab(data.key);
							}}
						/>
					);
				})}
			</frame>
			<frame
				key="TabContainer-contents"
				Size={new UDim2(1, 0, 1, -TAB_BUTTON_DEFAULT_HEIGHT)}
				BackgroundTransparency={1}
				Position={new UDim2(0, 0, 0, TAB_BUTTON_DEFAULT_HEIGHT)}
			>
				{selectedTabContent}
			</frame>
		</frame>
	);
}
