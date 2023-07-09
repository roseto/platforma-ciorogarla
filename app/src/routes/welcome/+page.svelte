<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import Container from "$lib/components/Container.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import Toggle from "$lib/components/Toggle.svelte";
	import { umamiEnabled } from "$lib/utils/umami";
	import { goto } from "$app/navigation";

	let accepted = false;
	let acceptedAnalytics = true;

	const proceed = () => {
		$umamiEnabled = acceptedAnalytics;
	};
</script>

<div class="py-4 bg-neutral text-neutral-content rounded-b">
	<Container>
		<Stack>
			<span class="text-7xl text-center" role="img"> 👋 </span>
			<h1 class="text-5xl text-center">Bun venit!</h1>
			<Card>
				<p>
					Salut! Inainte de a explora Ciorogarla, trebuie sa va informam ca folosim date pentru
					analitica pentru a observa cum folositi aplicatia. Aceste date sunt complet anonime si nu
					sunt legate la dumneavoastra ca persoana in nici un fel.
				</p>
				<p>
					De asemenea, trebuie sa fiti de acord cu <a
						class="link link-primary link-hover"
						href="/terms-and-conditions">termenii si conditiile</a
					>
					si
					<a class="link link-primary link-hover" href="/privacy-policy"
						>politica de confidentialitate</a
					> pentru a putea folosi aplicatia.
				</p>
			</Card>
			<form method="POST">
				<Stack>
					<ListItem
						primary="Sunt de acord cu folosirea datelor anonime pentru analitica"
						button
						type="button"
						on:click={() => (acceptedAnalytics = !acceptedAnalytics)}
					>
						<Toggle name="analytics" bind:checked={acceptedAnalytics} />
					</ListItem>
					<ListItem
						primary="Am citit si sunt de acord cu termenii si conditiile"
						button
						type="button"
						on:click={() => (accepted = !accepted)}
					>
						<Toggle name="terms" bind:checked={accepted} />
					</ListItem>
					<Button disabled={!accepted} on:click={proceed} fullWidth type="submit">Continua</Button>
				</Stack>
			</form>
		</Stack>
	</Container>
</div>
