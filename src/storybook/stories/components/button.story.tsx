import React from "@rbxts/react";
import { CreateReactStory } from "@rbxts/ui-labs";
import ReactRoblox from "@rbxts/react-roblox";
import Button from "../../../components/Button";
import ThemedStory from "../../utility/ThemedStory";

const story = CreateReactStory(
	{
		summary: "Buttons!",

		react: React,
		reactRoblox: ReactRoblox,
		controls: {
			isMainButton: true,
			textContents: "Hello, World!",
			disabled: false,
			STORY_SCALE_X: 1,
			STORY_SCALE_Y: 1,
		},
	},
	(props) => (
		<ThemedStory size={UDim2.fromScale(props.controls.STORY_SCALE_X, props.controls.STORY_SCALE_Y)}>
			<Button
				automaticSize={Enum.AutomaticSize.X}
				main={props.controls.isMainButton}
				text={props.controls.textContents}
				disabled={props.controls.disabled}
			/>
			<Button
				automaticSize={Enum.AutomaticSize.X}
				main={props.controls.isMainButton}
				text={props.controls.textContents}
				leadingVisual={{ image: "rbxassetid://7734021469" }}
				disabled={props.controls.disabled}
			/>
			<Button
				automaticSize={Enum.AutomaticSize.X}
				main={props.controls.isMainButton}
				text={props.controls.textContents}
				leadingVisual={{ image: "rbxassetid://7734021469" }}
				trailingVisual={{ image: "rbxassetid://7734021469" }}
				disabled={props.controls.disabled}
			/>
		</ThemedStory>
	),
);

export = story;
