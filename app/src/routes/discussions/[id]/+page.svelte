<script lang="ts">
	import Badge from "$lib/components/Badge.svelte";
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import TextField from "$lib/components/TextField.svelte";
	import type { DiscussionComment } from "$lib/types/SanitySchema";
	import { urlFor } from "$lib/utils/sanity";
	import { setToast } from "$lib/utils/toast";
	import { notypecheck } from "$lib/utils/typecheck";
	import type { PageData } from "./$types";

	export let data: PageData;

	let upvoted = data.upvoted;

	$: relevantDocument = notypecheck(data.discussion.relevantDocument);
	$: upvotesCount = notypecheck(data.discussion).upvotesCount + (upvoted ? 1 : 0);
	$: comments = notypecheck(data.discussion).comments?.map((comment: DiscussionComment) => ({
		content: comment.content,
		user: data.users.find(user => user.id === comment.userId),
	})) || [];

	const toggleUpvote = async () => {
		upvoted = !upvoted;

		const res = await fetch(`/api/discussions/${data.discussion._id}/upvote`, {
			method: !upvoted ? "DELETE" : "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${data.session?.access_token}`,
			},
		})

		if (!res.ok) {
			upvoted = !upvoted;
			setToast({
				type: "error",
				content: "Eroare la votare" + await res.text(),
			})
		}
	};
</script>

<Header 
	title={data.discussion.title || "Discutie"}
	back
/>

<Container>
	<Stack>
		<Card>
			<div class="flex items-center">
				<img 
					class="rounded-full w-6 h-6"
					src={data.author.avatar_url}
					alt={data.author.full_name + " avatar"}
				/>
				<span class="ml-2 text-sm">{data.author.full_name}</span>
			</div>
			{data.discussion.description}
		</Card>

		{#if data.discussion.image}
			<Card>
				<img
					alt=""
					class="rounded"
					src={urlFor(data.discussion.image).maxWidth(1024).maxHeight(512).url()}
				/>
			</Card>
		{/if}

		{#if data.discussion.relevantDocument}
			<Card bgColor="secondary">
				<h2 class="text-lg font-semibold">Relevant</h2>
				<a
					href={relevantDocument.urlBase}
					target="_blank"
					rel="noopener noreferrer"
				>
					<ListItem
						button
						img={urlFor(relevantDocument.image).width(64).height(64).url()}
						primary={relevantDocument.title}
						secondary={relevantDocument.description || undefined}
					/>
				</a>
			</Card>
		{/if}

		<div>
			<div 
				class={!upvotesCount ? `tooltip tooltip-right tooltip-info tooltip-open` : ""}
				data-tip="Voteaza pentru a arata ca esti de acord cu aceasta discutie"
			>
				<Button
					color={upvoted ? "primary" : "neutral"}
					on:click={toggleUpvote}
				>
					⬆ {upvotesCount || "Voteaza"}
				</Button>
			</div>
		</div>
		<div class="divider"/>
		<Stack>
			<div class="join join-horizontal">
				<TextField 
					fullWidth
					placeholder="Adauga un comentariu"
					class="join-item join"
				/>
				<Button class="join-item">
					<Icon name="send"/>
				</Button>
			</div>

			{#if !comments.length}
				<h3 class="text-xl text-center">Nu exista comentarii</h3>
			{/if}

			{#each comments as comment}
				<div class="chat chat-start">
					<div class="chat-image avatar">
						<div class="w-10 rounded-full">
							<img 
								src={comment.user.avatar_url}
								alt={comment.user.full_name + " avatar"}
							/>
						</div>
					</div>
					<div class="chat-header">
						{comment.user.full_name}
					</div>
					<div class="chat-bubble">
						{comment.content}
					</div>
				</div>
			{/each}
		</Stack>
	</Stack>
</Container>
