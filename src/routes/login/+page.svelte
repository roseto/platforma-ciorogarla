<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import GoogleIcon from "$lib/resources/icons/google.svelte";
	import TwitterIcon from "$lib/resources/icons/twitter.svelte";
	import GitHubIcon from "$lib/resources/icons/github.svelte";
	import type { PageData } from "./$types";
	import TextField from "$lib/components/TextField.svelte";
	import { openModal } from "$lib/utils/modal";
	import Dialog from "$lib/components/Dialog.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import { setToast } from "$lib/utils/toast";

	export let data: PageData;

	$: ({ supabase } = data);

	let email = "";

	const handleOAuthLogin = (provider: "google" | "github" | "twitter") => {
		supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: window.location.origin + "/login",
			},
		}).catch((error) => {
			console.error(error);

			setToast({
				type: "error",
				content: "A	apărut o eroare. Vă rugăm să încercați din nou.",
			});
		});
	};

	const handleEmailLogin = () => {
		supabase.auth
			.signInWithOtp({
				email,
				options: {
					emailRedirectTo: window.location.origin + "/login",
				},
			})
			.catch((error) => {
				console.error(error);

				setToast({
					type: "error",
					content: "A	apărut o eroare. Vă rugăm să încercați din nou.",
				});
			})
			.then(() => {
				openModal("email_confirm_modal");
			});
	};
</script>

<Header title="Conectare" back />

<Container>
	<Stack>
		<Button on:click={() => handleOAuthLogin("google")}>
			<div class="w-4 h-4 fill-primary-content">
				<GoogleIcon />
			</div>
			Conectare cu Google
		</Button>

		<Button on:click={() => handleOAuthLogin("twitter")}>
			<div class="w-4 h-4 fill-primary-content">
				<TwitterIcon />
			</div>
			Conectare cu Twitter
		</Button>

		<Button on:click={() => handleOAuthLogin("github")}>
			<div class="w-4 h-4 fill-primary-content">
				<GitHubIcon />
			</div>
			Conectare cu GitHub
		</Button>

		<div class="divider py-8">sau</div>

		<form class="flex flex-col space-y-2" on:submit={handleEmailLogin}>
			<TextField type="email" placeholder="Adresa de email" bind:value={email} fullWidth />

			<Button color="neutral" type="submit" fullWidth>Conectare</Button>
		</form>
		<p class="text-center text-sm">
			Powered by <a
				class="link"
				target="_blank"
				rel="noopener noreferrer"
				href="https://supabase.io">Supabase <Icon name="bolt" size={12} /></a
			>
		</p>
	</Stack>
</Container>

<Dialog id="email_confirm_modal" class="modal">
	<p class="text-lg font-bold">Verificare email</p>
	<p class="text-sm">
		Un email de verificare a fost trimis la adresa <span class="font-bold">{email}</span>.
	</p>
	<p class="text-sm">
		Verifică-ți email-ul și apasă pe link-ul din email pentru a-ți confirma adresa de email.
	</p>

	<Button slot="actions" class="btn btn-primary">Închide</Button>
</Dialog>
