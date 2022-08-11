import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import Dashboard from "@/views/dashboard/index";


// dashboard router
const dashboardRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/dashboard",
				element: <Dashboard />,
				meta: {
					requiresAuth: true,
					title: "Dashboard",
					key: "dashboard"
				}
			}
		]
	}
];

export default dashboardRouter;
