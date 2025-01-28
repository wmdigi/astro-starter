import { gsap, SplitText } from "@lib/gsap";

/* SplitText animation hook */
export const splitAnimation = () => {
	const textElements = document.querySelectorAll(`[data-split-text]`);

	const inViewTl = gsap.timeline({ delay: 0.15 });

	textElements?.forEach((element: any) => {
		const isHeading = element instanceof HTMLHeadingElement;
		isHeading && element.classList.add("flex");
		const splitText = new SplitText(element, {
			type: isHeading ? "chars" : "lines",
			linesClass: "overflow-hidden",
		});

		(isHeading ? splitText.chars : splitText.lines).forEach((char: any) => {
			const wrapper = document.createElement("div");
			isHeading ? (wrapper.className = "overflow-x-clip") : (wrapper.className = "overflow-y-clip");
			char.parentNode?.insertBefore(wrapper, char);
			wrapper.appendChild(char);
		});

		if (isHeading) {
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
		} else {
			inViewTl.from(
				splitText.lines,
				{
					yPercent: 120,
					duration: 0.75,
					ease: "power4.out",
					stagger: 0.05,
					onComplete: () => {
						splitText.revert();
					},
				},
				"<10%",
			);
		}
	});
};

splitAnimation();
