import type { Meta, StoryObj } from "@storybook/svelte";
import Toggle from "$lib/components/Toggle.svelte";

const meta: Meta = {
	component: Toggle,
	title: "Components/Toggle",
};

export default meta;

export const Regular: StoryObj = {
	render: ({ ...args }) => ({
		Component: Toggle,
		props: args,
	}),
};
