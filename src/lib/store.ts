import { atom } from "nanostores";

import type { Cart } from "@src/types/cart";

export const cart = atom<Cart>({
	profile: undefined,
	total: 0,
	products: []
});