<script lang="ts">
	import Alert from "$lib/components/Alert.svelte";
import Card from "$lib/components/Card.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import { urlFor } from "$lib/utils/sanity";
	import { notypecheck } from "$lib/utils/typecheck";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Header 
	title="Discutii"
	back
/>

<Container>
	<Stack>
		<a href="/discussions/new">
			{#if data.hasUnapprovedDiscussion}
				<Alert
					icon="schedule"
					error
					outline
				>
					Ai o discutie in asteptare de aprobare. Apasa aici pentru a o edita.
				</Alert>
			{:else}
					<ListItem
						icon="add"
						primary="Creeaza o discutie"
						button
					/>
			{/if}
		</a>

		{#if data.activeDiscussions.length !== 0}
			<Card bgColor="accent">
				<h2 class="text-xl">
					<Icon name="mode_heat" size={18}/>
					Discutii active
				</h2>
				{#each data.activeDiscussions as discussion}
					<a href="/discussions/{discussion._id}">
						<!-- upvotesCount is added manually -->
						<ListItem
							primary={discussion.title}
							secondary={"⬆" + (notypecheck(discussion).upvotesCount || 0) + " · " + discussion.description}
							img={discussion.image ? urlFor(discussion.image).width(64).height(64).url() : undefined}
							button
						/>
					</a>
				{/each}
			</Card>
		{/if}

		{#if data.allDiscussions.length !== 0}
			{#each data.allDiscussions as discussion}
				<a href="/discussions/{discussion._id}">
					<!-- upvotesCount is added manually -->
					<Card
						title={discussion.title}
						secondary={"⬆" + (notypecheck(discussion).upvotesCount || 0) + " · " + discussion.description}
						img={discussion.image ? urlFor(discussion.image).width(768).height(128).url() : undefined}
						button
					>
						{"⬆" + (notypecheck(discussion).upvotesCount || 0) + " · " + discussion.description}
					</Card>
				</a>
			{/each}
		{/if}
	</Stack>
</Container>
