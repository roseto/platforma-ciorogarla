import { defineType, defineField } from "sanity";

export default defineType({
	name: "country",
	title: "Country",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			description: "The name of the country",
			type: "string",
		}),
	],
});
