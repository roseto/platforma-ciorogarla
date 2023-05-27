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
			includeManifestIcons: true,
			manifest: {
				name: "Ciorogârla Unită",
				short_name: "Ciorogârla Unită",
				description: "Hai să ne modernizăm!",
				// @ts-ignore
				author: "Ciorogârla Unită",
				id: "eu.org.ciorogarlaunita.app",
				theme_color: "#053b21",
				background_color: "#053b21",
				icons: [
					{
						src: "/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
				],
				start_url: "/?utm_source=homescreen",
				display: "standalone",
				orientation: "portrait",
				scope: "/",
				categories: ["education", "news", "social"],
				lang: "ro",
				iarc_rating_id: "78d71c91-c221-476e-96b0-56dbebbf4242",
				prefer_related_applications: true,
				related_applications: [
					{
						platform: "play",
						url: "https://play.google.com/store/apps/details?id=eu.org.ciorogarlaunita.app",
						id: "eu.org.ciorogarlaunita.app",
					},
					{
						platform: "webapp",
						url: "https://app.ciorogarlaunita.eu.org",
					},
				],
				screenshots: [
					{
						src: "/screenshots/1.png",
						sizes: "1080x1920",
					},
					{
						src: "/screenshots/2.png",
						sizes: "1080x1920",
					},
					{
						src: "/screenshots/3.png",
						sizes: "1080x1920",
					},
					{
						src: "/screenshots/4.png",
						sizes: "1080x1920",
					},
				]
			},
		}),
	],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
});
