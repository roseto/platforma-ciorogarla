import { CalendarIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";
import { locationField } from "./templates";

const projectTypes = [{ title: "Youth Exchange", value: "ye" }];

export default defineType({
	name: "volunteeringProject",
	title: "Volunteering Project",
	type: "document",
	icon: CalendarIcon,

	fields: [
		defineField({
			name: "name",
			title: "Name",
			description: "The name of the project",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			description: "The description of the project",
			type: "text",
		}),
		defineField({
			name: "slug",
			title: "Slug",
			description: "The slug of the project",
			type: "slug",
			options: {
				source: "name",
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "deadline",
			title: "Deadline",
			description: "The deadline of the project",
			type: "date",
		}),
		defineField({
			name: "topic",
			title: "Topic",
			description: "The topic of the project",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "type",
			title: "Type",
			description: "Type of project",
			type: "string",
			options: {
				list: projectTypes,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "applicationForm",
			title: "Application Form",
			description: "The application form of the project",
			type: "url",
		}),
		defineField({
			name: "organisation",
			title: "Organisation",
			description: "The organisation that the project belongs to",
			type: "reference",
			to: [{ type: "organisation" }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "image",
			title: "Image",
			description: "An image for the project",
			type: "image",
			validation: (Rule) => Rule.required(),
		}),
		locationField,
		defineField({
			name: "infopack",
			title: "Infopack",
			description: "The infopack of the project",
			type: "file",
		}),
		defineField({
			name: "infoLink",
			title: "Info Link",
			description: "The link to the info of the project",
			type: "url",
		}),
		defineField({
			name: "country",
			title: "Country",
			description: "The country where the project takes place",
			type: "reference",
			to: [{ type: "country" }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "participatingCountries",
			title: "Participating Countries",
			description: "The countries that participate in the project",
			type: "array",
			of: [{ type: "reference", to: [{ type: "country" }] }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "period",
			title: "Period",
			description: "The period of the project",
			type: "object",
			fields: [
				defineField({
					name: "fromDate",
					title: "From Date",
					description: "The date that the project starts",
					type: "date",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "toDate",
					title: "To Date",
					description: "The date that the project ends",
					type: "date",
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
	],
});
