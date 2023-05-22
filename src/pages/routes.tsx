import {lazy} from "solid-js";
import { RouteDefinition, Navigate } from "@solidjs/router";
import { HomeGetData } from "./Home";
import { BusinessesGetData } from "./Businesses/Businesses";
import { BusinessGetData, BUSINESS_STANDALONE_MODE } from "./Businesses/Business";
import { VolunteeringProjectsGetData } from "./Volunteering/Projects";
import { VolunteeringProjectGetData } from "./Volunteering/Project";
import { ArticlesGetData } from "./News/Articles";
import { ArticleGetData } from "./News/Article";
import { ArchiveGetData } from "./News/Archive";

let routes: RouteDefinition[] = [
	{
		path: "/",
		component: lazy(() => import("./Home")),
		data: HomeGetData
	},
	{
		path: "/settings",
		component: lazy(() => import("./Settings")),
	},
	{
		path: "/install",
		component: lazy(() => import("./Install")),
	},
	{
		path: "/login",
		component: lazy(() => import("./Login")),
	},

	{
		path: "/businesses",
		children: [
			{
				path: "/",
				component: lazy(() => import("./Businesses/Businesses")),
				data: BusinessesGetData,
			},
			{
				path: "/:id",
				component: lazy(() => import("./Businesses/Business")),
				data: BusinessGetData,
			}
		]
	},
	{
		path: "/volunteering",
		children: [
			{
				path: "/",
				component: lazy(() => import("./Volunteering/Projects")),
				data: VolunteeringProjectsGetData
			},
			{
				path: "/:id",
				component: lazy(() => import("./Volunteering/Project")),
				data: VolunteeringProjectGetData
			}
		]
	},
	{
		path: "/news",
		children: [
			{
				path: "/",
				component: lazy(() => import("./News/Articles")),
				data: ArticlesGetData
			},
			{
				path: "/:id",
				component: lazy(() => import("./News/Article")),
				data: ArticleGetData
			},
			{
				path: "/archive",
				component: lazy(() => import("./News/Archive")),
				data: ArchiveGetData
			}
		]
	},
	{
		path: "*",
		component: () => <Navigate href="/" />
	}
]

if (BUSINESS_STANDALONE_MODE) {
	routes = [
		{
			path: "/",
			component: lazy(() => import("./Businesses/Business")),
			data: BusinessGetData,
		},
		{
			path: "*",
			component: () => <Navigate href="/" />
		}
	];
}

export { routes };
