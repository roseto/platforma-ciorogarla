<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import { urlFor } from "$lib/utils/sanity";
	import type { PageData } from "./$types";

	export let data: PageData;

</script>

<Header title="Bun venit" back />

<Container>
	<p>
		Ciorogârla este o comună în județul Ilfov, Muntenia, România, formată din satele Ciorogârla și Dârvari.
	</p>

	<br/>

	<p>
		Vă invităm să descoperiți comuna Ciorogârla prin intermediul aplicației noastre.
	</p>

	<h2 class="text-4xl font-bold mt-4">
		Afaceri
	</h2>
	<p>
		Descoperiți afacerile din Ciorogârla.
	</p>

	<Card>
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
	</Card>
</Container>