import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
	plugins: [
		solidSvg(),
		solidPlugin(), 
		suidPlugin()
	],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
});
