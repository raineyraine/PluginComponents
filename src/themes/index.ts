import dark from "./dark";

type LeafTypes = Color3 | ThemeColor | unknown[] | string | number | boolean | undefined | undefined;

type DeepConvertPrimitivesToColor3<T> = {
	// Iterate over all keys K in T
	[K in keyof T]: T[K] extends LeafTypes
		? Color3 // 1. If it's a leaf node (ThemeColor, Color3, array, or primitive), convert to Color3.
		: T[K] extends object
			? DeepConvertPrimitivesToColor3<T[K]> // 2. If it's a structural object, recurse.
			: Color3; // 3. Fallback for any other type (should cover most remaining cases).
};

declare global {
	type ThemeColor = Color3 | [Enum.StudioStyleGuideColor, Enum.StudioStyleGuideModifier?];
	interface ThemeStyleGuideColor {
		Default: ThemeColor;
		Selected: ThemeColor;
		Pressed: ThemeColor;
		Hovered: ThemeColor;
		Disabled: ThemeColor;
	}
	interface ButtonColorDef {
		bg: ThemeStyleGuideColor;
		content: ThemeStyleGuideColor;
	}

	interface Theme {
		Background: ThemeColor;

		Brand: object;

		Button: {
			MainButton: ButtonColorDef;
			SecondaryButton: ButtonColorDef;
			InvisibleButton?: ButtonColorDef;
			DangerButton?: ButtonColorDef;

			Border: ThemeStyleGuideColor;
		};
	}
	type PureTheme = DeepConvertPrimitivesToColor3<Theme>;
}

export const darkTheme = dark;
