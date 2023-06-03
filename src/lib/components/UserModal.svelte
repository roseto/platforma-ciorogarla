<script lang="ts">
	import type { User } from "@supabase/supabase-js";
	import ListItem from "./ListItem.svelte";

	export let user: User | null;
	export let logout: () => void;
</script>

<dialog class="modal {$$props.class || ''}" id="user_modal">
	<div class="modal-box flex flex-col space-y-2 text-base-content">
		<div class="p-2 bg-neutral text-neutral-content rounded join join-vertical">
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
					on:click={logout}
				/>
			{/if}

			<div class="divider" />

			<a href="/settings">
				<ListItem button icon="settings" primary="Setări" class="join-item" />
			</a>
		</div>

		<a href="https://ciorogarlaunita.eu.org/terms-and-conditions" target="_blank">
			<ListItem button icon="description" primary="Termeni și condiții" />
		</a>
		<a href="https://ciorogarlaunita.eu.org/privacy-policy" target="_blank">
			<ListItem button icon="policy" primary="Politica de confidențialitate" />
		</a>
		<p class="text-center opacity-50 text-sm">Ciorogârla Unită</p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
