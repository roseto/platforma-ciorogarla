import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";
import solidSvg from "vite-plugin-solid-svg";
import devtools from "solid-devtools/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		solidSvg(),
		solidPlugin(), 
		suidPlugin(),
		devtools({
			autoname: true
		}),
		VitePWA({
			registerType: "autoUpdate",
			devOptions: {
				enabled: false
			}
		}),
	],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
});
