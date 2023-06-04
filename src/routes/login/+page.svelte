<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import GoogleIcon from "$lib/resources/icons/google.svelte";
	import TwitterIcon from "$lib/resources/icons/twitter.svelte";
	import GitHubIcon from "$lib/resources/icons/github.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	$: ({supabase} = data);

	let email = "";

	const handleOAuthLogin = (provider: "google" | "github" | "twitter") => {
		supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: window.location.origin + "/login",
			},
		})
	}
</script>



<Header
	title="Conectare"
	back
/>

<Container>
	<Stack>
		<Button on:click={() => handleOAuthLogin("google")}>
			<div class="w-4 h-4 fill-neutral-content">
				<GoogleIcon />
			</div>
			Conectare cu Google
		</Button>

		<Button>
			<div class="w-4 h-4 fill-neutral-content">
				<TwitterIcon />
			</div>
			Conectare cu Twitter
		</Button>

		<Button>
			<div class="w-4 h-4 fill-neutral-content">
				<GitHubIcon />
			</div>
			Conectare cu GitHub
		</Button>

		<div class="divider py-8">
			sau
		</div>

		<form class="flex flex-col space-y-2">
			<input type="email" class="input input-bordered w-full" bind:value={email} placeholder="Adresa de email" />

			<Button
				color="neutral"
				type="submit"
				fullWidth
			>
				Conectare
			</Button>
		</form>
	</Stack>
</Container>

<dialog id="email_confirm_modal" class="modal">
	<div class="modal-box">
		<p class="text-lg font-bold">Verificare email</p>
		<p class="text-sm">Un email de verificare a fost trimis la adresa <span id="email_confirm_modal_email"></span>.</p>
		<p class="text-sm">Verifică-ți email-ul și apasă pe link-ul din email pentru a-ți confirma adresa de email.</p>
		<div class="modal-action">
			<button class="btn btn-primary" onclick="document.getElementById('email_confirm_modal').close()">Închide</button>
		</div>
	</div>
</dialog>
