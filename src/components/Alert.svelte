<script lang="ts">
	export let icon: any;
	export let button: boolean = false;
	export let outline: boolean = false;
</script>

<div 
	class="alert"
	class:btn-animation={button}
	class:btn-ghost={button}
	class:bg-transparent={outline}
	class:border={outline}
	class:border-neutral={outline}
>
	<div class="flex items-center gap-4 text-left">
		{#if icon}
			<svelte:component this={icon} class="w-8 h-8 text-info" />
		{/if}
		<slot />
	</div>
</div>

