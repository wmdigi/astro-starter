import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

gsap.config({});

let mm = gsap.matchMedia();

const breakpoints = {
	isDesktop: `(min-width: 1024px)`,
	isTablet: `(max-width: 1023px)`,
	isMobile: `(max-width: 743px)`,
	isSmallMobile: `(max-width: 620px)`,
	isMouse: `(pointer: fine)`,
	isTouch: `(pointer: coarse)`,
};

mm.add(breakpoints, (context) => {});

const scrollTo = (
	anchor: number | HTMLElement,
	offset: number,
	ease: string = "power2.inOut",
	duration: number = 1,
) => {
	gsap.to(window, {
		duration: duration,
		ease: ease,
		scrollTo: { y: anchor, offsetY: offset },
	});
};

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText, mm, breakpoints, scrollTo };
