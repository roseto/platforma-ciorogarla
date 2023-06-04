<script lang="ts">
	export let type: string = "text";
	export let disabled: boolean = false;
	export let placeholder: string = "";
	export let fullWidth: boolean = false;

	let focus = false;
</script>

<input
	class="input input-bordered transition-all"
	class:input-primary={focus}
	class:w-full={fullWidth}
	on:focus={() => (focus = true)}
	on:blur={() => (focus = false)}
	{type}
	{disabled}
	{placeholder}
	{...$$restProps}
/>
