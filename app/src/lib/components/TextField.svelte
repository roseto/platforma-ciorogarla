<script lang="ts">
	import Icon from "./Icon.svelte";

	export let type: string = "text";
	export let icon: string = "";
	export let disabled: boolean = false;
	export let placeholder: string = "";
	export let fullWidth: boolean = false;

	let focus = false;

	export let value: string = "";

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;
	};
</script>

<div class="relative w-full">
	{#if icon}
		<Icon
			name={icon}
			class="absolute top-1/2 left-3 transform -translate-y-1/2 opacity-50 text-neutral-content"
		/>
	{/if}
	<input
		use:typeAction
		class="input input-bordered bg-neutral text-neutral-content placeholder:text-neutral-content placeholder:opacity-50 transition-all focus:input-primary"
		class:pl-12={icon}
		class:input-primary={focus}
		class:w-full={fullWidth}
		on:focus
		on:blur
		bind:value
		{disabled}
		{placeholder}
		{...$$restProps}
	/>
</div>
