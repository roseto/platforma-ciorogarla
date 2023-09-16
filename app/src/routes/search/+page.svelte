<script lang="ts">
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import TextField from "$lib/components/TextField.svelte";
	import SvelteMarkdown from "svelte-markdown";
	import Card from "$lib/components/Card.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import { urlFor } from "$lib/utils/sanity";
	import { openModal } from "$lib/utils/modal";
	import Icon from "$lib/components/Icon.svelte";
	import type { PageData } from "./$types";
	import Button from "$lib/components/Button.svelte";
	import Badge from "$lib/components/Badge.svelte";
	import Dialog from "$lib/components/Dialog.svelte";

	export let data: PageData;

	$: docsKnowledge = data?.documents?.filter((document) => document._type === "knowledge") || [];
	$: docsExcludingKnowledge =
		data?.documents?.filter((document) => document._type !== "knowledge") || [];

	const checkIfFirst = (id: string) => {
		return data.documents?.[0]?._id === id;
	};
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
				{#if data?.documents[0]._type === "knowledge"}
					<div class="prose max-w-none text-accent-content prose-a:text-accent-content">
						<SvelteMarkdown source={data?.documents[0].content} />
					</div>
					<p class="text-sm opacity-50">Cunostintele sunt oferite de Roseto</p>
				{:else}
					<p>
						{data?.documents[0].description}
					</p>
					<a class="link link-hover text-sm opacity-50" href={data?.documents?.[0].url}>
						Rezultat de la {data?.documents[0].title}
					</a>
				{/if}
			</Card>
		{/if}

		{#if data?.documents}
			<Card title="Rezultate">
				{#each docsKnowledge as document}
					<ListItem
						primary={document.title}
						secondary="Cunostinte"
						icon="help"
						button
						on:click={() => openModal("knowledge-" + document._id)}
					>
						{#if checkIfFirst(document._id)}
							<div class="tooltip tooltip-left tooltip-accent" data-tip="Rezultat principal">
								<Badge class="badge-sm" color="accent" />
							</div>
						{/if}
					</ListItem>
					<Dialog id="knowledge-{document._id}">
						<h1 class="text-2xl">{document.title}</h1>
						<div class="prose">
							<SvelteMarkdown source={document.content} />
						</div>
					</Dialog>
				{/each}
				{#if docsKnowledge.length > 0 && docsExcludingKnowledge.length > 0}
					<div class="divider" />
				{/if}
				{#each docsExcludingKnowledge as document}
					<!-- Business -->
					<a href={document.url}>
						<ListItem
							primary={document.title}
							secondary={document.description}
							button
							img={urlFor(document.image).width(64).height(64).url()}
						>
							<!-- Check if is first in data.documents -->
							{#if checkIfFirst(document._id)}
								<div class="tooltip tooltip-left tooltip-accent" data-tip="Rezultat principal">
									<Badge class="badge-sm" color="accent" />
								</div>
							{/if}
						</ListItem>
					</a>
				{/each}
			</Card>
		{/if}
	</Stack>
</Container>
