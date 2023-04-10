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
			},
			includeAssets: [
				"/assets/android-chrome-192x192.png",
				"/assets/android-chrome-512x512.png",
				"/assets/apple-touch-icon.png",
				"/assets/favicon-16x16.png",
				"/assets/favicon-32x32.png",
			],
			manifest: {
				name: "Ciorogârla Unită",
				short_name: "Ciorogârla Unită",
				description: "Hai să ne modernizăm!",
				theme_color: "#053b21",
				background_color: "#053b21",
				icons: [
					{
						src: "/assets/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/assets/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "/assets/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any maskable",
					},
					{
						src: "/assets/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
				start_url: "/?utm_source=homescreen",
				display: "standalone",
				orientation: "portrait",
				scope: "/",
				categories: ["education", "news", "social"],
				lang: "ro",
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
