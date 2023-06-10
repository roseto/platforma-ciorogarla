<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";

	export let deviceVendor: string | undefined;
	export let deviceModel: string | undefined;
	export let deviceOs: string | undefined;
	export let browserName: string | undefined;
	export let mobile: boolean;
</script>


<div class="prose">
	<!-- iOS with Safari -->
	{#if browserName === "Mobile Safari" && deviceVendor === "Apple"}
		<ol> 
			<li>Apasă pe butonul <Icon name="ios_share" class="m-0"/> din partea de jos a ecranului.</li> 
			<li>Alege "Adaugă pe ecranul principal".</li> 
			<li>Apasă pe butonul "Adaugă".</li> 
		</ol>
	{:else if browserName !== "Mobile Safari" && deviceVendor === "Apple"}
		<ol>
			<li>Deschide <a href="https://ciorogarla.eu.org">ciorogarla.eu.org</a> in Safari.</li>
			<li>Apasa pe butonul <Icon name="ios_share" class="m-0"/> din partea de jos a ecranului.</li>
			<li>Alege "Adauga pe ecranul principal".</li>
			<li>Apasa pe butonul "Adauga".</li>
		</ol>
	{:else if deviceOs === "Android"}
		<ol>
			<li>Apasa pe butonul <Icon name="more_vert" class="m-0"/> din partea de sus a ecranului.</li>
			<li>Alege "Adauga pe ecranul principal".</li>
			<li>Apasa pe butonul "Adauga".</li>
		</ol>
	{:else if !mobile && browserName === "Chrome"}
		<ol>
			<li>Apasa pe butonul <Icon name="more_vert" class="m-0"/> din partea de sus a ecranului.</li>
			<li>Alege "Instaleaza Platforma Ciorogârla".</li>
			<li>Apasa pe butonul "Instaleaza".</li>
		</ol>
	{:else}
		<p>Ne pare rau, dar nu avem instructiuni pentru dispozitivul tau.</p>
		<p>Poti cauta pe Google cum se instaleaza aplicatii web progresive pe {deviceVendor} {deviceModel}.</p>
	{/if}
</div>
