<script lang="ts">
	export let name: string;
	export let size: number = 24;
	export let color: string = "currentColor";
</script>

<span
	class="material-symbols-rounded {$$props.class || ''}"
	style="font-size: {size}px; color: {color};"
>
	{name}
</span>
