import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";

import http from "@/api";

/**
 * @name login module
 */
// * user login interface
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT1 + `/users/login`, params);
};


// * get menu list
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`);
};
