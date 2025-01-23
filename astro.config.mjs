import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import dom from "@wmdigi/dom/astro";

//import partytown from "@astrojs/partytown";

const site = process.env.PUBLIC_SITE;

export default defineConfig({
	site,
	base: "/",
	integrations: [
		dom(),
		tailwind(),
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
		svg: true
	}
});