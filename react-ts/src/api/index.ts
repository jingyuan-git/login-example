// import NProgress from "@/config/nprogress";
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { ResultData } from "@/api/interface";
import { ResultEnum } from "@/enums/httpEnum";
import { checkStatus } from "./helper/checkStatus";
import { AxiosCanceler } from "./helper/axiosCancel";
import { setToken } from "@/redux/modules/global/action";
import { message } from "antd";
import { store } from "@/redux";

const axiosCanceler = new AxiosCanceler();

const config = {
	// default address request address, which can be modified in the .env file
	baseURL: import.meta.env.VITE_API_URL as string,
	// set the timeout time (10s)
	timeout: 10000,
	// allow credentials to be carried across domains
	withCredentials: true
};

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);

		/**
		 * @description request interceptor
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				// NProgress.start();
				// * add the current request to pending
				axiosCanceler.addPending(config);
				// * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				// config.headers!.noLoading || showFullScreenLoading();
				const token: string = store.getState().global.token;
				return { ...config, headers: { ...config.headers, "x-access-token": token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		/**
		 * @description response interceptor
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response;
				// NProgress.done();
				// * when the request is complete, remove pending (close loading)
				axiosCanceler.removePending(config);
				// tryHideFullScreenLoading();
				// *login invalid（code == 599）
				if (data.code == ResultEnum.OVERDUE) {
					store.dispatch(setToken(""));
					message.error(data.msg);
					window.location.hash = "/login";
					return Promise.reject(data);
				}
				// * global error message interception
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					message.error(data.msg);
					return Promise.reject(data);
				}
				// * successful request
				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				// NProgress.done();
				// tryHideFullScreenLoading();
				// 请求超时单独判断，请求超时没有 response
				if (error.message.indexOf("timeout") !== -1) message.error("request timed out, please try again later");
				// do different processing according to the error status code of the response
				if (response) checkStatus(response.status);
				// the server results are not returned (maybe the server is wrong or the client is disconnected from the network) 
				if (!window.navigator.onLine) window.location.hash = "/500";
				return Promise.reject(error);
			}
		);
	}

	// * common request method encapsulation
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
}

export default new RequestHttp(config);
