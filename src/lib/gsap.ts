import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";

/* The following plugins are Club GSAP perks */
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, CustomEase, Flip);

let isTouch: boolean = false;

gsap.config({
	//force3D: true,
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

let smoother = null;

mm.add(breakpoints, (context) => {
	const { isDesktop, isTablet, isMobile, isMouse, isTouch } = context.conditions || {};

	// Smooth scroll via Lenis
	if (true) {
		
	}
});

const scrollTo = (anchor, offset, duration = 1) => {
	gsap.to(window, {
		duration: duration,
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
	CustomEase,
	mm,
	breakpoints,
	scrollTo,
	Flip,
	isTouch,
};
