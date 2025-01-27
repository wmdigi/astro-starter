import { gsap, SplitText } from "@lib/gsap"

/* SplitText animation hook */
export const splitAnimation = () => {

	const textElements = document.querySelectorAll(`[data-split-text]`);

	const inViewTl = gsap.timeline({ delay: 1 });

	textElements?.forEach((element: any) => {
		element.classList.add("flex")
		const splitText = new SplitText(element, {
			type: "chars",
			linesClass: "overflow-hidden",
		});

		splitText.chars.forEach((char: any) => {
			const wrapper = document.createElement("div");
			wrapper.className = "overflow-x-clip";
			char.parentNode?.insertBefore(wrapper, char);
			wrapper.appendChild(char);
		});

		inViewTl.from(
			splitText.chars,
			{
				xPercent: -120,
				duration: 0.75,
				ease: "power4.out",
				stagger: 0.05,
				onComplete: () => {
					splitText.revert();
				},
			},
			"<10%",
		);
	});
};