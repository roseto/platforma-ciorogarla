<script lang="ts">
	import Button from "./Button.svelte";

	export let docId: string;
	export let docType: "business" | "article" | "volunteeringProject";
</script>

<a 
	href="/discussions/new?doc={docId}"
>
	<Button
		icon="forum"
	>
		Crează o discuție legată de
		{#if docType === "business"}
			această afacere
		{:else if docType === "article"}
			acest articol
		{:else if docType === "volunteeringProject"}
			acest proiect de voluntariat
		{/if}
	</Button>
</a>
