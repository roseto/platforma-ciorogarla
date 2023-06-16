<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import Badge from "$lib/components/Badge.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import { urlFor } from "$lib/utils/sanity";
	import { notypecheck } from "$lib/utils/typecheck";
	import type { PageData } from "./$types";

	export let data: PageData;

	const windowWidth = globalThis.innerWidth;
</script>

<Header
	title={data.article.title || "Articol"}
	back
	themeColor={notypecheck(data.article?.cover)?.asset?.metadata?.palette?.dominant.background}
	emphasizeButtons
	noHeading
/>

<img
	src={urlFor(data.article.cover)
		.width(windowWidth * 2)
		.height(256)
		.url()}
	alt={data.article.title}
	width={windowWidth}
	height={128}
	class="rounded-b"
/>

<Container>
	<Stack>
		<h1 class="text-3xl mt-2">{data.article.title}</h1>
		<p class="text-sm opacity-50">{new Date(data.article._createdAt).toLocaleDateString("ro")}</p>
		<div class="flex flex-row gap-1">
			{#each data.article.tags || [] as tag}
				<Badge color="secondary" outline>#{tag}</Badge>
			{/each}
		</div>

		<div class="divider" />

		<div class="prose max-w-none">
			<SvelteMarkdown source={data.article.content} />
		</div>
	</Stack>
</Container>
