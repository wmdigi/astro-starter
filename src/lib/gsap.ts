import { warn } from "@lib/logger";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/* The following plugins are Club GSAP perks */
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, ScrollSmoother); // (CustomEase, Flip, ...) -> DELETE WHICH NOW USED TO AVOID UNNECESSARY JS TO BE LOADED

gsap.config({

});

let mm = gsap.matchMedia();

/* implement coarse, fine */
const breakpoints = {
	isDesktop: `(min-width: 1024px)`,
	isTablet: `(max-width: 1023px)`,
	isMobile: `(max-width: 743px)`,
	isSmallMobile: `(max-width: 620px)`,
	isMouse: `(pointer: fine)`,
	isTouch: `(pointer: coarse)`,
};

let smoother: ScrollSmoother;

mm.add(breakpoints, (context) => {
	const { isDesktop } = context.conditions || {};

	// Smooth scroll via Lenis
	if (isDesktop) {
		smoother = ScrollSmoother.create({
			content: document.querySelector("main"),
			smooth: 1,
			effects: true,
			normalizeScroll: true,
			ignoreMobileResize: true,
		});
	} else {
		warn("GSAP", "ScrollSmoother is disabled on touch devices");
	}
});

const scrollTo = (anchor: number | HTMLElement, offset: number, ease: string = "power2.inOut", duration: number = 1) => {
	gsap.to(window, {
		duration: duration,
		ease: ease,
		scrollTo: { y: anchor, offsetY: offset },
	});
};

let tl = setTimeout(() => {
	ScrollTrigger.refresh();
	clearTimeout(tl);
}, 1500);

export {
	gsap,
	ScrollTrigger,
	ScrollToPlugin,
	SplitText,
	mm,
	breakpoints,
	scrollTo,
};
