import type { User } from '@src/types/user';

export interface Product {
	id: string | number,
	title: string,
	description?: string,
	price: number | string,
	cover: ImageMetadata,
	slug: string,
}

export interface Cart {
	profile?: User;
	products: Product[];
}