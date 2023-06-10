<script lang="ts">
	export let type: string = "text";
	export let disabled: boolean = false;
	export let placeholder: string = "";
	export let fullWidth: boolean = false;

	let focus = false;

	export let value: string = "";

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;
	};
</script>

<input
	use:typeAction
	class="input input-bordered transition-all focus:input-primary"
	class:input-primary={focus}
	class:w-full={fullWidth}
	on:focus
	on:blur
	bind:value
	{disabled}
	{placeholder}
	{...$$restProps}
/>
