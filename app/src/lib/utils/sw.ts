import { dev } from "$app/environment";
import { MAIN_DOMAIN } from "./details";

export const handleServiceWorker = () => {
	const IS_OFFICIAL_DOMAIN = globalThis.location.hostname === MAIN_DOMAIN;

	if (dev) return;

	if (!IS_OFFICIAL_DOMAIN) return;

	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("/service-worker.js");
	}
};
