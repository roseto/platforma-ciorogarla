<script lang="ts">
	export let primary: string = '';
	export let secondary: string = '';
	export let icon: any = null;
	export let img: string = '';
	export let button: boolean = false;
</script>

<div class="flex flex-row gap-4 items-center p-2 rounded-lg" class:btn-animation={button} class:btn-ghost={button}>
	{#if icon}
		<svelte:component this={icon} />
	{:else if img}
		<img src={img} alt={primary} class="w-10 h-10 rounded-lg" />
	{/if}
	<div class="flex flex-col">
		<p>{primary}</p>
		<p class="opacity-50 text-sm line-clamp-2">{secondary}</p>
	</div>
</div>
