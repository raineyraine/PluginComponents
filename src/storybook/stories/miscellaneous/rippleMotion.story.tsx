import React, { useEffect, useState } from "@rbxts/react";
import { CreateReactStory } from "@rbxts/ui-labs";
import ReactRoblox from "@rbxts/react-roblox";
import Background from "../../../components/Background";
import { BUTTON_DEFAULT_HEIGHT, DEFAULT_FONT_NORMAL, DEFAULT_TEXT_SIZE } from "../../../constants";
import Button from "../../../components/Button";
import useStudioTheme from "../../../hooks/useStudioTheme";
import { config, LinearOptions, SpringOptions, TweenOptions } from "@rbxts/ripple";
import { useEventListener, useMotion } from "@rbxts/pretty-react-hooks";
import { RunService } from "@rbxts/services";

interface RipplePreviewProps {
	goal: number;
	motionMethod: MotionMethod;
	order: number;
	name: string;
}

interface SpringMotion {
	method: "spring";
	options?: SpringOptions;
}
interface TweenMotion {
	method: "tween";
	options?: TweenOptions;
}
interface LinearMotion {
	method: "linear";
	options?: LinearOptions;
}
interface ImmediateMotion {
	method: "immediate";
}

type MotionMethod = SpringMotion | TweenMotion | LinearMotion | ImmediateMotion;
type SpringDefaults = "default" | "gentle" | "wobbly" | "stiff" | "slow" | "molasses";

const RipplePreview = ({ goal, order, motionMethod, name }: RipplePreviewProps) => {
	const studioTheme = useStudioTheme();
	const [xMotionBinding, xMotion] = useMotion(UDim2.fromScale(goal, -0.01));
	const [textColorMotionBinding, textColorMotion] = useMotion(new Color3(1, 1, 1));

	useEffect(() => {
		textColorMotion.immediate(new Color3(1, 1, 1));

		if (motionMethod.method === "immediate") {
			xMotion.immediate(UDim2.fromScale(goal, 0));
		} else {
			xMotion[motionMethod.method](UDim2.fromScale(goal, 0), motionMethod.options);
		}

		const completed = xMotion.onComplete(() => {
			textColorMotion.spring(new Color3(0, 1, 0), config.spring.stiff);
		});

		return () => {
			completed();
		};
	}, [goal]);

	return (
		<frame
			key={name}
			LayoutOrder={order}
			BorderSizePixel={0}
			BackgroundColor3={studioTheme.GetColor(Enum.StudioStyleGuideColor.Titlebar)}
			Size={new UDim2(1, 0, 0, 32)}
			AutomaticSize="Y"
		>
			<uipadding
				PaddingTop={new UDim(0, 10)}
				PaddingBottom={new UDim(0, 10)}
				PaddingLeft={new UDim(0, 10)}
				PaddingRight={new UDim(0, 10)}
			/>
			<uicorner CornerRadius={new UDim(0, 8)} />
			<uilistlayout Padding={new UDim(0, 10)} FillDirection="Vertical" SortOrder="LayoutOrder" />
			<textlabel
				LayoutOrder={0}
				Text={name}
				TextSize={DEFAULT_TEXT_SIZE}
				Font={DEFAULT_FONT_NORMAL}
				BackgroundTransparency={1}
				Size={UDim2.fromScale(0, 0)}
				AutomaticSize="XY"
				TextColor3={textColorMotionBinding}
			/>
			<frame key="x-preview-container" Size={new UDim2(1, 0, 0, 16)} BackgroundTransparency={1}>
				<frame
					key="x-line"
					BorderSizePixel={0}
					BackgroundColor3={studioTheme.GetColor(Enum.StudioStyleGuideColor.Shadow)}
					Position={UDim2.fromScale(0, 0.5)}
					Size={new UDim2(1, 0, 0, 2)}
					AnchorPoint={new Vector2(0, 0.5)}
					ZIndex={0}
				>
					<uicorner CornerRadius={new UDim(1, 0)} />
				</frame>
				<frame
					key="x-animation"
					BorderSizePixel={0}
					BackgroundColor3={new Color3(1, 1, 1)}
					Position={xMotionBinding}
					Size={new UDim2(0, 4, 1, 0)}
				>
					<uicorner CornerRadius={new UDim(1, 0)} />
				</frame>
			</frame>
		</frame>
	);
};

const GenerateSpringOptions = (name: SpringDefaults): MotionMethod => ({
	method: "spring",
	options: config.spring[name],
});
const App = () => {
	const [goalPhase, setGoalPhase] = useState(0);
	const [time, setTime] = useState(0);

	const animations = (
		<>
			<RipplePreview goal={goalPhase} order={0} motionMethod={GenerateSpringOptions("default")} name="default" />
			<RipplePreview goal={goalPhase} order={1} motionMethod={GenerateSpringOptions("gentle")} name="gentle" />
			<RipplePreview
				goal={goalPhase}
				order={2}
				motionMethod={GenerateSpringOptions("molasses")}
				name="molasses"
			/>
			<RipplePreview goal={goalPhase} order={3} motionMethod={GenerateSpringOptions("slow")} name="slow" />
			<RipplePreview goal={goalPhase} order={4} motionMethod={GenerateSpringOptions("stiff")} name="stiff" />
			<RipplePreview goal={goalPhase} order={5} motionMethod={GenerateSpringOptions("wobbly")} name="wobbly" />
			<RipplePreview goal={goalPhase} order={2} motionMethod={{ method: "linear" }} name="linear default" />
			<RipplePreview goal={goalPhase} order={2} motionMethod={{ method: "immediate" }} name="immediate default" />
			<RipplePreview goal={goalPhase} order={2} motionMethod={{ method: "tween" }} name="tween default" />
		</>
	);

	useEffect(() => {
		setTime(0);
	}, [goalPhase]);

	useEventListener(RunService.PreRender, (deltaTimeRender: number) => {
		setTime(time + deltaTimeRender);
	});

	return (
		<Background Size={UDim2.fromScale(0.5, 1)}>
			<uipadding
				PaddingTop={new UDim(0, 20)}
				PaddingBottom={new UDim(0, 20)}
				PaddingLeft={new UDim(0, 20)}
				PaddingRight={new UDim(0, 20)}
			/>
			<frame
				key="main"
				Size={new UDim2(1, 0, 1, -BUTTON_DEFAULT_HEIGHT)}
				Position={UDim2.fromOffset(0, BUTTON_DEFAULT_HEIGHT + 10)}
				BackgroundTransparency={1}
			>
				{animations}
				<uilistlayout SortOrder="LayoutOrder" FillDirection="Vertical" Padding={new UDim(0, 10)} />
			</frame>
			<frame key="topbar" Size={new UDim2(1, 0, 0, BUTTON_DEFAULT_HEIGHT)} BackgroundTransparency={1}>
				<uilistlayout SortOrder="LayoutOrder" FillDirection="Horizontal" Padding={new UDim(0, 10)} />

				<Button
					key="swapper"
					text="Swap Direction"
					automaticSize={Enum.AutomaticSize.X}
					main={true}
					handleClick={() => {
						setGoalPhase(1 - goalPhase);
					}}
				/>
				<textlabel
					key="timer"
					LayoutOrder={1}
					Text={"time since reset: " + tostring(math.round(time * 1000) / 1000)}
					TextTransparency={0.5}
					TextSize={DEFAULT_TEXT_SIZE}
					Font={DEFAULT_FONT_NORMAL}
					BackgroundTransparency={1}
					Size={UDim2.fromScale(0, 1)}
					AutomaticSize="XY"
					TextColor3={new Color3(1, 1, 1)}
				/>
			</frame>
		</Background>
	);
};

const story = CreateReactStory(
	{
		summary: "Demonstrates Ripple motion objects",

		react: React,
		reactRoblox: ReactRoblox,
		controls: {},
	},
	() => <App />,
);

export = story;
