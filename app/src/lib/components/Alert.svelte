<script lang="ts">
	import Icon from "./Icon.svelte";

	export let icon: string = "";
	export let button: boolean = false;
	export let outline: boolean = false;
	export let error: boolean = false;
</script>

<div
	class="alert"
	class:alert-error={error}
	class:alert-info={!error}
	class:btn-animation={button}
	class:btn-ghost={button}
	class:bg-transparent={outline}
	class:border={outline}
	class:border-neutral={outline}
	class:text-neutral-content={outline}
>
	<div class="flex justify-center gap-4 text-left">
		{#if icon}
			<Icon name={icon} />
		{/if}
		<p>
			<slot />
		</p>
	</div>
</div>
