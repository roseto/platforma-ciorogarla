import {lazy} from "solid-js";
import { RouteDefinition } from "@solidjs/router";
import { BusinessesGetData } from "./Businesses/Businesses";
import { BusinessGetData } from "./Businesses/Business";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: lazy(() => import("./Home")),
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
	}
]
