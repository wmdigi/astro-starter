import placeholder from "@images/placeholder.jpg";
import type { Product } from "@src/types/cart";

export const navLinks: Array<{ name: string; url: string }> = [
	{ name: "Home", url: "/" },
	{ name: "Articles", url: "/legal/cookies" },
	{ name: "Products", url: "/legal/terms-and-conditions" },
];

export const products: Product[] = [
	{
		id: 1,
		title: "Product 1",
		description: "This is a product you wanna buy, trust me",
		price: 19.99,
		cover: placeholder,
		slug: "product-1",
	},
	{
		id: 2,
		title: "Product 2",
		description: "This is a product you wanna buy, trust me",
		price: 9.99,
		cover: placeholder,
		slug: "product-2",
	},
	{
		id: 3,
		title: "Product 3",
		description: "This is a product you wanna buy, trust me",
		price: 29.99,
		cover: placeholder,
		slug: "product-3",
	},
	{
		id: 4,
		title: "Product 4",
		description: "This is a product you wanna buy, trust me",
		price: 14.99,
		cover: placeholder,
		slug: "product-4",
	}
]
