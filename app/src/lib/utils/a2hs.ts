import { writable } from "svelte/store";

interface BeforeInstallPromptEvent extends Event {
	prompt(): void;
	userChoice: Promise<{
		outcome: "accepted" | "dismissed";
	}>;
}

export const installPromptEvent = writable<BeforeInstallPromptEvent | null>(null);
