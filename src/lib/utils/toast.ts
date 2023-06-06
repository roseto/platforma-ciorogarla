import { writable }	from 'svelte/store';


interface Toast {
	content: string;
	type: "success" | "error" | "warning" | "info";
	open: boolean;
}

export const toast = writable<Toast>({ content: "", type: "info", open: false });

export const setToast = (props: Omit<Toast, "open">) => toast.set({ ...props, open: true });
