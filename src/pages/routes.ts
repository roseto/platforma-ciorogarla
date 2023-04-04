import {lazy} from "solid-js";
import { RouteDefinition } from "@solidjs/router";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: lazy(() => import("./Home")),
	}
]
