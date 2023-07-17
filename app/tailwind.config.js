/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	darkMode: "media",
	plugins: [require("@tailwindcss/typography"), require("daisyui")],

	theme: {
		extend: {
			borderRadius: {
				DEFAULT: "16px",
			},
			animation: {
				shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
			},
			keyframes: {
				shake: {
					"10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
					"20%, 80%": { transform: "translate3d(2px, 0, 0)" },
					"30%, 50%, 70%": { transform: "translate3d(-3px, 0, 0)" },
					"40%, 60%": { transform: "translate3d(3px, 0, 0)" },
				}
			}
		},
	},

	daisyui: {
		logs: false,
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
					"neutral-accent": "#bee9f7",
					"neutral-accent-content": "#001f27",
					"base-100": "#fbfdf8",
				},
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
					"neutral-accent": "#214c58",
					"neutral-accent-content": "#bee9f7",
					"base-100": "#191c1a",
				},
			},
		],
	},
};
