<script lang="ts">
	import "material-symbols/rounded.css";
	import "../app.css";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import { installPromptEvent } from "$lib/utils/a2hs";
	import type { LayoutData } from "./$types";
	import Toast from "$lib/components/Toast.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { ProgressBar } from "@prgm/sveltekit-progress-bar";
	import { handleServiceWorker } from "$lib/utils/sw";
	import { MAIN_DOMAIN } from "$lib/utils/details";

	export let data: LayoutData;

	const { session, supabase } = data;

	onMount(async () => {
		handleServiceWorker();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		window.addEventListener("beforeinstallprompt", (e) => {
			installPromptEvent.set(e as any);
		});

		return () => {
			subscription?.unsubscribe();
		};
	});
</script>

<svelte:head>
	{#if globalThis.location && globalThis.location.hostname === MAIN_DOMAIN}
		<link rel="manifest" href="/manifest.json" />
	{/if}
</svelte:head>

<ProgressBar class="text-primary mt-[env(safe-area-inset-top)]" />

<main class="mb-2 flex-1">
	<slot />
	<Toast />
</main>

<Footer />
