<script lang="ts">
	import Alert from "$lib/components/Alert.svelte";
	import Badge from "$lib/components/Badge.svelte";
	import Card from "$lib/components/Card.svelte";
	import Container from "$lib/components/Container.svelte";
	import Header from "$lib/components/Header.svelte";
	import Stack from "$lib/components/Stack.svelte";
	import { urlFor } from "$lib/utils/sanity";
	import { notypecheck } from "$lib/utils/typecheck";
	import type { PageData } from "./$types";

	export let data: PageData;

	const calculateDays = (start: string, end: string) => {
		const startDate = new Date(start);
		const endDate = new Date(end);

		const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
		const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		return diffDays;
	};
</script>

<Header back title="Proiecte" />

<Container>
	<Stack>
		{#if data.projects.length < 1}
			<Alert icon="info">Inca nu avem proiecte disponibile. Verifica mai tarziu.</Alert>
		{/if}
		{#each data.projects as project}
			<a href="/volunteering/{project.slug?.current}">
				<Card title={project.name} img={urlFor(project.image).url()}>
					<p class="opacity-50">{project.topic}</p>
					<div class="flex flex-row gap-1">
						<Badge color="accent" outline>
							{notypecheck(project.country).name}
						</Badge>
						<Badge color="accent" outline>
							{#if project.period?.fromDate && project.period?.toDate}
								{calculateDays(project.period?.fromDate, project.period?.toDate)} zile
							{/if}
						</Badge>
					</div>
				</Card>
			</a>
		{/each}
	</Stack>
</Container>
