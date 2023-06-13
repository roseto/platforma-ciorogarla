import type { Meta, StoryObj } from "@storybook/svelte";
import ContactList from "$lib/components/ContactList.svelte";

const meta: Meta = {
	component: ContactList,
	title: "Composed/ContactList",
};

export default meta;

export const Regular: StoryObj = {
	render: ({ ...args }) => ({
		Component: ContactList,
		props: args,
	}),
	args: {
		website: "https://www.google.com",
		phone: "+1 212-565-0000",
		email: "example@example.com",
		facebook: "https://www.facebook.com",
		instagram: "https://www.instagram.com",
	},
};
