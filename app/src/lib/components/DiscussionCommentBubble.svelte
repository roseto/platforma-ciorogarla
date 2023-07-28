<script lang="ts">
	import type { UserProfile } from "$lib/types/UserProfile";
	import Button from "./Button.svelte";
	import Card from "./Card.svelte";

	export let id: string;
	export let user: UserProfile | undefined = undefined;
	export let content: string = "";
	export let createdAt: string;
	export let openCommentDialog: (replyTo?: string) => void;
	export let replyTo: { _id: string, content: string } | undefined = undefined;
	export let commentDisabled: boolean = false;
	export let upvotes: number = 0;

	export let upvotedByUser: boolean = false;

	$: upvotesCount = upvotes + (upvotedByUser ? 1 : 0);

	const currentDate = new Date();
	const isToday = new Date(createdAt).getDate() === currentDate.getDate() &&
		new Date(createdAt).getMonth() === currentDate.getMonth() &&
		new Date(createdAt).getFullYear() === currentDate.getFullYear();
	const isYesterday = new Date(createdAt).getDate() === currentDate.getDate() - 1 &&
		new Date(createdAt).getMonth() === currentDate.getMonth() &&
		new Date(createdAt).getFullYear() === currentDate.getFullYear();
	const isInLastWeek = new Date(createdAt).getTime() > currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
	const isThisYear = new Date(createdAt).getFullYear() === currentDate.getFullYear();

	const scrollToAnchor = (anchor: string) => {
		const element = document.querySelector(anchor);
		element?.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "center",
		})
		
		setTimeout(() => {
			element?.classList.add("animate-shake");

			setTimeout(() => {
				element?.classList.remove("animate-shake");
			}, 500);
		}, 500);

	}
</script>


<div class="chat chat-start transition-colors" id={id}>
	<div class="chat-image avatar">
		<div class="w-10 rounded-full">
			<img 
				src={user?.avatar_url}
				alt={user?.full_name + " avatar"}
			/>
		</div>
	</div>
	<div class="chat-header">
		{user?.full_name}
	</div>
	<div class="flex flex-row items-center flex-wrap">
		<div class="chat-bubble">
			{#if replyTo}
				<div 
					on:keydown={(e) => e.key === "Enter" && scrollToAnchor("#" + replyTo?._id)}
					on:click={() => scrollToAnchor("#" + replyTo?._id)} 
				>
					<Card class="cursor-pointer">
						<p class="opacity-50 text-sm">
							{user?.full_name}
						</p>
						{replyTo.content}
					</Card>
				</div>
			{/if}
			{content}
		</div>
		<div 
			class="flex-nowrap bg-neutral rounded-full join join-horizontal m-1"
			class:opacity-50={commentDisabled}
		>
			<Button disabled={commentDisabled} color="neutral" class="join-item btn-sm" icon="reply" on:click={() => openCommentDialog(id)}/>
			<Button 
				color={upvotedByUser ? "primary" : "neutral"}
				disabled={commentDisabled} 
				class="join-item btn-sm" 
				icon="arrow_upward" 
				on:click={() => openCommentDialog(id)}
			>
				{upvotesCount > 0 ? upvotesCount : ""}
			</Button>
		</div>
	</div>
	<div class="chat-footer">
		{#if isToday}
			{new Date(createdAt).
				toLocaleString("ro-RO", {
					hour: "numeric",
					minute: "numeric",
				})
			}
		{:else if isYesterday}
			Ieri la {
				new Date(createdAt).
					toLocaleString("ro-RO", {
						hour: "numeric",
						minute: "numeric",
					})
			}
		{:else if isInLastWeek}
			{new Date(createdAt).
				toLocaleString("ro-RO", {
					weekday: "long",
					hour: "numeric",
					minute: "numeric",
				})
			}
		{:else if isThisYear}
			{new Date(createdAt).
				toLocaleString("ro-RO", {
					day: "numeric",
					month: "long",
					hour: "numeric",
					minute: "numeric",
				})
			}
		{:else}
			{new Date(createdAt).
				toLocaleString("ro-RO", {
					day: "numeric",
					month: "long",
					year: "numeric",
					hour: "numeric",
					minute: "numeric",
				})
			}
		{/if}
	</div>
</div>
