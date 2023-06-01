<script lang="ts">
	import Header from "../components/Header.svelte";
	import Container from "../components/Container.svelte";
	import Stack from "../components/Stack.svelte";
	import Button from "../components/Button.svelte";
	import Card from "../components/Card.svelte";
	import type {PageData} from "./$types";
	import ListItem from "../components/ListItem.svelte";
	import Badge from "../components/Badge.svelte";
	import BackgroundGlow from "../components/BackgroundGlow.svelte";

	export let data: PageData;
</script>


<BackgroundGlow />

<Header 
	title="Home"
/>
<Container>
	<Stack>
		<div>
			<Badge color="primary">Primary</Badge>
			<Badge color="secondary">Secondary</Badge>
			<Badge color="accent">Accent</Badge>
			<Badge color="neutral">Neutral</Badge>
		</div>
		<a href="/second">
			<Button color="accent">Button</Button>
		</a>
		<Card
			title="Title boss"
			imgSrc="https://source.unsplash.com/random/800x600?forest"
		>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum neque
			alias, ea rerum officia dolorem fugiat repellat perspiciatis,
			aliquid ducimus consequatur vel tempore, maxime corrupti accusamus
			inventore officiis? Dolor, iusto?
		</Card>
		<Card>
			{#each data.businesses as business}
				<ListItem
					button
					primary={business.name}
					secondary={business.description}
				/>
			{/each}
		</Card>
	</Stack>
</Container>
