// import { defineCollection, z } from "astro:content";

// const articles = defineCollection({
// 	loader: async () => {
// 		const response = await fetch("https://wiktor.wondermakers.dev/items/articles");
// 		const { data } = await response.json();
// 		// Must return an array of entries with an id property, or an object with IDs as keys and entries as values
// 		console.log(data)
// 		return data
// 	},
// 	schema: z.object({
// 		title: z.string(),
// 		author: z.string(),
// 		content: z.string(),
// 		date_created: z.string(),
// 		cover: z.string()
// 	})
// })

// export const collections = { articles };