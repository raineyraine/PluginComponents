import React, { useState } from "@rbxts/react";
import { CreateReactStory } from "@rbxts/ui-labs";
import ReactRoblox from "@rbxts/react-roblox";
import ThemedStory from "../../utility/ThemedStory";
import TabContainer, { Tab } from "ui/components/TabContainer";
import Button from "ui/components/Button";

const story = CreateReactStory(
	{
		summary: "Tabs!",

		react: React,
		reactRoblox: ReactRoblox,
		controls: {
			STORY_SCALE_X: 1,
			STORY_SCALE_Y: 1,
		},
	},
	(props) => {
		const [selectedTab, setSelectedTab] = useState("first-tab");

		return (
			<ThemedStory size={UDim2.fromScale(props.controls.STORY_SCALE_X, props.controls.STORY_SCALE_Y)}>
				<TabContainer
					Size={UDim2.fromScale(0.5, 0.5)}
					selectedTab={selectedTab}
					handleSelectedTab={setSelectedTab}
				>
					<Tab key="first-tab" displayName="First">
						<uilistlayout
							FillDirection="Vertical"
							HorizontalAlignment="Center"
							VerticalAlignment="Center"
							Padding={new UDim(0, 8)}
						/>
						<Button Size={UDim2.fromOffset(120)} text="First Tab" />
						<Button Size={UDim2.fromOffset(120)} text="Main Button" main={true} />
					</Tab>
					<Tab key="second-tab" displayName="Second">
						<uilistlayout
							FillDirection="Vertical"
							HorizontalAlignment="Center"
							VerticalAlignment="Center"
							Padding={new UDim(0, 8)}
						/>
						<Button Size={UDim2.fromOffset(120)} text="Second Tab" />
						<Button Size={UDim2.fromOffset(120)} text="Main Button" main={true} />
					</Tab>
					<Tab key="third-tab" displayName="Disabled" disabled={true} />
				</TabContainer>
			</ThemedStory>
		);
	},
);

export = story;
