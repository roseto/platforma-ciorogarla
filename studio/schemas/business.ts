import { CaseIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";
import { contactField, locationField } from "./templates";

const businessTypes = [
	{ title: "Restaurant", value: "restaurant" },
	{ title: "Cafe", value: "cafe" },
	{ title: "Pub", value: "pub" },
	{ title: "Barbershop", value: "barbershop" },
	{ title: "ITP", value: "itp" },
	{ title: "Showroom", value: "showroom" },
	{ title: "Distributor", value: "distributor" },
	{ title: "Auto Parts", value: "autoParts" },
	// {title: "Bakery", value: "bakery"},
	{ title: "Market", value: "market" },
	{ title: "Pizza", value: "pizza" },
	{ title: "Hotel", value: "hotel" },
	{ title: "Cake Shop", value: "cakeShop" },
];

const business = defineType({
	name: "business",
	title: "Business",
	type: "document",
	icon: CaseIcon,

	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			description: "The name of the business",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description: "A description of the business",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "type",
			title: "Type",
			type: "string",
			description: "The type of business",
			options: {
				list: businessTypes,
				// layout: "radio",
			},
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			description: "The slug of the business",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "logo",
			title: "Logo",
			type: "image",
			description: "The logo of the business",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "cover",
			title: "Cover",
			type: "image",
			description: "The cover image of the business",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "photos",
			title: "Photos",
			type: "array",
			of: [
				{
					name: "photo",
					title: "Photo",
					type: "image",
				},
			],
			description: "The photos of the business",
		}),

		// Price range from low to high
		defineField({
			name: "prices",
			title: "Prices",
			type: "string",
			options: {
				list: [
					{ title: "$", value: "$" },
					{ title: "$$", value: "$$" },
					{ title: "$$$", value: "$$$" },
					{ title: "$$$$", value: "$$$$" },
				],
				layout: "radio",
			},
			description: "The price range of the business",
		}),

		defineField({
			name: "pricesLink",
			title: "Prices link",
			type: "url",
			description: "The link to the prices page",
		}),

		defineField({
			name: "isSponsor",
			title: "Is sponsor",
			type: "boolean",
			description: "Is the business a sponsor of Ciorogarla Unita",
			initialValue: false,
			validation: (Rule) => Rule.required(),
		}),

		locationField,
		contactField,
	],
});

export default business;
