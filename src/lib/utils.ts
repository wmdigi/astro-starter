// will remove html tags from a string
export const stripTags = (string) => {
	return string.replace(/(<([^>]+)>)/gi, "");
};

// adds https: to urls that start with //
export const prefixUrlProtocol = (url) => {
	if (url && url.startsWith("//")) {
		return "https:" + url;
	}
	return url;
};

export const isSafari = (window: Window) => {
	return (
		window.navigator.vendor.match(/apple/i) &&
		!window.navigator.userAgent.match(/crios/i) &&
		!window.navigator.userAgent.match(/fxios/i) &&
		!window.navigator.userAgent.match(/Opera|OPT\//)
	);
};

export const isBrowser = () => typeof window !== "undefined";

// Handy body class operations
export const addCls = (cls: string) => document.body.classList.add(cls);
export const removeCls = (cls: string) => document.body.classList.remove(cls);
export const toggleCls = (cls: string) => document.body.classList.toggle(cls);
