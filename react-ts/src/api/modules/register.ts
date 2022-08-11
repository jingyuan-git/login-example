import { Register } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name register module
 */
// * user registration interface
export const registerApi = (params: Register.ReqRegisterForm) => {
	return http.post<Register.ResRegister>(PORT1 + `/users/register`, params);
};
