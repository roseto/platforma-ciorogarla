<script lang="ts">
	import Icon from "./Icon.svelte";

	export let primary: string = "";
	export let secondary: string = "";
	export let icon: string = "";
	export let iconElement: any = null;
	export let img: string = "";
	export let imgClass: string = "";
	export let button: boolean = false;
</script>

<svelte:element
	this={button ? "button" : "div"}
	on:click
	class="flex flex-row gap-4 items-center p-2 rounded-lg text-left w-full {$$props.class}"
	class:btn-animation={button}
	class:btn-ghost={button}
>
	{#if icon}
		<Icon name={icon} />
	{:else if iconElement}
		<div class="w-6 h-6 fill-current">
			<svelte:component this={iconElement} />
		</div>
	{:else if img}
		<img src={img} alt={primary} width="40" height="40" class="w-10 h-10 rounded-lg {imgClass}" />
	{/if}
	<div class="flex-1 flex flex-col">
		<p>{primary}</p>
		<p class="opacity-50 text-sm line-clamp-2">{secondary}</p>
	</div>

	<slot />
</svelte:element>
