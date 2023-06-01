/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	darkMode: "media",
	plugins: [
		require("@tailwindcss/typography"),
		require("daisyui")
	],

	daisyui: {
		themes: [
			{
				light: {
					primary: "#006d3f",
					"primary-content": "#ffffff",
					secondary: "#4f6354",
					"secondary-content": "#ffffff",
					accent: "#3b6470",
					"accent-content": "#ffffff",
					neutral: "#d1e8d5",
					"neutral-content": "#0c1f14",
					"base-100": "#fbfdf8",
				}
			},
			{
				dark: {
					primary: "#79da9e",
					"primary-content": "#00391e",
					secondary: "#b5ccba",
					"secondary-content": "#213528",
					accent: "#a3cddb",
					"accent-content": "#033640",
					neutral: "#374b3d",
					"neutral-content": "#d1e8d5",
					"base-100": "#191c1a",
				}
			}
		]
	}
}

