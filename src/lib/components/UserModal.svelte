<script lang="ts">
	import type { User } from "@supabase/supabase-js";
	import ListItem from "./ListItem.svelte";
	import Dialog from "./Dialog.svelte";
	import Stack from "./Stack.svelte";
	import Card from "./Card.svelte";

	export let user: User | undefined;
	export let signOut: () => void;
</script>

<Dialog class="modal {$$props.class || ''}" id="user_modal">
	<Stack>
		<Card class="join join-vertical">
			{#if !user}
				<a href="/login">
					<ListItem
						button
						icon="login"
						primary="Autentificare"
						secondary="Autentifică-te pentru a avea acces la funcționalități suplimentare."
						class="join-item"
					/>
				</a>
			{:else}
				<ListItem
					img={user.user_metadata?.avatar_url}
					imgClass="mask mask-hexagon"
					primary={user.user_metadata?.full_name}
					secondary={user.email}
					on:click={() => signOut()}
				/>
			{/if}

			<div class="divider" />

			<a href="/settings">
				<ListItem button icon="settings" primary="Setări" class="join-item" />
			</a>
		</Card>

		<a href="/terms-and-conditions">
			<ListItem button icon="description" primary="Termeni și condiții" />
		</a>
		<a href="/privacy-policy">
			<ListItem button icon="policy" primary="Politica de confidențialitate" />
		</a>
	</Stack>
</Dialog>
