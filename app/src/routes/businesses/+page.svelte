<script lang="ts">
	import { businessTypes } from "$lib/utils/businessTypes";
	import { urlFor } from "$lib/utils/sanity";
	import { flip } from "svelte/animate";
	import Badge from "$lib/components/Badge.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import type { PageData } from "./$types";
	import { queryParam, ssp } from "sveltekit-search-params";

	export let data: PageData;

	$: ({ businesses } = data);

	const filter = queryParam("filter", ssp.string(), {
		pushHistory: false,
	});

	let scrollContainer: HTMLDivElement;
	function setFilter(value: string[]) {
		$filter = value.join(",");

		scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
	}

	// Sort by first in filter
	$: businessTypesSorted = [...businessTypes].sort((a, b) => {
		const aIndex = $filter?.split(",").indexOf(a[0]) ?? -1;
		const bIndex = $filter?.split(",").indexOf(b[0]) ?? -1;

		return bIndex - aIndex;
	});
</script>

<Header back title="Afaceri" />

<Container>
	<Stack>
		<div class="flex flex-row overflow-x-scroll gap-2" bind:this={scrollContainer}>
			{#each businessTypesSorted as [key, value] (key)}
				<div animate:flip={{ duration: 200 }}>
					<Badge
						button
						icon={value.icon}
						outline={!$filter?.split(",").includes(key)}
						color="secondary"
						large
						on:click={() => {
							const filters = $filter?.split(",") ?? [];

							if (filters.includes(key)) {
								setFilter(filters.filter((f) => f !== key));
							} else {
								setFilter([...filters, key]);
							}
						}}
					>
						{value.name}
					</Badge>
				</div>
			{/each}
		</div>

		<div class="bg-neutral text-neutral-content p-2 rounded">
			{#each businesses as business}
				<a href="/businesses/{business.slug?.current}">
					<ListItem
						button
						primary={business.name}
						secondary={business.description}
						img={urlFor(business.logo).width(64).height(64).url()}
					/>
				</a>
			{/each}
		</div>
	</Stack>
</Container>
