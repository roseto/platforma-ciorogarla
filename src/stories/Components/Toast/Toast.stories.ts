import type { Meta, StoryObj } from "@storybook/svelte";
import Toast from "$lib/components/Toast.svelte";
import ToastView from "./ToastView.svelte";


const meta: Meta = {
	component: Toast,
	title: "Components/Toast",
}

export default meta;

export const Info: StoryObj = {
	render: ({ ...args }) => ({
		Component: ToastView,
		props: {
			...args,
			type: "info",
			message: "This is an info toast",
		}
	}),
}

export const Success: StoryObj = {
	render: ({ ...args }) => ({
		Component: ToastView,
		props: {
			...args,
			type: "success",
			message: "This is a success toast",
		}
	}),
}

export const Warning: StoryObj = {
	render: ({ ...args }) => ({
		Component: ToastView,
		props: {
			...args,
			type: "warning",
			message: "This is a warning toast",
		}
	})
}

export const Error: StoryObj = {
	render: ({ ...args }) => ({
		Component: ToastView,
		props: {
			...args,
			type: "error",
			message: "This is an error toast",
		}
	})
}
