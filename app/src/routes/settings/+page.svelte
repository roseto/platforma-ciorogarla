<script lang="ts">
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import Toggle from "$lib/components/Toggle.svelte";
	import type { PageData } from "./$types";
	import Card from "$lib/components/Card.svelte";

	export let data: PageData;

	$: ({ session, supabase } = data);
</script>

<Header title="Setari" back />

<Container>
	<Stack>
		<Card class="join join-vertical">
			{#if !session?.user}
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
					img={session?.user.user_metadata?.avatar_url}
					primary={session?.user.user_metadata?.full_name}
					secondary={session?.user.email}
					class="join-item"
					imgClass="!rounded-full"
				/>
				<ListItem
					icon="logout"
					primary="Deconectare"
					button
					class="join-item"
					on:click={() => supabase.auth.signOut()}
				/>
			{/if}
		</Card>

		<div class="divider" />

		<a href="/terms-and-conditions">
			<ListItem button icon="description" primary="Termeni și condiții" />
		</a>
		<a href="/privacy-policy">
			<ListItem button icon="policy" primary="Politica de confidențialitate" />
		</a>
	</Stack>
</Container>
