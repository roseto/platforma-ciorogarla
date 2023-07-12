<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import GoogleLoginIcon from "$lib/resources/google-login.svelte";
	import TwitterLoginIcon from "$lib/resources/twitter-login.svelte";
	import GitHubIcon from "$lib/resources/icons/github.svelte";
	import type { PageData } from "./$types";
	import { setToast } from "$lib/utils/toast";
	import DiscordLoginIcon from "$lib/resources/discord-login.svelte";
	import SlackLoginIcon from "$lib/resources/slack-login.svelte";

	export let data: PageData;

	$: ({ supabase } = data);

	const handleOAuthLogin = (provider: "google" | "github" | "twitter" | "discord" | "slack") => {
		supabase.auth
			.signInWithOAuth({
				provider,
				options: {
					redirectTo: window.location.origin + "/login",
				},
			})
			.catch((error) => {
				console.error(error);

				setToast({
					type: "error",
					content: "A	apărut o eroare. Vă rugăm să încercați din nou.",
				});
			});
	};
</script>

<Header title="Conectare" back />

<Container>
	<Stack>
		<Button outline color="neutral" on:click={() => handleOAuthLogin("google")}>
			<GoogleLoginIcon />
			Conectare cu Google
		</Button>

		<Button outline color="neutral" on:click={() => handleOAuthLogin("twitter")}>
			<div class="w-6 h-6 flex justify-center items-center">
				<TwitterLoginIcon />
			</div>
			Conectare cu Twitter
		</Button>

		<Button outline color="neutral" class="fill-base-content hover:fill-base-300" on:click={() => handleOAuthLogin("github")}>
			<div class="w-6 h-6 flex justify-center items-center">
				<GitHubIcon />
			</div>
			Conectare cu GitHub
		</Button>

		<Button outline color="neutral" on:click={() => handleOAuthLogin("discord")}>
			<div class="w-6 h-6 flex justify-center items-center">
				<DiscordLoginIcon />
			</div>
			Conectare cu Discord
		</Button>

		<Button outline color="neutral" on:click={() => handleOAuthLogin("slack")}>
			<div class="w-12 h-12 -m-2 flex justify-center items-center">
				<SlackLoginIcon />
			</div>
			Conectare cu Slack
		</Button>
	</Stack>
</Container>
