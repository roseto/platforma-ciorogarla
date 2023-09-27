<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import Container from "$lib/components/Container.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import Alert from "$lib/components/Alert.svelte";
	import type { PageData } from "./$types";
	import { urlFor } from "$lib/utils/sanity";
	import ListItem from "$lib/components/ListItem.svelte";
	import Button from "$lib/components/Button.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import BackgroundGlow from "$lib/components/BackgroundGlow.svelte";
	import UserModal from "$lib/components/UserModal.svelte";
	import { getModal } from "$lib/utils/modal";
	import { isInstalled } from "$lib/utils/device";
	import TextField from "$lib/components/TextField.svelte";
	import { browser } from "$app/environment";
	import Card from "$lib/components/Card.svelte";

	export let data: PageData;

	$: ({ session, supabase } = data);
</script>

<UserModal user={session?.user} signOut={supabase.auth.signOut} />

<Header
	title="Platforma Ciorogârla"
	noHeading
	actions={[
		{
			onClick: () => getModal("user_modal")?.showModal(),
			icon: !session?.user ? "settings" : undefined,
			img: session?.user?.user_metadata?.avatar_url || undefined,
		},
	]}
/>

<BackgroundGlow />

<Container>
	<Stack>
		<Stack class="md:py-24">
			<h1 class="text-center text-6xl sm:text-7xl mb-2 pt-16">
				Ciorogârla
			</h1>
			<form action="/search" method="get">
				<TextField
					name="query"
					placeholder="Caută orice..."
					fullWidth
					icon="auto_awesome"
					autocomplete="off"
				/>
				<Button class="mt-2" type="submit" icon="search" fullWidth>Caută</Button>
			</form>
			<div class="grid grid-cols-2 gap-4">
				<a
					href="https://431.ciorogarla.eu.org"
					target="_blank"
					class="btn btn-ghost flex-col text-primary"
					>
					<Icon name="schedule" />
					Orar 431
				</a>

				<a
					href="https://facebook.com/groups/ciorogarla"
					target="_blank"
					class="btn btn-ghost flex-col text-primary"
					>
					<Icon name="group" />
					Facebook
				</a>
			</div>
		</Stack>

		{#if browser && !isInstalled()}
			<a href="/install">
				<Alert icon="download" outline button>
					Pare ca nu ai instalat aplicația. Apasa aici pentru a o instala.
				</Alert>
			</a>
		{/if}

		<Card>
			<a
				href="https://chat.whatsapp.com/B5dxooCfG9sCMMd7kea7m5"
				target="_blank"
				rel="noreferrer noopener"
			>
			<ListItem
				button
				icon="info"
				primary="Am mutat sectiunea de Voluntariat"
				secondary="Oportunitatile de voluntariat au fost mutate pe un grup de WhatsApp. Click aici pentru a accesa."
			/>
			</a>
		</Card>

		<br />

		<Stack>
			<h2 class="text-sm opacity-50">Ultimele știri</h2>
			{#each data.articles as article}
				<a href={`/news/${article.slug?.current}`}>
					<ListItem
						button
						primary={article.title}
						secondary={"#" + article.tags?.join(" #")}
						img={urlFor(article.cover).width(64).height(64).url()}
					/>
				</a>
			{/each}
			<a href="/news">
				<Button color="secondary" outline fullWidth>
					Toate știrile
					<Icon name="arrow_forward" />
				</Button>
			</a>
		</Stack>

		<br />
		<Stack>
			<h2 class="text-sm opacity-50">Afaceri noi adăugate</h2>
			{#each data.businesses as business}
				<a href={`/businesses/${business.slug?.current}`}>
					<ListItem
						button
						primary={business.name}
						secondary={business.description}
						img={urlFor(business.logo).width(64).height(64).url()}
					/>
				</a>
			{/each}
			<a href="/businesses">
				<Button color="secondary" outline fullWidth>
					Toate afacerile
					<Icon name="arrow_forward" />
				</Button>
			</a>
		</Stack>
	</Stack>
</Container>
