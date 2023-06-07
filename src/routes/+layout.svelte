<script lang="ts">
	import "material-symbols/rounded.css";
	import "../app.css";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import { installPromptEvent } from "$lib/utils/a2hs";
	import type { LayoutData } from "./$types";
	import Toast from "$lib/components/Toast.svelte";
	import { page } from "$app/stores";
	// @ts-ignore
	import { pwaInfo } from "virtual:pwa-info"; 

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

		if ('serviceWorker' in navigator && !$page.url.origin.includes("app.ciorogarlaunita.eu.org")) {
			const { registerSW } = await import('virtual:pwa-register')
			registerSW({
				immediate: true,
				onRegistered(r) {
					console.log(`SW Registered: ${r}`)
				},
				onRegisterError(error) {
					console.log('SW registration error', error)
				}
			})
		}

		return () => {
			subscription?.unsubscribe();
		};
	});

	/* $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '' */ 
</script>

<svelte:head>
	<link rel="manifest" href="/manifest.json" />
</svelte:head>

<main class="mb-4">
	<slot />
	<Toast />
</main>
