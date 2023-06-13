/// <reference types="./themer.d.ts" />
import { defineConfig } from "sanity"
import { theme } from 'https://themer.sanity.build/api/hues?default=5c9199&primary=1cb485;400&transparent=5c9199&positive=43d675;300&caution=fbd024;200&lightest=fcfdfd&darkest=0d1415'
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { markdownSchema } from "sanity-plugin-markdown";
import { schemaTypes } from "./schemas"
import { dashboardTool, projectInfoWidget, projectUsersWidget } from "@sanity/dashboard";
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list";
import { catsWidget } from "sanity-plugin-dashboard-widget-cats";

export default defineConfig({
	name: "Ciorogarla_Unita",
	title: "Ciorogarla Unită",

	projectId: 'xxgdop45',
	dataset: 'production',


	theme,

	plugins: [
		dashboardTool({
			widgets: [
				documentListWidget({
					title: "Businesses",
					types: ["business"],
					limit: 7
				}),
				documentListWidget({
					title: "Projects",
					types: ["volunteeringProject"],
					limit: 7
				}),
				documentListWidget({
					title: "Articles",
					types: ["article"],
					limit: 7,
				}),
				catsWidget({
					layout: { width: "small" }
				}),
				projectInfoWidget(),
				projectUsersWidget({ layout: { width: "medium" } }),
			]
		}),
		deskTool(),
		visionTool(),
		unsplashImageAsset(),
		markdownSchema(),
	],

	schema: {
		types: schemaTypes,
	},
})
