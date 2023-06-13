<script lang="ts">
	import Icon from "./Icon.svelte";

	export let icon: string = "";
	export let button: boolean = false;
	export let outline: boolean = false;
</script>

<div
	class="alert"
	class:btn-animation={button}
	class:btn-ghost={button}
	class:bg-transparent={outline}
	class:border={outline}
	class:border-neutral={outline}
>
	<div class="flex justify-center gap-4 text-left">
		{#if icon}
			<Icon name={icon} class="!text-accent" />
		{/if}
		<p>
			<slot />
		</p>
	</div>
</div>
