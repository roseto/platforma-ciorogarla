<script lang="ts">
	import Header from "../components/Header.svelte";
	import Container from "../components/Container.svelte";
	import Stack from "../components/Stack.svelte";
	import Alert from "../components/Alert.svelte";
	import type { PageData } from "./$types";
	import { urlFor } from "$lib/sanity";
	import ListItem from "../components/ListItem.svelte";
	import Button from "../components/Button.svelte";
	import Icon from "../components/Icon.svelte";
	import BackgroundGlow from "../components/BackgroundGlow.svelte";

	export let data: PageData;

	$: user = data.session?.user
</script>

<Header
	title="Ciorogârla Unită"
	noHeading
	actions={[
		{
			icon: !user ? "settings" : undefined,
			img: user?.user_metadata?.avatar_url || undefined,
		}
	]}
/>

<BackgroundGlow />

<Container>
	<Stack>
		<div class="flex items-center gap-2 mt-4 mb-2">
			<img class="w-8 h-8 rounded-full" src="/android-chrome-192x192.png" alt="Ciorogârla Unită" />
			<h1 class="text-xl">Ciorogârla Unită</h1>
		</div>

		<a href="/install">
			<Alert icon="info" outline button>
				Pare ca nu ai instalat aplicația. Apasa aici pentru a o instala.
			</Alert>
		</a>

		<div class="grid grid-cols-2 gap-4">
			<button class="btn btn-ghost flex-col text-primary">
				<Icon name="schedule" />
				Orar 431
			</button>

			<button class="btn btn-ghost flex-col text-primary">
				<Icon name="group" />
				Facebook
			</button>
		</div>

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
			<Button color="secondary" outline fullWidth>
				Toate știrile
				<Icon name="arrow_forward" />
			</Button>
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

		<br />
		<Stack>
			<h2 class="text-sm opacity-50">Proiecte noi</h2>
			{#each data.projects as project}
				<a href={`/volunteering/${project.slug?.current}`}>
					<ListItem
						button
						primary={project.name}
						secondary={project.description}
						img={urlFor(project.image).width(64).height(64).url()}
					/>
				</a>
			{/each}
			<Button color="secondary" outline>
				Toate proiectele
				<Icon name="arrow_forward" />
			</Button>
		</Stack>
	</Stack>
</Container>
