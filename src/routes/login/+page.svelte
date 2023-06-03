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
		<Button color="neutral" on:click={() => handleOAuthLogin("google")}>
			<div class="w-4 h-4 fill-neutral-content">
				<GoogleIcon />
			</div>
			Conectare cu Google
		</Button>

		<Button color="neutral">
			<div class="w-4 h-4 fill-neutral-content">
				<TwitterIcon />
			</div>
			Conectare cu Twitter
		</Button>

		<Button color="neutral">
			<div class="w-4 h-4 fill-neutral-content">
				<GitHubIcon />
			</div>
			Conectare cu GitHub
		</Button>

		<div class="divider">
			sau
		</div>

		<form>
		</form>
	</Stack>
</Container>
