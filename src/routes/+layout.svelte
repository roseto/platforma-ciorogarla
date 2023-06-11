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

	export let data: LayoutData;

	const { session, supabase } = data;

	onMount(async () => {
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
	<link rel="manifest" href="/manifest.json" />
</svelte:head>

<ProgressBar class="text-primary" />

<main class="mb-2 flex-1">
	<slot />
	<Toast />
</main>

<Footer />
