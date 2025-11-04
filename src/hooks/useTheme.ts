import { useState, useEffect } from "@rbxts/react";
import { darkTheme } from "../themes";
import useStudioTheme from "./useStudioTheme";

function parseTheme(studioTheme: StudioTheme, theme: { [key: string]: unknown }): PureTheme {
	const newObject: { [key: string]: unknown } = {};

	for (const [key, value] of pairs(theme)) {
		if (typeIs(value, "table")) {
			if (typeIs((value as unknown[])[0], "EnumItem") || typeIs((value as unknown[])[1], "EnumItem")) {
				newObject[key as string] = studioTheme.GetColor(
					(value as Array<Enum.StudioStyleGuideColor>)[0],
					(value as Array<Enum.StudioStyleGuideModifier>)[1],
				);
			} else {
				newObject[key as string] = parseTheme(studioTheme, value as { [key: string]: unknown });
			}
		} else if (typeIs(value, "Color3")) {
			newObject[key as string] = value;
		}
	}

	return newObject as PureTheme;
}

export default function useTheme() {
	const studioTheme = useStudioTheme();

	const [theme, setTheme] = useState(parseTheme(studioTheme, darkTheme as unknown as { [key: string]: unknown }));

	useEffect(() => {
		if (studioTheme.Name === "Dark") {
			setTheme(parseTheme(studioTheme, darkTheme as unknown as { [key: string]: unknown }));
		} else if (studioTheme.Name === "Light") {
			setTheme(parseTheme(studioTheme, darkTheme as unknown as { [key: string]: unknown }));
		}
	}, [useStudioTheme]);

	return theme as PureTheme;
}
