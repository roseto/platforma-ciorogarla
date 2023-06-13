<script lang="ts">
	import Card from "$lib/components/Card.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import { urlFor } from "$lib/utils/sanity";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Header back title="Stiri" />

<Container>
	<Stack>
		<Card title="Articole recente">
			{#each data.recentArticles as article}
				<a href="/news/{article.slug?.current}">
					<ListItem
						button
						primary={article.title}
						img={urlFor(article.cover).width(64).height(64).url()}
						secondary={"#" + article.tags?.join(" #")}
					/>
				</a>
			{/each}
		</Card>
		<a href="/news/archive">
			<ListItem button icon="archive" primary="Arhiva" secondary="Toate articolele" />
		</a>
	</Stack>
</Container>
