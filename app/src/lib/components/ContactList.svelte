<script lang="ts">
	import ListItem from "./ListItem.svelte";
	import FacebookIcon from "$lib/resources/icons/facebook.svelte";
	import InstagramIcon from "$lib/resources/icons/instagram.svelte";

	export let facebook: string = "";
	export let instagram: string = "";
	export let phone: string = "";
	export let email: string = "";
	export let website: string = "";
</script>

<div>
	<h4 class="text-sm opacity-50">Contact</h4>

	{#if website}
		<a href={website} target="_blank" rel="noopener noreferrer">
			<ListItem primary="Website" secondary={website} icon="web" button />
		</a>
	{/if}

	{#if email}
		<a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
			<ListItem primary="Email" secondary={email} icon="mail" button />
		</a>
	{/if}

	{#if phone}
		<a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer">
			<ListItem primary="Telefon" secondary={phone} icon="phone" button />
		</a>
	{/if}

	{#if facebook}
		<a href={facebook} target="_blank" rel="noopener noreferrer">
			<ListItem primary="Facebook" secondary={facebook} iconElement={FacebookIcon} button />
		</a>
	{/if}

	{#if instagram}
		<a href={instagram} target="_blank" rel="noopener noreferrer">
			<ListItem primary="Instagram" secondary={instagram} iconElement={InstagramIcon} button />
		</a>
	{/if}
</div>
