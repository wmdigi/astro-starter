import type { User } from '@src/types/user';

export interface Product {
	id: string | number,
	title: string,
	description?: string,
	price: number,
	count?: number,
	cover: ImageMetadata,
	slug: string,
}

export interface Checkout {
	first_name: string,
	last_name: string,
	email: string,
	address: string,
	city: string,
	zip: string,
	terms: string,
}

export interface Cart {
	total: number;
	products: Product[];
	summary?: Checkout;
}