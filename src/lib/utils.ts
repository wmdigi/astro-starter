import { log, error } from "./logger";

const MODULE: string = "Utils";

// will remove html tags from a string
export const stripTags = (string: string): string => {
	return string.replace(/(<([^>]+)>)/gi, "");
};

// adds https: to urls that start with //
export const prefixUrlProtocol = (url: string): string => {
	if (url && url.startsWith("//")) {
		return "https:" + url;
	}
	return url;
};

export const isSafari = (window: Window): boolean => {
	return (
		!!window.navigator.vendor.match(/apple/i) &&
		!window.navigator.userAgent.match(/crios/i) &&
		!window.navigator.userAgent.match(/fxios/i) &&
		!window.navigator.userAgent.match(/Opera|OPT\//)
	);
}

const isBrowser: boolean = import.meta.env.SSR === false;

// Handy html class operations
export const addCls = (cls: string): void => document.documentElement.classList.add(cls);
export const removeCls = (cls: string): void => document.documentElement.classList.remove(cls);
export const toggleCls = (cls: string) => document.documentElement.classList.toggle(cls);

const getOrdinalSuffix = (day: number) => {
	if (day >= 11 && day <= 13) {
		return "th";
	}
	const suffixes = ["th", "st", "nd", "rd"];
	const v = day % 10;
	return suffixes[v] || suffixes[0];
};

export function formatDate(
	input: string | Date,
	options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
) {
	const date = input instanceof Date ? input : new Date(input);

	if (isNaN(date.getTime())) {
		return "Invalid Date";
	}

	const day = date.toLocaleString("en-AU", { day: options.day, timeZone: options.timeZone });
	const month = date.toLocaleString("en-AU", { month: options.month, timeZone: options.timeZone });
	const year = date.toLocaleString("en-AU", { year: options.year, timeZone: options.timeZone });

	return options.month === "numeric"
		? `${day}. ${month}. ${year}`
		: `${day}${getOrdinalSuffix(parseInt(day))} ${month} ${year}`;
}

export const getCurrentUrlPath = (url: string): string => {
	return "/" + url.slice(1) + "/";
};

// toggle dark mode with save to local storage dark-mode key
export const toggleDarkMode = (): void => {
	log(MODULE, "Setting theme to " + (isDarkModeEnabled ? "light" : "dark"));
	if (isBrowser) {
		const darkMode: string = localStorage.getItem("theme") || "false";
		localStorage.setItem("theme", darkMode === "dark" ? "light" : "dark");
		toggleCls("dark");
	} else {
		error(MODULE, "This is not a browser");
	}
};

export const isDarkModeEnabled: boolean = isBrowser ? localStorage.getItem("theme") === "light" : false;
