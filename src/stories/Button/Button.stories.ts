import type { Meta, StoryObj } from "@storybook/svelte";
import Button from "$lib/components/Button.svelte";
import ButtonView from "./ButtonView.svelte";

const meta: Meta = {
	component: Button,
	title: "Button",
	argTypes: {
		color: {
			options: ["primary", "secondary", "accent", "neutral"],
			control: { type: "radio" },
		},
	}
}

export default meta;

export const Primary: StoryObj = {
	render: ({ ...args }) => ({
		Component: ButtonView,
		props: args,
	}),
	args: {
		color: "primary",
	}
}

export const Secondary: StoryObj = {
	render: ({ ...args }) => ({
		Component: ButtonView,
		props: args,
	}),
	args: {
		color: "secondary",
	}
}

export const Accent: StoryObj = {
	render: ({ ...args }) => ({
		Component: ButtonView,
		props: args,
	}),
	args: {	
		color: "accent",
	}
}

export const Neutral: StoryObj = {
	render: ({ ...args }) => ({
		Component: ButtonView,
		props: args,
	}),
	args: {
		color: "neutral",
	}
}

export const Outline: StoryObj = {
	render: ({ ...args }) => ({
		Component: ButtonView,
		props: args,
	}),
	args: {
		outline: true,
	}
}

export const WithIcon: StoryObj = {
	render: ({ ...args }) => ({
		Component: ButtonView,
		props: args,
	}),
	args: {
		icon: "info",
	}
}

export const FullWidth: StoryObj = {
	render: ({ ...args }) => ({
		Component: ButtonView,
		props: args,
	}),
	args: {
		fullWidth: true,
	}
}
