<script lang="ts">
	import Button from "$lib/components/Button.svelte";

	import Toast from "$lib/components/Toast.svelte";
	import { setToast } from "$lib/utils/toast";

	export let type: "info" | "success" | "error" | "warning" = "info";
	export let content: string = "This is a toast message";
</script>

<Button on:click={() => setToast({ type, content })}>Show Toast</Button>

<Toast />
