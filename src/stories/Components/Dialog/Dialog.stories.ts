import type { Meta, StoryObj } from "@storybook/svelte";
import Dialog from "$lib/components/Button.svelte";
import DialogView from "./DialogView.svelte";
import DialogViewActions from "./DialogViewActions.svelte";

const meta: Meta = {
	component: Dialog,
	title: "Components/Dialog",
};

export default meta;

export const Regular: StoryObj = {
	render: ({ ...args }) => ({
		Component: DialogView,
		props: args,
	}),
	args: {
		id: "dialog",
	},
};

export const WithActions: StoryObj = {
	render: ({ ...args }) => ({
		Component: DialogViewActions,
		props: args,
	}),
	args: {
		id: "dialog",
	},
};

export const Forced: StoryObj = {
	render: ({ ...args }) => ({
		Component: DialogView,
		props: args,
	}),
	args: {
		id: "dialog",
		force: true,
	},
};
