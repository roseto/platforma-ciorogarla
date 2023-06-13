<script lang="ts">
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import TextField from "$lib/components/TextField.svelte";
	import SvelteMarkdown from "svelte-markdown";
	import Card from "$lib/components/Card.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import { urlFor } from "$lib/utils/sanity";
	import Icon from "$lib/components/Icon.svelte";
	import type { PageData } from "./$types";
	import Button from "$lib/components/Button.svelte";

	export let data: PageData;
</script>

<Header title={data?.query ? `"${data?.query}"` : "Cautare"} noHeading back />

<Container class="mt-16">
	<Stack>
		<form method="get">
			<TextField
				name="query"
				fullWidth
				icon="auto_awesome"
				autocomplete="off"
				value={data?.query}
				placeholder="Caută orice..."
			/>
			<Button class="mt-2" type="submit" icon="search" fullWidth>Caută</Button>
		</form>

		{#if data?.documents}
			<p class="opacity-50">
				{data.documents.length}
				{data.documents.length === 1 ? "rezultat" : "rezultate"}
			</p>
		{/if}

		{#if !data?.query}
			<div class="text-center my-8">
				<Icon name="auto_awesome" size={64} />
				<h1 class="text-2xl">Începe să cauți ceva...</h1>
				<p>Începe să cauți ceva pentru a vedea rezultatele.</p>
			</div>
		{/if}

		{#if data?.documents?.[0]}
			<Card bgColor="accent">
				<!-- Business -->
				{#if data?.documents[0]._type === "business"}
					<p>
						{data?.documents[0].description}
					</p>
					<a
						class="link link-hover text-sm opacity-50"
						href="/businesses/{data?.documents[0].slug?.current}"
					>
						Rezultat de la {data?.documents[0].name}
					</a>
				{/if}
			</Card>
		{/if}

		{#if data?.documents}
			<Card>
				{#each data?.documents as document}
					<!-- Business -->
					{#if document._type === "business"}
						<a href="/businesses/{document.slug?.current}">
							<ListItem
								primary={document.name}
								secondary={document.description}
								button
								img={urlFor(document.logo).width(64).height(64).url()}
							/>
						</a>
					{/if}
				{/each}
			</Card>
		{/if}
	</Stack>
</Container>
