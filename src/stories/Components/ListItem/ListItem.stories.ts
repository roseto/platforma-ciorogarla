import ListItem from "$lib/components/ListItem.svelte";
import ListItemView from "./ListItemView.svelte";
import type { Meta, StoryObj } from "@storybook/svelte";

const meta: Meta = {
	component: ListItem,
	title: "Components/ListItem",
};

export default meta;

export const Regular: StoryObj = {
	render: ({ ...args }) => ({
		Component: ListItem,
		props: {
			...args,
			primary: "Primary text",
			secondary: "Secondary text",
		},
	}),
};

export const AsButton: StoryObj = {
	render: ({ ...args }) => ({
		Component: ListItem,
		props: {
			...args,
			primary: "Primary text",
			secondary: "Secondary text",
			button: true,
		},
	}),
};

export const WithImage: StoryObj = {
	render: ({ ...args }) => ({
		Component: ListItem,
		props: {
			...args,
			img: "https://via.placeholder.com/64",
			primary: "Primary text",
			secondary: "Secondary text",
		},
	}),
};

export const WithIcon: StoryObj = {
	render: ({ ...args }) => ({
		Component: ListItem,
		props: {
			...args,
			icon: "star",
			primary: "Primary text",
			secondary: "Secondary text",
		},
	}),
};

export const WithAction: StoryObj = {
	render: ({ ...args }) => ({
		Component: ListItemView,
		props: {
			...args,
			icon: "star",
			primary: "Primary text",
			secondary: "Secondary text",
		},
	}),
};
