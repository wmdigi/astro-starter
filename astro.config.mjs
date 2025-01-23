import { defineConfig } from "astro/config";
import dom from "@wmdigi/dom/astro";
import swup from '@swup/astro';

//import partytown from "@astrojs/partytown";

const site = process.env.PUBLIC_SITE;

export default defineConfig({
	site,
	base: "/",
	integrations: [
		swup({
			theme: `slide`,
			progress: true,
			globalInstance: true,
			loadOnIdle: false
		}),
		dom(),
		sitemap(),
		// partytown(
		// 	{
		// 		config: { debug: false },
		// 	}
		// ),
	],
	output: "static",
	adapter: vercel(),
	experimental: {
		// import SVG files as components
		svg: true,
	},
});
