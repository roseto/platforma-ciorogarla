<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import Container from "$lib/components/Container.svelte";
	import Dialog from "$lib/components/Dialog.svelte";
	import Header from "$lib/components/Header.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import TextField from "$lib/components/TextField.svelte";
	import type { DiscussionComment } from "$lib/types/SanitySchema";
	import type { UserProfile } from "$lib/types/UserProfile";
	import { openModal } from "$lib/utils/modal";
	import { urlFor } from "$lib/utils/sanity";
	import { setToast } from "$lib/utils/toast";
	import { notypecheck } from "$lib/utils/typecheck";
	import { flip } from "svelte/animate";
	import type { PageData } from "./$types";

	export let data: PageData;

	let upvoted = data.upvoted;

	$: upvotesCount = notypecheck(data.discussion).upvotesCount + (upvoted ? 1 : 0);

	const relevantDocument = notypecheck(data.discussion.relevantDocument);
	let comments: { _id: string, content: string, user: UserProfile }[] = notypecheck(data.discussion).comments?.map((comment: DiscussionComment) => ({
		_id: comment._id,
		content: comment.content,
		user: data.users.find(user => user.id === comment.userId),
	})).reverse() || [];

	let commentDisabled = false;

	const toggleUpvote = async () => {
		if (!data.session) {
			openModal("login_required_vote");
			return;
		}

		// We toggle the upvote state before the request
		// so that the UI is updated instantly
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
				content: "Eroare la votare",
			})
		}
	};

	const sendComment = async (event: Event) => {
		if (!data.session) {
			openModal("login_required_comment");
			return;
		}

		const formData = new FormData(event.target as HTMLFormElement);

		if (!formData.get("comment")) {
			setToast({
				type: "error",
				content: "Comentariul nu poate fi gol",
			})
			return;
		}

		commentDisabled = true;

		comments = [{
			_id: new Date().getTime().toString(), // Doesn't matter, it's just for the key
			content: formData.get("comment") as string,
			user: {
				id: data.session.user.id,
				full_name: data.session.user.user_metadata.full_name,
				avatar_url: data.session.user.user_metadata.avatar_url,
				discussion_ban: false,
			},
		}, ...comments];

		// @ts-expect-error: reset is not defined on EventTarget
		event.target.reset();

		const res = await fetch(`/api/discussions/${data.discussion._id}/comment`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${data.session?.access_token}`,
			},
			body: JSON.stringify({ content: formData.get("comment") }),
		})
		

		if (!res.ok) {
			setToast({
				type: "error",
				content: "Eroare la trimiterea comentariului",
			})
			comments = comments.slice(1);
		}

		commentDisabled = false;
	}
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
			<Button
				color={upvoted ? "primary" : "neutral"}
				on:click={toggleUpvote}
				disabled={data.discussion.locked}
			>
				⬆ {upvotesCount || "Voteaza"}
			</Button>
		</div>
		<div class="divider"/>
		<Stack>
			{#if data.discussion.locked}
				<p>
					<b>Discutia este inchisa</b>
				</p>
			{:else}
				<form on:submit|preventDefault={sendComment} class="join join-horizontal">
					<TextField 
						fullWidth
						placeholder="Adauga un comentariu"
						class="join-item join"
						name="comment"
						autoComplete="off"
						disabled={commentDisabled}
					/>
					<Button 
						class="join-item"
						type="submit"
						disabled={commentDisabled}
					>
						<Icon name="send"/>
					</Button>
				</form>
			{/if}

			{#if !comments.length}
				<h3 class="text-xl text-center">Nu exista comentarii</h3>
			{/if}

			<!-- For some reason if we don't use a div wrapper, comments fuck up on webkit -->
			<div>
				{#each comments as comment (comment._id)}
					<div class="chat chat-start" animate:flip>
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
			</div>

		</Stack>
	</Stack>
</Container>

<Dialog id="login_required_vote">
	<p>
		Pentru a putea vota, trebuie sa fii conectat.
		Stim, stim, e enervant, dar trebuie sa ne asiguram
		ca nu se voteaza de mai multe ori de catre aceeasi persoana.
	</p>


	<a href="/login" slot="actions">
		<Button
			fullWidth
			icon="login"
		>
			Conectare
		</Button>
	</a>
</Dialog>


<Dialog id="login_required_comment">
	<p>
		Pentru a comenta trebuie sa fii conectat.
		Totusi, nu e nevoie sa fii conectat pentru a vedea comentariile.
	</p>


	<a href="/login" slot="actions">
		<Button
			fullWidth
			icon="login"
		>
			Conectare
		</Button>
	</a>
</Dialog>
