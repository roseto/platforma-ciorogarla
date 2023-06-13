<script lang="ts">
	import type { ColorVariants } from "$lib/utils/theme";
	import Icon from "./Icon.svelte";

	export let color: ColorVariants = "neutral";
	export let outline = false;
	export let icon: string = "";
	export let button = false;
	export let large = false;
</script>

<svelte:element
	this={button ? "button" : "div"}
	{...$$props}
	class="badge {$$props.class}"
	class:btn-animation={button}
	class:badge-neutral={color === "neutral"}
	class:badge-primary={color === "primary"}
	class:badge-secondary={color === "secondary"}
	class:badge-accent={color === "accent"}
	class:badge-outline={outline}
	class:badge-lg={large}
	on:click
>
	{#if icon}
		<Icon name={icon} size={16} class="mr-1" />
	{/if}
	<slot />
</svelte:element>
