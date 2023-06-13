import type { Meta, StoryObj } from "@storybook/svelte";
import Card from "$lib/components/Card.svelte";
import CardView from "./CardView.svelte";

const meta: Meta = {
	component: Card,
	title: "Components/Card",
	argTypes: {
		bgColor: {
			options: ["primary", "secondary", "accent", "neutral"],
			control: { type: "radio" },
		},
	},
};

export default meta;

export const Primary: StoryObj = {
	render: ({ ...args }) => ({
		Component: CardView,
		props: args,
	}),
	args: {
		bgColor: "primary",
	},
};

export const Secondary: StoryObj = {
	render: ({ ...args }) => ({
		Component: CardView,
		props: args,
	}),
	args: {
		bgColor: "secondary",
	},
};

export const Accent: StoryObj = {
	render: ({ ...args }) => ({
		Component: CardView,
		props: args,
	}),
	args: {
		bgColor: "accent",
	},
};

export const Neutral: StoryObj = {
	render: ({ ...args }) => ({
		Component: CardView,
		props: args,
	}),
	args: {
		bgColor: "neutral",
	},
};

export const WithTitle: StoryObj = {
	render: ({ ...args }) => ({
		Component: CardView,
		props: args,
	}),
	args: {
		title: "Card Title",
	},
};

export const WithImage: StoryObj = {
	render: ({ ...args }) => ({
		Component: CardView,
		props: args,
	}),
	args: {
		img: "https://via.placeholder.com/1024",
	},
};
