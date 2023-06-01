<script lang="ts">
	export let primary: string;
	export let secondary: string = "";
	export let icon: string = "";
	export let img: string = "";
	export let button: boolean = false;
</script>

<div
	class="flex flex-col text-left"
	class:btn-animation={button}
>
	<p>{primary}</p>
	<p class="opacity-50 text-sm line-clamp-2">{secondary}</p>
</div>
