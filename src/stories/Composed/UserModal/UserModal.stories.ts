import type { Meta, StoryObj } from "@storybook/svelte";
import UserModal from "$lib/components/UserModal.svelte";
import UserModalView from "./UserModalView.svelte";

const meta: Meta = {
	component: UserModal,
	title: "Composed/UserModal",
};

export default meta;

export const Regular: StoryObj = {
	render: ({ ...args }) => ({
		Component: UserModalView,
		props: args,
	}),
};

export const WithUser: StoryObj = {
	render: ({ ...args }) => ({
		Component: UserModalView,
		props: args,
	}),
	args: {
		// The only required properties
		user: {
			email: "example@example.com",
			user_metadata: {
				full_name: "John Doe",
				avatar_url: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
			},
		},
	},
};
