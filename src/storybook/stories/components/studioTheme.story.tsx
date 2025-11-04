import React from "@rbxts/react";
import { CreateReactStory } from "@rbxts/ui-labs";
import ReactRoblox from "@rbxts/react-roblox";
import useStudioTheme from "../../../hooks/useStudioTheme";

const styleGuideColors = Enum.StudioStyleGuideColor.GetEnumItems();
const styleGuideModifiers = Enum.StudioStyleGuideModifier.GetEnumItems();

const story = CreateReactStory(
	{
		summary: "Previews the current studio theme",

		react: React,
		reactRoblox: ReactRoblox,
		controls: {},
	},
	() => {
		const theme = useStudioTheme();

		const items = styleGuideColors.map((color, index) => {
			const moddedItems = styleGuideModifiers.map((mod) => {
				const themeColor = theme.GetColor(color, mod);
				const [h, s, v] = themeColor.ToHSV();
				const inverted = Color3.fromHSV((h + 0.5) % 1, s, 1 - v);

				return (
					<textlabel
						BorderSizePixel={0}
						BackgroundColor3={themeColor}
						Text={color.Name + "." + mod.Name}
						TextColor3={inverted}
						TextScaled={true}
					>
						<uicorner CornerRadius={new UDim(0, 8)} />
					</textlabel>
				);
			});
			return (
				<frame Size={new UDim2(1, 0, 0, 50)} BackgroundTransparency={1} LayoutOrder={index}>
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						HorizontalFlex={Enum.UIFlexAlignment.Fill}
						VerticalFlex={Enum.UIFlexAlignment.Fill}
						Padding={new UDim(0, 8)}
					/>
					{moddedItems}
				</frame>
			);
		});

		return (
			<frame
				Size={new UDim2(0, 1500, 0, 0)}
				AutomaticSize={Enum.AutomaticSize.Y}
				BackgroundColor3={new Color3(1, 1, 1)}
				BorderSizePixel={0}
			>
				<uipadding
					PaddingTop={new UDim(0, 8)}
					PaddingLeft={new UDim(0, 8)}
					PaddingRight={new UDim(0, 8)}
					PaddingBottom={new UDim(0, 8)}
				/>
				<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 16)} />
				{items}
			</frame>
		);
	},
);
export = story;
