const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'selector',
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {
			screens: {
				xs: "375px",
				sm: "440px", // iPhone 15 Plus = 430x932
				md: "768px", // iPad mini = 768x1024
				lg: "1024px", // iPad Pro = 1024x1366
				xl: "1366px",
				"2xl": "1440px",
				"3xl": "1920px",
				"4xl": "2560px",

			},
			colors: {
				default: "#000"
			},
			backgroundImage: {
				"gradient": "linear-gradient(117deg, #FF0 0%, #D4FB08 100%)"
			},
			transitionTimingFunction: {
				easeOutCubic: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
				easeInCubic: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
				easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
				easeFormOpen: 'cubic-bezier(0.1, 0, 0.1, 1)',
				easeFormClose: 'cubic-bezier(0.2, 0, 0, 1)',
				easeInOutExpo: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
				easeInOutQuart: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)'
			},
			transitionDuration: {
				1500: '1500ms',
				2000: '2000ms',
				2500: '2500ms',
				3000: '3000ms'
			}
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('initial', ['&.initial', '.initial &']),
				addVariant('onload', ['&.onload', '.onload &']),
				addVariant('mounted', [
					'&.mounted',
					'.mounted &'
				]),
				addVariant('is-safari', [
					'&.is-safari',
					'.is-safari &'
				]),
				addVariant('logged-in', [
					'&.logged-in',
					'.logged-in &'
				]),
				addVariant('server-loaded', [
					'&.server-loaded',
					'.server-loaded &'
				])
		}),
		require('@tailwindcss/forms'),
		require('tailwindcss-motion')
	],
}
