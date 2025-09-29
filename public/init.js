const MODULE = "init()";
const TIMEOUT_MINUTES = 1; // minutes before the initial visit is reset
const INITIAL_CLASS_DURATION_MS = 1500;
const DARK_MODE = true;

function shouldSetInitialState() {
	const currentTime = new Date().getTime();
	const lastVisitTime = localStorage.getItem("lastVisitTime");

	if (!lastVisitTime) {
		return true;
	}

	const timeDifference = currentTime - parseInt(lastVisitTime, 10);
	const minutesPassed = timeDifference / (1000 * 60);

	return minutesPassed > TIMEOUT_MINUTES;
}

function handleInitialState() {
	if (shouldSetInitialState()) {
		document.documentElement.classList.add("initial");
		// console.log("Initial visit detected");

		setTimeout(() => {
			document.documentElement.classList.remove("initial");
			// console.log("Removed 'initial' class after timeout");
		}, INITIAL_CLASS_DURATION_MS);
	}

	const currentTime = new Date().getTime();
	localStorage.setItem("lastVisitTime", currentTime.toString());
	// console.log(MODULE, "Last visit time: " + currentTime);
}

function setTheme() {
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const theme = localStorage?.getItem("theme") ?? (prefersDark ? "dark" : "light");

	if (theme === "dark") {
		document.documentElement.classList.add("dark");
	}

	localStorage.setItem("theme", theme);
	//console.log(MODULE, "Theme: " + theme);
}

function init() {
	console.log("Initializing...");
	handleInitialState();
	DARK_MODE && setTheme();

	document.addEventListener("DOMContentLoaded", () => {
		document.documentElement.classList.add("mounted");
	});
}

init();
