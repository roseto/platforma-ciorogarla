<script lang="ts">
	import type { ColorVariants } from "../lib/theme";

	export let color: ColorVariants = "primary";
	export let outline: boolean = false;
</script>

<button
	class="btn rounded-full px-8 py-4 {$$props.class || ''}"
	class:btn-primary={color === "primary"}
	class:btn-secondary={color === "secondary"}
	class:btn-accent={color === "accent"}
	class:btn-neutral={color === "neutral"}
	class:btn-outline={outline}
	{...$$restProps}
>
	<slot/>
</button>
