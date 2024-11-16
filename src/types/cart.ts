import type { User } from '@src/types/user';

export interface Product {
	id: string | number,
	title: string,
	description?: string,
	price: number | string,
	count?: number,
	cover: ImageMetadata,
	slug: string,
}

export interface Cart {
	profile?: User;
	total: number;
	products: Product[];
}