<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeftIcon } from 'svelte-feather-icons';
	import Container from './Container.svelte';

	export let title: string;
	export let back: boolean = false;
	export let noNav: boolean = false;
	export let noHeading: boolean = false;
	export let themeColor: string = '';
	export let color: string = '';
	export let favicon: string = '';
	export let actions: {
		href?: string;
		onClick?: () => void;
		icon: any;
	}[] = [];

	let headerRef: HTMLHeadingElement | undefined;

	let scrollTrigger = globalThis.scrollY > (headerRef?.offsetHeight ?? 56);

	const handleScroll = () => {
		scrollTrigger = globalThis.scrollY > (headerRef?.offsetHeight ?? 56);
	};

	onMount(() => {
		globalThis.addEventListener('scroll', handleScroll);

		return () => {
			globalThis.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta
		name="theme-color"
		media="(prefers-color-scheme: light)"
		content={themeColor || '#fbfdf8'}
	/>
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content={themeColor || '#191c1a'} />
	<link rel="icon" href={favicon} />
</svelte:head>

{#if !noNav}
	<nav
		class="navbar top-0 left-0 right-0 fixed z-50 transition gap-1"
		class:bg-neutral={scrollTrigger}
		class:shadow={scrollTrigger}
	>
		{#if back}
			<div class="flex-none">
				<button class="btn btn-ghost btn-circle text-neutral-content" style="color: {color}">
					<ArrowLeftIcon />
				</button>
			</div>
		{/if}
		<div class="flex-1">
			<span
				class="text-xl transition text-neutral-content"
				style="color: {color}"
				class:ml-4={!back}
				class:opacity-0={!scrollTrigger}
			>
				{title}
			</span>
		</div>
		<div class="flex-none">
			{#each actions as action}
				<svelte:element
					this={action.href ? 'a' : 'button'}
					href={action.href}
					on:click={action.onClick}
					class="btn btn-ghost btn-circle text-neutral-content"
					style="color: {color}"
				>
					<svelte:component this={action.icon} />
				</svelte:element>
			{/each}
		</div>
	</nav>
{/if}

{#if !noHeading}
	<Container>
		<h1 bind:this={headerRef} class="text-7xl mb-2 pt-16">
			{title}
		</h1>
	</Container>
{/if}
