import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "PluginComponents",
	description: "A roblox-ts package for creating Roblox Studio plugins",
	lastUpdated: true,
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Get Started", link: "/docs/getstarted" },
		],
		editLink: {
			pattern: "https://github.com/raineyraine/PluginComponents/tree/main/docs/:path",
			text: "Edit page on GitHub",
		},
		search: {
			provider: "local",
		},
		footer: {
			message: "Released under MIT license with love from Raine",
			copyright: "Copyright © 2025-present raine",
		},
		sidebar: {
			"/docs/": [
				{
					text: "Get Started",
					items: [
						{ text: "Introduction", link: "docs/getstarted" },
						{ text: "Installation", link: "docs/installation" },
						{ text: "Contributing", link: "docs/contributing" },
					],
				},
				{
					text: "Creating Plugins",
					collapsed: false,
					items: [{ text: "Start Project", link: "docs/creating/starting" }],
				},
				{
					text: "VitePress Examples",
					collapsed: true,
					items: [
						{ text: "Markdown Examples", link: "ViteThings/markdown-examples" },
						{ text: "Runtime API Examples", link: "ViteThings/api-examples" },
					],
				},
			],
		},

		socialLinks: [{ icon: "github", link: "https://github.com/raineyraine/PluginComponents/" }],
	},
});
