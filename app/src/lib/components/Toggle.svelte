<script lang="ts">
	export let checked: boolean = false;
</script>

<input class="toggle" class:toggle-primary={checked} type="checkbox" bind:checked />
