<script lang="ts">
	import type { ColorVariants } from "../lib/theme";

	export let bgColor: ColorVariants = "neutral";
	export let imgSrc: string = "";
	export let title: string = "";
</script>

<div
	class="card shadow {$$props.class || ''}"
	class:bg-primary={bgColor === "primary"}
	class:text-primary-content={bgColor === "primary"}
	class:bg-secondary={bgColor === "secondary"}
	class:text-secondary-content={bgColor === "secondary"}
	class:bg-accent={bgColor === "accent"}
	class:text-accent-content={bgColor === "accent"}
	class:bg-neutral={bgColor === "neutral"}
	class:text-neutral-content={bgColor === "neutral"}
	{...$$restProps}
>
	{#if imgSrc}
		<figure>
			<img class="object-cover h-32 w-full" src={imgSrc} alt={title}/>
		</figure>
	{/if}
	<div class="card-body">
		{#if title}
			<h2 class="card-title">{title}</h2>
		{/if}
		<slot/>
	</div>
</div>
