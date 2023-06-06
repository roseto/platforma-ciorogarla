<script lang="ts">
	import type { User } from "@supabase/supabase-js";
	import ListItem from "./ListItem.svelte";
	import Dialog from "./Dialog.svelte";
	import Stack from "./Stack.svelte";
	import Card from "./Card.svelte";
	import { version } from "$app/environment";

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

		<a href="https://ciorogarlaunita.eu.org/terms-and-conditions" target="_blank">
			<ListItem button icon="description" primary="Termeni și condiții" />
		</a>
		<a href="https://ciorogarlaunita.eu.org/privacy-policy" target="_blank">
			<ListItem button icon="policy" primary="Politica de confidențialitate" />
		</a>
		<p class="text-center opacity-50 text-sm">Ciorogârla Unită {version}</p>
	</Stack>
</Dialog>
