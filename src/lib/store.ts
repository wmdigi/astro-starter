import type { Cart } from "@src/types/cart";
import { atom } from "nanostores";

export const mode = atom<string>("light");

export const cart = atom<Cart>({
	total: 0,
	products: [],
});
