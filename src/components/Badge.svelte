<script lang="ts">
	import type { ColorVariants } from "$lib/theme";

	export let color: ColorVariants = "neutral";
	export let outline = false;
</script>


<div 
	{...$$props}
	class="badge {$$props.class}"
	class:badge-neutral={color === "neutral"}
	class:badge-primary={color === "primary"}
	class:badge-secondary={color === "secondary"}
	class:badge-accent={color === "accent"}
	class:badge-outline={outline}
>
	<slot/>
</div>
