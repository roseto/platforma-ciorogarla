import {BlockContentIcon} from "@sanity/icons";
import { defineType, defineField } from "sanity";

export default defineType({
	name: "article",
	title: "Article",
	type: "document",
	icon: BlockContentIcon,

	fields: [
		defineField({
			name: "title",
			title: "Title",
			description: "The title of the news article",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			description: "The slug of the news article",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "tags",
			title: "Tags",
			description: "The tags of the news article",
			type: "array",
			of: [{ type: "string" }],
			options: {
				layout: "tags",
			},
		}),
		defineField({
			name: "cover",
			title: "Cover",
			description: "The cover of the news article",
			type: "image",
			options: {
				hotspot: true,

			},
		}),
		defineField({
			name: "urgent",
			title: "Urgent",
			description: "Is this news article urgent?",
			type: "boolean",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "content",
			title: "Content",
			description: "The content of the news article",
			type: "markdown",
			validation: (Rule) => Rule.required(),
		}),
	],
})
