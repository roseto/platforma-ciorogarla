<script lang="ts">
	import { getMapsEmbedURL } from "$lib/utils/maps";
	import { getModal } from "$lib/utils/modal";
	import Icon from "./Icon.svelte";
	import ListItem from "./ListItem.svelte";

	export let address: string = "";
	export let plusCode: string = "";
	export let streetViewLocation: string = "";
</script>

<div class="bg-neutral text-neutral-content p-2 rounded">
	<ListItem icon="location_on" secondary={address} />
	<div class="divider my-0" />
	<ListItem
		primary="Vedere in Street View"
		icon="streetview"
		button
		class="mb-2"
		on:click={() => getModal("street_view_modal")?.showModal()}
	/>
	<object
		type="text/html"
		data={getMapsEmbedURL("place", plusCode)}
		title="Google Maps Embed"
		class="w-full h-64 rounded-xl bg-base-100 dark:invert-[.90] dark:hue-rotate-180"
	/>
</div>

<dialog class="modal" id="street_view_modal">
	<div class="bg-neutral w-screen h-screen">
		<form method="dialog" class="h-16 flex justify-end items-center">
			<button class="btn btn-ghost btn rounded-full text-neutral-content">
				<Icon name="close" size={32} />
			</button>
		</form>
		<object
			type="text/html"
			data={getMapsEmbedURL("streetview", address, streetViewLocation)}
			title="Google Maps Embed"
			class="w-full rounded-t-xl bg-base-100"
			style="height: calc(100vh - 4rem);"
		/>
	</div>
</dialog>
