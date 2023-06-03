<script lang="ts">
	import type { ColorVariants } from "$lib/utils/theme";
	import Icon from "./Icon.svelte";

	export let ghost: boolean = false;
	export let color: ColorVariants | null = ghost ? null : "primary";
	export let outline: boolean = false;
	export let fullWidth: boolean = false;
	export let icon: string = "";
</script>

<button
	class="btn rounded-full {$$props.class || ''}"
	class:btn-primary={color === "primary"}
	class:btn-secondary={color === "secondary"}
	class:btn-accent={color === "accent"}
	class:btn-neutral={color === "neutral"}
	class:btn-outline={outline}
	class:btn-ghost={ghost}
	class:w-full={fullWidth}
	{...$$restProps}
>
	{#if icon}
		<Icon name={icon} />
	{/if}
	<slot />
</button>
