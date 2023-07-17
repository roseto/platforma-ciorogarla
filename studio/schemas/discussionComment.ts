import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const discussionComment = defineType({
	name: "discussionComment",
	title: "Discussion Comment",
	type: "document",
	icon: CommentIcon,
	fields: [
		// _id is already defined!
		// _createdAt is already defined!
		defineField({
			name: "userId",
			title: "User ID",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "content",
			title: "Content",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "discussion",
			title: "Discussion",
			type: "reference",
			to: [{ type: "discussion" }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "replyTo",
			title: "Reply To",
			type: "reference",
			to: [{ type: "discussionComment" }],
		}),
	]
});

export default discussionComment;
