import { browser } from "$app/environment";
import { UAParser } from "ua-parser-js";

// We target all Apple devices since they use the same webkit engine
export const isIos = () => {
	if (!browser) return false;

	const parser = new UAParser();

	return parser.getDevice().vendor === "Apple";
};

export const isInstalled = () => {
	if (!browser) return false;

	return globalThis.matchMedia("(display-mode: standalone)").matches;
};
