import type { Meta, StoryObj } from "@storybook/svelte";
import Footer from "$lib/components/Footer.svelte";

const meta: Meta = {
	component: Footer,
	title: "Composed/Footer"
};

export default meta;

export const Regular: StoryObj = {
	render: ({ ...args }) => ({
		Component: Footer,
		props: args,
	}),
};
