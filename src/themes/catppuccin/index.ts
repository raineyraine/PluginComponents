import { Latte, Frappe, Macchiato, Mocha } from "@rbxts/catppuccin";
import { Lighten, Darken } from "@rbxts/colour-utils";

type CatppuccinTheme = typeof Mocha;

function buildTheme(theme: CatppuccinTheme) {
	const builtTheme: Theme = {
		Background: theme.Base,
		MainButton: {
			Default: theme.Mauve,
			Selected: theme.Mauve,
			Hovered: Lighten(theme.Mauve, 0.25),
			Pressed: Darken(theme.Mauve, 0.25),
			Disabled: Darken(theme.Mauve, 0.5),
		},
		MainButtonContent: {
			Default: theme.Crust,
			Selected: theme.Crust,
			Hovered: theme.Crust,
			Pressed: theme.Crust,
			Disabled: Lighten(theme.Crust, 0.5),
		},
		Button: {
			Default: theme.Surface0,
			Selected: theme.Surface0,
			Hovered: theme.Surface0,
			Pressed: theme.Surface0,
			Disabled: theme.Surface0,
		},
		ButtonContent: {
			Default: theme.Text,
			Selected: theme.Text,
			Hovered: theme.Text,
			Pressed: theme.Text,
			Disabled: theme.Text,
		},
		ButtonBorder: {
			Default: theme.Surface1,
			Selected: theme.Surface1,
			Hovered: theme.Surface1,
			Pressed: theme.Surface1,
			Disabled: theme.Surface1,
		},
	};

	return builtTheme as Theme;
}

export const LatteTheme = buildTheme(Latte);
export const FrappeTheme = buildTheme(Frappe);
export const MacchiatoTheme = buildTheme(Macchiato);
export const MochaTheme = buildTheme(Mocha);
