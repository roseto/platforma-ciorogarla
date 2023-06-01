<script lang="ts">
	import Header from '../components/Header.svelte';
	import Container from '../components/Container.svelte';
	import { InfoIcon, SettingsIcon, ClockIcon, UsersIcon, ArrowRightIcon } from 'svelte-feather-icons';
	import Stack from '../components/Stack.svelte';
	import Alert from '../components/Alert.svelte';
	import type { PageData } from './$types';
	import { urlFor } from '$lib/sanity';
	import ListItem from '../components/ListItem.svelte';
	import Button from '../components/Button.svelte';
	import BackgroundGlow from '../components/BackgroundGlow.svelte';

	export let data: PageData;
</script>

<Header
	title="Ciorogârla Unită"
	noHeading
	actions={[
		{
			href: '/settings',
			icon: SettingsIcon
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
			<Alert
				icon={InfoIcon}
				outline
				button
			>
				Pare ca nu ai instalat aplicația. Apasa aici pentru a o instala.
			</Alert>
		</a>

		<div class="grid grid-cols-2 gap-4">
			<button class="btn btn-ghost flex-col text-primary">
				<ClockIcon />
				Orar 431
			</button>

			<button class="btn btn-ghost flex-col text-primary">
				<UsersIcon />
				Facebook
			</button>
		</div>

		<Stack>
			<h2 class="text-sm opacity-50">Ultimele știri</h2>
			{#each data.articles as article}
				<a href={`/news/${article.slug?.current}`}>
					<ListItem
						button
						primary={article.title}
						secondary={"#" + article.tags?.join(' #')}
						img={urlFor(article.cover).width(64).height(64).url()}
					/>
				</a>
			{/each}
			<Button color="secondary" outline>
				Toate știrile
				<ArrowRightIcon />
			</Button>
		</Stack>

		<Stack>
			<h2 class="text-sm opacity-50">
				Afaceri noi adăugate
			</h2>
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
			<Button color="secondary" outline>
				Toate afacerile
				<ArrowRightIcon />
			</Button>
		</Stack>

		<Stack>
			<h2 class="text-sm opacity-50">
				Proiecte noi
			</h2>
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
				<ArrowRightIcon />
			</Button>
		</Stack>
	</Stack>
</Container>
