import { useState, useEffect, useContext } from "@rbxts/react";
import ThemeContext from "../contexts/ThemeContext";

interface CustomStudio extends Studio {
	Theme: StudioTheme;
}

const studio = settings().Studio as CustomStudio;

/* eslint-disable roblox-ts/lua-truthiness */
export default function useStudioTheme() {
	const theme = useContext(ThemeContext);
	const [studioTheme, setStudioTheme] = useState(studio.Theme);

	useEffect(() => {
		if (theme) {
			return;
		}

		const connection = studio.ThemeChanged.Connect(() => {
			setStudioTheme(studio.Theme);
		});

		return () => connection.Disconnect();
	}, [studioTheme]);

	return theme || studioTheme;
}
