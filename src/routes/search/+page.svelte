<script lang="ts">
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import TextField from "$lib/components/TextField.svelte";
	import Debouncer from "svelte-debouncer";
	import { queryParam, ssp } from "sveltekit-search-params";

	const query = queryParam("q", ssp.string(""), {
		debounceHistory: 1000,
		pushHistory: false,
	});

	const searchDebouncer = new Debouncer(() => ($query = searchString), 500);

	let searchString: string = $query || "";

	$: searchDebouncer.debounce(searchString);
</script>

<Header title={`"${$query}"`} noHeading back />

<Container class="mt-16">
	<Stack>
		<TextField bind:value={searchString} fullWidth icon="search" autocomplete="off" />
	</Stack>
</Container>
