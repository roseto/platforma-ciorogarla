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
	import { openModal } from "$lib/utils/modal";
	import { urlFor } from "$lib/utils/sanity";
	import { setToast } from "$lib/utils/toast";
	import { notypecheck } from "$lib/utils/typecheck";
	import type { PageData } from "./$types";
	import DiscussionCommentBubble from "$lib/components/DiscussionCommentBubble.svelte";
	import { flip } from "svelte/animate";

	export let data: PageData;

	let upvoted = data.upvoted;
	
	let replyToCommentId: string = "";

	$: replyToComment = comments.find(comment => comment._id === replyToCommentId);

	$: upvotesCount = notypecheck(data.discussion).upvotesCount + (upvoted ? 1 : 0);

	const relevantDocument = notypecheck(data.discussion.relevantDocument);
	let comments = data.comments?.map((comment) => ({
		_id: comment._id,
		_createdAt: comment._createdAt,
		content: comment.content,
		replyTo: comment.replyTo as { _id: string, _createdAt: string, content: string } | undefined,
		user: data.users.find(user => user.id === comment.userId),
	})) || [];

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

	const openCommentDialog = async (replyTo?: string | Event) => {
		if (!data.session) {
			openModal("login_required_comment");
			return;
		}

		replyToCommentId = typeof replyTo === "string" ? replyTo : "";

		openModal("comment");
	}

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
			_createdAt: new Date().toISOString(),
			content: formData.get("comment") as string,
			replyTo: replyToComment as typeof comments[0]["replyTo"] | undefined,
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
			body: JSON.stringify({ 
				content: formData.get("comment"),
				replyTo: replyToCommentId,
			}),
		})
		

		if (!res.ok) {
			setToast({
				type: "error",
				content: "Eroare la trimiterea comentariului",
			})
			comments = comments.slice(1);
		} else {
			setToast({
				type: "success",
				content: "Comentariul a fost trimis",
			})
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

		<div class="flex flex-row gap-2 items-center">
			<Button
				color={upvoted ? "primary" : "neutral"}
				on:click={toggleUpvote}
				disabled={data.discussion.locked}
			>
				⬆ {upvotesCount || "Voteaza"}
			</Button>
			<Button
				icon="comment"
				on:click={openCommentDialog}
				disabled={data.discussion.locked || commentDisabled}
			>
				Comenteaza
			</Button>
		</div>
		<div class="divider"/>
		<Stack>

			{#if !comments.length}
				<h3 class="text-xl text-center">Nu exista comentarii</h3>
			{/if}

			<!-- For some reason if we don't use a div wrapper, comments fuck up on webkit -->
			<p class="flex flex-row items-center gap-1 opacity-50">
				Recent <Icon name="arrow_downward"/>
			</p>
			<div>
				{#each comments as comment (comment._id)}
					<div animate:flip>
						<DiscussionCommentBubble
							id={comment._id}
							content={comment.content}
							user={comment.user}
							openCommentDialog={openCommentDialog}
							replyTo={comment.replyTo}
							createdAt={comment._createdAt}
							commentDisabled={commentDisabled || data.discussion.locked}
						/>
					</div>
				{/each}
			</div>

		</Stack>
	</Stack>
</Container>

<Dialog id="comment">
	{#if data.discussion.locked}
		<p>
			<b>Discutia este inchisa</b>
		</p>
	{:else}
		<div>
			{#if replyToComment}
				<p>
					Raspunde lui {replyToComment.user?.full_name}
				</p>
				<div class="chat chat-start">
					<div class="chat-bubble">
						{replyToComment.content}
					</div>
				</div>
			{/if}
			<form on:submit={sendComment} class="join join-horizontal w-full" method="dialog">
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
		</div>
	{/if}
</Dialog>

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
