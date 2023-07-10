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
			name: "media",
			title: "Media",
			type: "file",
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
