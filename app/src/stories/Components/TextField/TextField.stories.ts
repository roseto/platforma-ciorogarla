import TextField from "$lib/components/TextField.svelte";
import type { Meta, StoryObj } from "@storybook/svelte";

const meta: Meta = {
	component: TextField,
	title: "Components/TextField",
};

export default meta;

export const Regular: StoryObj = {
	render: ({ ...args }) => ({
		Component: TextField,
		props: {
			...args,
			placeholder: "Placeholder",
		},
	}),
};

export const FullWidth: StoryObj = {
	render: ({ ...args }) => ({
		Component: TextField,
		props: {
			...args,
			placeholder: "Placeholder",
			fullWidth: true,
		},
	}),
};

export const WithIcon: StoryObj = {
	render: ({ ...args }) => ({
		Component: TextField,
		props: {
			...args,
			placeholder: "Placeholder",
			fullWidth: true,
			icon: "search",
		},
	}),
};
