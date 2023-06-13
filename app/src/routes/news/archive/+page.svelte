<script lang="ts">
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import { urlFor } from "$lib/utils/sanity";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Header back title="Arhiva" />

<Container>
	<Stack>
		{#each data.articles as article}
			<a href="/news/{article.slug?.current}">
				<ListItem
					button
					primary={article.title}
					img={urlFor(article.cover).width(64).height(64).url()}
					secondary="#{article.tags?.join(' #')} &middot; {new Date(
						article._createdAt,
					).toLocaleDateString('ro')}"
				/>
			</a>
		{/each}
	</Stack>
</Container>
