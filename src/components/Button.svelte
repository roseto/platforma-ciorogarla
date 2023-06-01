<script lang="ts">
	import type { ColorVariants } from '../lib/theme';

	export let ghost: boolean = false;
	export let color: ColorVariants | null = ghost ? null : 'primary';
	export let outline: boolean = false;
</script>

<button
	class="btn rounded-full {$$props.class || ''}"
	class:btn-primary={color === 'primary'}
	class:btn-secondary={color === 'secondary'}
	class:btn-accent={color === 'accent'}
	class:btn-neutral={color === 'neutral'}
	class:btn-outline={outline}
	class:btn-ghost={ghost}
	{...$$restProps}
>
	<slot />
</button>
