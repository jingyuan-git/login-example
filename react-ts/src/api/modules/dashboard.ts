import { Dashboard } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

// * get dashboard information
export const getDashboardInfo = () => {
	return http.get<Dashboard.ResDashboard>(PORT1 + `/dashboard/list`);
};
