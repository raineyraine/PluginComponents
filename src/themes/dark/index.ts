const dark: Theme = {
	Background: [Enum.StudioStyleGuideColor.MainBackground],

	Brand: {},

	Button: {
		MainButton: {
			bg: {
				Default: [Enum.StudioStyleGuideColor.DialogMainButton, Enum.StudioStyleGuideModifier.Default],
				Selected: [Enum.StudioStyleGuideColor.DialogMainButton, Enum.StudioStyleGuideModifier.Selected],
				Hovered: [Enum.StudioStyleGuideColor.DialogMainButton, Enum.StudioStyleGuideModifier.Hover],
				Pressed: [Enum.StudioStyleGuideColor.DialogMainButton, Enum.StudioStyleGuideModifier.Pressed],
				Disabled: [Enum.StudioStyleGuideColor.DialogMainButton, Enum.StudioStyleGuideModifier.Disabled],
			},
			content: {
				Default: [Enum.StudioStyleGuideColor.DialogMainButtonText, Enum.StudioStyleGuideModifier.Default],
				Selected: [Enum.StudioStyleGuideColor.DialogMainButtonText, Enum.StudioStyleGuideModifier.Selected],
				Hovered: [Enum.StudioStyleGuideColor.DialogMainButtonText, Enum.StudioStyleGuideModifier.Hover],
				Pressed: [Enum.StudioStyleGuideColor.DialogMainButtonText, Enum.StudioStyleGuideModifier.Pressed],
				Disabled: [Enum.StudioStyleGuideColor.DialogMainButtonText, Enum.StudioStyleGuideModifier.Disabled],
			},
		},
		SecondaryButton: {
			bg: {
				Default: [Enum.StudioStyleGuideColor.Button, Enum.StudioStyleGuideModifier.Default],
				Selected: [Enum.StudioStyleGuideColor.Button, Enum.StudioStyleGuideModifier.Selected],
				Hovered: [Enum.StudioStyleGuideColor.Button, Enum.StudioStyleGuideModifier.Hover],
				Pressed: [Enum.StudioStyleGuideColor.Button, Enum.StudioStyleGuideModifier.Pressed],
				Disabled: [Enum.StudioStyleGuideColor.DialogButton, Enum.StudioStyleGuideModifier.Disabled],
			},
			content: {
				Default: [Enum.StudioStyleGuideColor.ButtonText, Enum.StudioStyleGuideModifier.Default],
				Selected: [Enum.StudioStyleGuideColor.ButtonText, Enum.StudioStyleGuideModifier.Selected],
				Hovered: [Enum.StudioStyleGuideColor.ButtonText, Enum.StudioStyleGuideModifier.Hover],
				Pressed: [Enum.StudioStyleGuideColor.ButtonText, Enum.StudioStyleGuideModifier.Pressed],
				Disabled: [Enum.StudioStyleGuideColor.ButtonText, Enum.StudioStyleGuideModifier.Disabled],
			},
		},
		Border: {
			Default: [Enum.StudioStyleGuideColor.DialogButtonBorder, Enum.StudioStyleGuideModifier.Default],
			Selected: [Enum.StudioStyleGuideColor.DialogButtonBorder, Enum.StudioStyleGuideModifier.Selected],
			Hovered: [Enum.StudioStyleGuideColor.DialogButtonBorder, Enum.StudioStyleGuideModifier.Hover],
			Pressed: [Enum.StudioStyleGuideColor.DialogButtonBorder, Enum.StudioStyleGuideModifier.Pressed],
			Disabled: [Enum.StudioStyleGuideColor.DialogButtonBorder, Enum.StudioStyleGuideModifier.Disabled],
		},
	},
};

export default dark;
