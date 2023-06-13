import { defineType, defineField } from "sanity";
import { contactField } from "./templates";

export default defineType({
	name: "organisation",
	title: "Organisation",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			description: "The name of the organisation",
			type: "string",
		}),
		defineField({
			name: "logo",
			title: "Logo",
			description: "The logo of the organisation",
			type: "image",
		}),
		contactField,
	],
});
