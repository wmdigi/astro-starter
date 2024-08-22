<script>
	import { toggleCls } from "@utils";
</script>

<button class="menu-toggle lg:hidden w-[26px] h-[22px] flex flex-col justify-between hover" onclick={() => toggleCls("navigation-opened")}>
	<span class="sr-only">Open navigation</span>
	<div class="menu-toggle-line w-[26px] h-[2px] bg-black dark:bg-white menu-toggle-top-line"></div>
	<div class="menu-toggle-line w-[26px] h-[2px] bg-black dark:bg-white menu-toggle-center-line"></div>
	<div class="menu-toggle-line w-[26px] h-[2px] bg-black dark:bg-white menu-toggle-bottom-line"></div>
</button>

<style lang="css">
	:global(.menu-toggle-line) {
		transition: opacity 0.2s, transform 0.2s;
	}

	:global(.navigation-opened .menu-toggle-top-line) {
		transform: translate3d(0, 10px, 0) rotate3d(0, 0, 1, 45deg);
	}

	:global(.navigation-opened .menu-toggle-center-line) {
		opacity: 0;
	}

	:global(.navigation-opened .menu-toggle-bottom-line) {
		transform: translate3d(0, -10px, 0) rotate3d(0, 0, 1, -45deg);
	}
</style>