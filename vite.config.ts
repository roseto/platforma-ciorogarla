import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";
import solidSvg from "vite-plugin-solid-svg";
import devtools from "solid-devtools/vite";

export default defineConfig({
	plugins: [
		solidSvg(),
		solidPlugin(), 
		suidPlugin(),
		devtools({
			autoname: true
		})
	],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
});
