<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import ListItem from "$lib/components/ListItem.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import { urlFor } from "$lib/utils/sanity";
	import type { PageData } from "./$types";

	export let data: PageData;

</script>

<Header title="Bun venit în Ciorogarla" back />

<Container>
	<Stack>
		<h2 class="font-bold text-xl mt-8">
			Descoperă Ciorogarla, Ilfov: Oază Liniștită în Apropierea Bucureștiului
		</h2>

		<p>
			Evadează în Ciorogarla, un refugiu liniștit la marginea Bucureștiului. 
			Îmbrățișează amestecul de farmec rural și modernitate în acest oraș pitoresc. 
			Descoperă o pânză de istorie, natură și ospitalitate caldă în fiecare colț. 
			Bine ai venit în Ciorogarla, unde liniștea se întâlnește cu farmecul vibrant.
		</p>

		<img 
			src="/welcome/samurcasesti.jpg"
			alt="Mănăstirea Samurcășești"
			class="rounded-lg w-full mt-4 object-cover h-32 md:h-64"
		/>

		<hr 
			class="my-8 border-secondary"
		/>

		<h2 class="text-4xl font-bold">
			Afaceri
		</h2>
		<p>
			În inima Ciorogarlei, afaceri pline de viață țes o pânză de arome, meșteșug și comunitate. 
			De la cafenele fermecătoare la magazine meșteșugărești, fiecare local adaugă la caracterul unic al orașului. 
			Pătrunde în farmecul local, unde fiecare vitrină spune o poveste de pasiune și devotament. 
			Explorează ofertele diverse care fac din Ciorogarla o destinație în care comerțul și comunitatea se împletesc armonios, 
			creând o atmosferă primitoare atât pentru locuitori, cât și pentru vizitatori.
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

		<hr 
			class="my-8 border-secondary"
		/>

		<h2 class="font-bold text-xl">
			Educație în Ciorogarla: Învățământ de Calitate într-un Mediu Primitor
		</h2>

		<p>
			Ciorogarla se mândrește cu instituții de învățământ de calibru, punând accentul pe dezvoltarea armonioasă a comunității. 
			<b>Liceul Tehnologic "Pamfil Seicaru"</b> oferă oportunități educaționale deosebite, orientate spre tehnologie și inovație, 
			pregătind elevii pentru provocările secolului XXI.
		</p>

		<a
			href="https://ltpsciorogarla.ro/"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img
				src="https://ltpsciorogarla.ro/wp-content/uploads/2021/12/P1-SLIDER.jpg"
				alt="Liceul Tehnologic Pamfil Seicaru"
				class="rounded-lg w-full mt-4 object-cover h-32 md:h-64"
			/>
		</a>

		<p>
			<b>Școala nr. 1 Ciorogarla</b> reprezintă un pilon esențial în formarea tinerei generații, cultivând cunoștințe solide și promovând valori sociale. 
			Aici, educația devine o călătorie captivantă, într-un mediu prietenos și motivant, susținând excelența academică și dezvoltarea personală a elevilor.
		</p>
		
		<p>
			În Ciorogarla, educația este privită ca un motor al progresului, iar aceste instituții reprezintă faruri 
			luminoase care ghidează tinerii către un viitor promițător.
		</p>

		<hr 
			class="my-8 border-secondary"
		/>
	</Stack>
</Container>