<script lang="ts">
	import { getMapsEmbedURL } from "$lib/utils/maps";
	import Card from "./Card.svelte";
	import Icon from "./Icon.svelte";
	import ListItem from "./ListItem.svelte";

	export let address: string = "";
	export let plusCode: string = "";
	export let streetViewLocation: string = "";
	
	// We use this value because we use a scroll capturing
	// object inside the modal, and it blocks the scroll
	// on iOS devices. This is a workaround.
	let open = false;
</script>

<Card>
	<ListItem icon="location_on" secondary={address} />
	<div class="divider my-0" />
	<ListItem
		primary="Vedere in Street View"
		icon="streetview"
		button
		class="mb-2"
		on:click={() => open = true}
	/>
	<object
		type="text/html"
		data={getMapsEmbedURL("place", plusCode)}
		title="Google Maps Embed"
		class="w-full h-64 rounded-xl bg-base-100 dark:invert-[.90] dark:hue-rotate-180"
	/>
</Card>

<dialog class="modal" id="street_view_modal" {open}>
	<div class="modal-box bg-neutral w-full h-full">
		<form method="dialog" class="h-16 flex justify-end items-center">
			<button class="btn btn-ghost rounded-full text-neutral-content">
				<Icon name="close" size={32} />
			</button>
		</form>
		<object
			type="text/html"
			data={getMapsEmbedURL("streetview", address, streetViewLocation)}
			title="Google Maps Embed"
			class="w-full rounded-xl bg-base-100"
			class:pointer-events-none={!open}
			style="height: calc(100% - 4rem);"
		/>
	</div>
</dialog>
