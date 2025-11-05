import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from "vitepress-plugin-group-icons";

const prod = process.env.NODE_ENV === "production";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "PluginComponents",
	description: "A roblox-ts package for creating Roblox Studio plugins",
	lastUpdated: true,
	base: "/PluginComponents/",

	markdown: {
		config(md) {
			md.use(groupIconMdPlugin);
		},
	},

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Get Started", link: "/docs/getstarted" },
			{ text: "Reference", link: "/api/overview" },
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
						{ text: "Introduction", link: "/docs/getstarted" },
						{ text: "Installation", link: "/docs/installation" },
						{ text: "Contributing", link: "/docs/contributing" },
					],
				},
				{
					text: "Creating Plugins",
					collapsed: false,
					items: [{ text: "Start Project", link: "/docs/creating/starting" }],
				},
				{
					text: "VitePress Examples",
					collapsed: true,
					items: [
						{ text: "Markdown Examples", link: "/ViteThings/markdown-examples" },
						{ text: "Runtime API Examples", link: "/ViteThings/api-examples" },
					],
				},
			],
			"/api/": [
				{
					text: "API Referecnce",
					items: [{ text: "Overview", link: "/api/overview" }],
				},
				{
					text: "Plugin Components",
					collapsed: false,
					items: [{ text: "PluginProvider", link: "/api/plugin-components/PluginProvider" }],
				},
			],
		},

		socialLinks: [{ icon: "github", link: "https://github.com/raineyraine/PluginComponents/" }],
	},

	vite: {
		plugins: [groupIconVitePlugin()],
	},
});
