<script lang="ts">
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import Toggle from "$lib/components/Toggle.svelte";
	import { umamiEnabled } from "$lib/utils/umami";
	import { version } from "$app/environment";

</script>

<Header
	title="Setari"
	back
/>

<Container>
	<Stack>
		<ListItem
			primary="Analitica"
			secondary={$umamiEnabled ? "Dezactiveaza analitica anonima" : "Activeaza analitica anonima"}
			button
			on:click={() => $umamiEnabled = !$umamiEnabled}
		>
			<Toggle 
				bind:checked={$umamiEnabled}
			/>
		</ListItem>

		<div class="divider" />
		
		<a href="https://ciorogarlaunita.eu.org/terms-and-conditions" target="_blank">
			<ListItem
				button
				icon="description"
				primary="Termeni și condiții"
			/>
		</a>
		<a href="https://ciorogarlaunita.eu.org/privacy-policy" target="_blank">
			<ListItem
				button
				icon="policy"
				primary="Politica de confidențialitate"
			/>
		</a>

		<ListItem
			icon="info"
			primary="Versiune"
			secondary={version}
		/>
	</Stack>
</Container>
