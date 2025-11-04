import { Storybook } from "@rbxts/ui-labs";

const storybook: Storybook = {
	name: "Component Stories",
	storyRoots: script.Parent?.FindFirstChild("stories")?.GetChildren() || [],
	groupRoots: true,
};

export = storybook;
