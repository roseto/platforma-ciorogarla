<script lang="ts">
	import { businessTypes } from "$lib/utils/businessTypes";
	import { urlFor } from "$lib/utils/sanity";
	import Badge from "$lib/components/Badge.svelte";
	import Container from "$lib/components/Container.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import Header from "$lib/components/Header.svelte";
	import type { PageData } from "./$types";
	import Button from "$lib/components/Button.svelte";
	import { getMapsURL } from "$lib/utils/maps";
	import Facebook from "$lib/resources/icons/facebook.svelte";
	import Instagram from "$lib/resources/icons/instagram.svelte";
	import Card from "$lib/components/Card.svelte";
	import MapsEmbed from "$lib/components/MapsEmbed.svelte";
	import Alert from "$lib/components/Alert.svelte";
	import ContactList from "$lib/components/ContactList.svelte";

	export let data: PageData;

	$: ({ business, isStandalone } = data);

	const windowWidth = globalThis.innerWidth;
</script>

<Header
	back={!isStandalone}
	title={business.name || "Afacere"}
	noHeading
	favicon={isStandalone && business.logo
		? urlFor(business.logo).width(64).height(64).url()
		: undefined}
	themeColor={business?.cover?.asset?.metadata?.palette?.dominant.background}
	color={business?.cover?.asset?.metadata?.palette?.dominant.foreground}
/>

<img
	src={urlFor(business.cover).width(windowWidth).height(128).blur(32).url() || ""}
	alt={business.name || "Afacere"}
	class="w-full h-32 object-cover rounded-b"
/>

<Container>
	<img
		src={urlFor(business.logo).width(192).height(192).url() || ""}
		alt={business.name || "Afacere"}
		class="w-32 h-32 object-cover rounded -mt-16"
	/>

	<Stack>
		<h1 class="text-4xl">{business.name}</h1>

		<Badge icon={businessTypes.get(business.type || "")?.icon} outline color="accent">
			{businessTypes.get(business.type || "")?.name}
		</Badge>
		{#if business.location}
			<a href={getMapsURL(business.location.plus || "")} target="_blank">
				<Button color="primary" fullWidth icon="location_on">Arata locatia</Button>
			</a>
		{/if}
		{#if business.contact?.website && !business.contact.website.endsWith(".ciorogarla.eu.org")}
			<a href={business.contact.website} target="_blank" rel="noopener noreferrer">
				<Button color="secondary" fullWidth icon="link">Viziteaza site-ul</Button>
			</a>
		{/if}

		<div class="flex flex-row gap-2 justify-center items-center">
			{#if business.contact?.facebook}
				<div class="w-8 h-8 btn btn-ghost btn-circle fill-current">
					<Facebook />
				</div>
			{/if}

			{#if business.contact?.instagram}
				<a href={business.contact.instagram} class="w-8 h-8 btn btn-ghost btn-circle fill-current">
					<Instagram />
				</a>
			{/if}
		</div>

		<Card>
			{business.description}
		</Card>

		<div class="flex flex-row gap-2">
			{#if business.pricesLink}
				<a href={business.pricesLink} target="_blank" rel="noopener noreferrer">
					<Badge large color="primary" icon="attach_money">Vezi lista de preturi</Badge>
				</a>
			{/if}
			{#if business.prices}
				<Badge large outline color="secondary">
					Preturi: {business.prices}
				</Badge>
			{/if}
		</div>

		{#if business.photos}
			<div class="carousel rounded">
				{#each business.photos as photo}
					<img
						src={urlFor(photo).maxHeight(512).maxWidth(1024).url() || ""}
						alt={business.name || "Afacere"}
						class="carousel-item max-h-96"
					/>
				{/each}
			</div>
		{/if}

		{#if business.location}
			<MapsEmbed
				streetViewLocation={business.location.locationStreetview}
				plusCode={business.location.plus}
				address={business.location.address}
			/>
		{/if}

		<ContactList
			website={business.contact?.website}
			phone={business.contact?.phone}
			email={business.contact?.email}
			facebook={business.contact?.facebook}
			instagram={business.contact?.instagram}
		/>

		{#if !isStandalone}
			<Alert icon="info">
				Facem tot posibilul să ținem detaliile despre această afacere actualizate. Dacă observi că
				ceva nu este corect, te rugăm să ne anunți la adresa de email
				<a href="mailto:afacere@ciorogarlaunita.eu.org" target="_blank" class="link">
					afacere@ciorogarlaunita.eu.org
				</a>
			</Alert>
		{/if}
	</Stack>
</Container>
