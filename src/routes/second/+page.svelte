<script lang="ts">
	import type { PageData } from "./$types";
	import Container from "../../components/Container.svelte";

	export let data: PageData;
</script>

<Container>
	<h1>{data.business.name}</h1>
</Container>
