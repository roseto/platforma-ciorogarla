import {createContext, createSignal} from "solid-js";

declare global {
	interface Window {
		installPrompt: Event | null;
	}
}

export const useA2HS = () => {
	const [prompt, setPrompt] = createSignal<Event | null>(window.installPrompt);

	window.addEventListener("beforeinstallprompt", (e) => {
		e.preventDefault();
		setPrompt(e);
		window.installPrompt = e;
	});

	const install = () => {
		prompt()?.prompt();
	}
	
	return [prompt, install];
}
