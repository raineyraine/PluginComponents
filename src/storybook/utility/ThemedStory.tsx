import React, { ReactNode } from "@rbxts/react";
import Background from "../../components/Background";
import ThemeContext from "../../contexts/ThemeContext";

export interface ThemedStoryProps {
	children?: ReactNode;
	size?: UDim2;
}

interface CustomStudio extends Studio {
	Theme: StudioTheme;
}
const studio = settings().Studio as CustomStudio;
const themes = studio.GetAvailableThemes() as Array<StudioTheme>;

export default function ThemedStory({ children, size }: ThemedStoryProps) {
	const elements = themes.map((theme) => (
		<frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)}>
			<textlabel
				Size={new UDim2(1, 0, 0, 24)}
				BackgroundTransparency={1}
				TextColor3={new Color3(1, 1, 1)}
				Text={theme.Name}
				TextSize={18}
				TextXAlignment={"Left"}
				Font={"SourceSans"}
			/>
			<scrollingframe
				Size={new UDim2(1, 0, 1, -24)}
				Position={UDim2.fromOffset(0, 24)}
				CanvasSize={UDim2.fromScale(0, 0)}
				AutomaticCanvasSize={Enum.AutomaticSize.XY}
				BackgroundTransparency={1}
			>
				<ThemeContext.Provider value={theme}>
					<uilistlayout HorizontalAlignment={"Center"} VerticalAlignment={"Center"} />
					<Background>
						<uilistlayout
							HorizontalAlignment={"Center"}
							VerticalAlignment={"Center"}
							Padding={new UDim(0, 10)}
						/>
						{children}
					</Background>
				</ThemeContext.Provider>
			</scrollingframe>
		</frame>
	));
	return (
		<frame Size={size || UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			<uilistlayout
				FillDirection={"Horizontal"}
				HorizontalFlex={"Fill"}
				VerticalFlex={"Fill"}
				Padding={new UDim(0, 25)}
			/>
			{elements}
		</frame>
	);
}
