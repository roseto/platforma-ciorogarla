<script lang="ts">
	export let top: number = 0;
</script>

<div
	class="absolute top-0 h-[1024px] left-0 overflow-hidden w-full z-[-1] pointer-events-none"
	style="top: {top}px;"
>
	<div
		class="absolute glow left-1/2 transform -translate-x-1/2 from-neutral via-transparent rounded-full w-[1024px] h-[1024px] opacity-75"
	/>
</div>

<style scoped>
	.glow {
		background: radial-gradient(var(--tw-gradient-stops));
	}
</style>
