import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/kit/vite";
import child_process from "child_process";

// Only 7 characters of the commit hash are needed
const commitHash = child_process.execSync("git rev-parse HEAD").toString().trim().slice(0, 7);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		serviceWorker: {
			register: false,
		},
		adapter: adapter(),
		env: {
			publicPrefix: "PUBLIC_",
		},
		version: {
			name: commitHash,
		},
	},
};

export default config;
