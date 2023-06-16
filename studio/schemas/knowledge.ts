import { defineType, defineField } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
	name: "knowledge",
	title: "Knowledge",
	description: "Knowledge base for smart search",
	icon: BookIcon,
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			description: "The title of the knowledge",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "content",
			title: "Content",
			description: "The content of the knowledge",
			type: "markdown",
			// Add a maximum of 512 characters
			validation: (Rule) => Rule.max(512) || Rule.required(),
		}),
	],
});
