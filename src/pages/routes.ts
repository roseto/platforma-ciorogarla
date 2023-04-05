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
		path: "/businesses",
		component: lazy(() => import("./Businesses/Businesses")),
		data: BusinessesGetData,
	},
	{
		path: "/businesses/:id",
		component: lazy(() => import("./Businesses/Business")),
		data: BusinessGetData,
	}
]
