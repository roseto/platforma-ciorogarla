import type { Meta, StoryObj } from "@storybook/svelte";
import MapsEmbed from "$lib/components/MapsEmbed.svelte";

const meta: Meta = {
	component: MapsEmbed,
	title: "Composed/MapsEmbed",
};

export default meta;

export const Regular: StoryObj = {
	render: ({ ...args }) => ({
		Component: MapsEmbed,
		props: args,
	}),
	args: {
		address: "Address",
		streetViewLocation: "40.712776,-74.005974",
		plusCode: "87G8P9CJ+XQ",
	},
};
