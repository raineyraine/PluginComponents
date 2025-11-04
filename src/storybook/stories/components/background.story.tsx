import React from "@rbxts/react";
import { CreateReactStory } from "@rbxts/ui-labs";
import ReactRoblox from "@rbxts/react-roblox";
import ThemedStory from "../../utility/ThemedStory";
import Background from "../../../components/Background";

const story = CreateReactStory(
	{
		summary: "Buttons!",

		react: React,
		reactRoblox: ReactRoblox,
		controls: {
			STORY_SCALE_X: 1,
			STORY_SCALE_Y: 1,
		},
	},
	(props) => (
		<ThemedStory size={UDim2.fromScale(props.controls.STORY_SCALE_X, props.controls.STORY_SCALE_Y)}>
			<Background />
		</ThemedStory>
	),
);

export = story;
