import { gsap, SplitText } from "@lib/gsap"

/* SplitText animation hook */
const useInView = () => {

	const textElements = document.querySelectorAll(`[data-split-text]`);
	const cardElements = document.querySelectorAll(`[data-split-cards]`);

	const inViewTl = gsap.timeline({ delay: 0.15 });

	textElements?.forEach((element: any) => {
		element.classList.add("flex")
		const splitText = new SplitText(element, {
			type: "chars",
			linesClass: "overflow-hidden",
		});

		splitText.chars.forEach((char: any) => {
			const wrapper = document.createElement("div");
			wrapper.className = "overflow-hidden";
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

	cardElements?.forEach((element: any) => {
		inViewTl.to(
			element,
			{
				y: 0,
				duration: 0.75,
				stagger: 0.05,
				ease: "power4.out",
			},
			"<5%",
		);
	});
};

useInView()