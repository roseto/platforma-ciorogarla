import { BillIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const discussion = defineType({
	name: "discussion",
	title: "Discussion",
	type: "document",
	icon: BillIcon,
	fields: [
		// _id is already defined!
		// _createdAt is already defined!
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "userId",
			title: "User ID",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "upvotes",
			title: "Upvotes",
			type: "array",
			of: [
				{
					type: "string",
				}
			],
		}),
		defineField({
			name: "relevantDocument",
			title: "Relevant Document",
			type: "reference",
			to: [
				{ type: "article" }, 
				{ type: "business" }, 
				{ type: "volunteeringProject" }
			],
		}),
		defineField({
			name: "approved",
			title: "Approved",
			type: "boolean",
		}),
		defineField({
			name: "locked",
			title: "Locked",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
		}),
		defineField({
			name: "comments",
			title: "Comments",
			type: "array",
			of: [
				{ 
					type: "reference",
					to: [{ type: "discussionComment" }],
				}
			],
		}),
	]
});

export default discussion;
