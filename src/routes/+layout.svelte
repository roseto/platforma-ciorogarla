<script lang="ts">
	import "material-symbols/rounded.css";
	import "../app.css";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import type { LayoutData } from "./$types";
	import Toast from "$lib/components/Toast.svelte";

	export let data: LayoutData;

	const { session, supabase } = data;

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => {
			subscription?.unsubscribe();
		};
	});
</script>

<main class="mb-4">
	<slot />
	<Toast />
</main>
