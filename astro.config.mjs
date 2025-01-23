import { defineConfig } from "astro/config";
import dom from "@wmdigi/dom/astro";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

//import partytown from "@astrojs/partytown";

const site = process.env.PUBLIC_SITE;

export default defineConfig({
	site,
	base: "/",
	integrations: [
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
