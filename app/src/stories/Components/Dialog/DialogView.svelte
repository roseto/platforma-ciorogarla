<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Dialog from "$lib/components/Dialog.svelte";
	import { openModal } from "$lib/utils/modal";
</script>

<Button on:click={() => openModal($$props.id)}>Open Dialog</Button>

<Dialog id={$$props.id} {...$$props}>
	<h1 class="text-lg font-bold">Dialog</h1>

	<p>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum modi commodi vitae aspernatur
		aliquid ex ab doloribus, repellendus deleniti, voluptates quod corporis blanditiis laboriosam
		esse accusantium qui,
	</p>
</Dialog>
