import placeholder from "@images/placeholder.jpg";

export const navLinks: Array<{ name: string; url: string }> = [
	{ name: "Home", url: "/" },
	{ name: "About", url: "/about" },
	{ name: "Gallery", url: "/gallery" },
	{ name: "Products", url: "/products" },
];

export const products: any[] = [
	{
		id: 1,
		title: "Product 1",
		cover: placeholder,
		slug: "product-1",
		categories: ["Web Development", "UX/UI Design"],
	},
	{
		id: 2,
		title: "Product 2",
		cover: placeholder,
		slug: "product-2",
		categories: ["Web Development", "Motion Design"],
	},
	{
		id: 3,
		title: "Product 3",
		cover: placeholder,
		slug: "product-3",
		categories: ["UX/UI Design", "Motion Design"],
	},
	{
		id: 4,
		title: "Product 4",
		cover: placeholder,
		slug: "product-4",
		categories: ["Mobile Development"],
	},
];
