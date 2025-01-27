import SwupJsPlugin from "@swup/js-plugin";
import { gsap } from "@lib/gsap";
import { SwupParallelPlugin } from "@swup/astro/client";

export const initSwup = () => {
	swup.use(
		new SwupJsPlugin({
			animations: [
				{
					from: "(.*)",
					to: "(.*)",
					out: async () => {
						// await gsap.to(".animate-heading", {
						// 	opacity: 0,
						// 	xPercent: 10,
						// 	ease: "power2.out",
						// 	duration: 0.5,
						// });

						await gsap.to("#swup", {
							scale: 0.9,
							ease: "power2.out",
						});
					},
					in: async () => {
						await gsap.fromTo(
							"#swup",
							{
								yPercent: 100,
							},
							{
								yPercent: 0,
								duration: 1,
								ease: "power2.out",
							},
						);

						// await gsap.fromTo(
						// 	".animate-heading",
						// 	{ opacity: 0, xPercent: -10 },
						// 	{ opacity: 1, xPercent: 0, ease: "power2.out", duration: 0.5 },
						// );
					},
				},
				// {
				// 	from: "/about",
				// 	to: "/",
				// 	out: async () => {
				// 		await gsap.to(".animate-heading", {
				// 			opacity: 0,
				// 			yPercent: 10,
				// 			ease: "power2.out",
				// 			duration: 0.5,
				// 		});

				// 		await gsap.to("#swup", {
				// 			scale: 0.9,
				// 			ease: "power2.out",
				// 		});
				// 	},
				// 	in: async () => {
				// 		await gsap.fromTo(
				// 			".animate-heading",
				// 			{ opacity: 0, yPercent: -10 },
				// 			{ opacity: 1, yPercent: 0, ease: "power2.out", duration: 0.5 },
				// 		);

				// 		await gsap.fromTo(
				// 			"#swup",
				// 			{
				// 				yPercent: 100,
				// 			},
				// 			{
				// 				yPercent: 0,
				// 				duration: 1,
				// 				ease: "power2.out",
				// 			},
				// 		);
				// 	},
				// },
			],
		}),
	);
};
