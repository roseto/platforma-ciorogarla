<script lang="ts">
	import Badge from "$lib/components/Badge.svelte";
	import Alert from "$lib/components/Alert.svelte";
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import ContactList from "$lib/components/ContactList.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import MapsEmbed from "$lib/components/MapsEmbed.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import { projectTypes } from "$lib/utils/projectTypes";
	import { urlFor } from "$lib/utils/sanity";
	import { notypecheck } from "$lib/utils/typecheck";
	import type { PageData } from "./$types";

	export let data: PageData;

	const windowWidth = globalThis.innerWidth;
</script>

<Header
	title={data.project.name || "Proiect"}
	back
	themeColor={notypecheck(data.project?.image)?.asset?.metadata?.palette?.dominant.background}
	color={notypecheck(data.project?.image)?.asset?.metadata?.palette?.dominant.foreground}
	noHeading
/>

<img
	src={urlFor(data.project.image).width(windowWidth * 2).height(256).url()}
	alt={data.project.name}
	width={windowWidth}
	height={128}
	class="rounded-b"
/>

<Container>
	<Stack>
		<h1 class="text-5xl mt-2">{data.project.name}</h1>
		<p class="text-sm opacity-50">{data.project.topic}</p>

		<p class="">{data.project.description}</p>

		<Button icon="email">
			Contact
		</Button>

		<div class="flex flex-row gap-1">
			<Badge color="secondary">
				{notypecheck(data.project.country).name}
			</Badge>
			<Badge color="secondary">
				{projectTypes.get(data.project.type || "")?.name}
			</Badge>
		</div>

		<a href={notypecheck(data.project.organisation).contact.website} target="_blank" rel="noopener noreferrer">
			<Card>
				Facut posibil cu {notypecheck(data.project.organisation).name}
			</Card>
		</a>

		<h2 class="text-2xl">Tari participante</h2>
		<div class="flex flex-row gap-1">
			{#each notypecheck(data.project.participatingCountries) || [] as country}
				<Badge color="secondary">
					{country.name}
				</Badge>
			{/each}
		</div>

		<Card bgColor="accent">
			<ListItem
				icon="flight_takeoff"
				primary="Plecare"
				secondary={new Date(data.project.period?.fromDate || "").toLocaleDateString("ro")}
			/>
			<ListItem
				icon="flight_land"
				primary="Intoarcere"
				secondary={new Date(data.project.period?.toDate || "").toLocaleDateString("ro")}
			/>
		</Card>

		<MapsEmbed
			address={data.project.location?.address}
			plusCode={data.project.location?.plus}
			streetViewLocation={data.project.location?.locationStreetview}
		/>

		{#if data.project.infopack}
			<ListItem
				primary="Infopack"
				icon="description"
				secondary="Descarca informatiile despre acest proiect"
			/>
		{/if}
		{#if data.project.infoLink}
			<ListItem
				primary="Link"
				icon="link"
				secondary="Afla mai multe informatii despre acest proiect"
			/>
		{/if}

		<ContactList
			email={notypecheck(data.project.organisation).contact.email}
			phone={notypecheck(data.project.organisation).contact.phone}
			website={notypecheck(data.project.organisation).contact.website}
			facebook={notypecheck(data.project.organisation).contact.facebook}
			instagram={notypecheck(data.project.organisation).contact.instagram}
		/>

		<Alert icon="info">
			Nu putem urmări disponibilitatea locurilor libere pentru acest proiect, 
			așa că te rugăm să contactezi organizatorul pentru a afla mai multe detalii.
		</Alert>
	</Stack>
</Container>
