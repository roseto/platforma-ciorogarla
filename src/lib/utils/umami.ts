import { browser } from "$app/environment";
import { writable } from "svelte/store";

const storedUmamiEnabled = browser ? globalThis.localStorage.getItem("umami.disable") !== "true" : false;
export const umamiEnabled = writable(storedUmamiEnabled);

if (browser)
	umamiEnabled.subscribe((value) => {
		localStorage.setItem("umami.disable", value ? "false" : "true");
	});
