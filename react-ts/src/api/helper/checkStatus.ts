import { message } from "antd";

/**
 * @description: check network request status code
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
	switch (status) {
		case 400:
			message.error("Request failed! Please try again later");
			break;
		case 401:
			message.error("Login failed! Please log in again");
			break;
		case 403:
			message.error("The current account does not have permission to access!");
			break;
		case 404:
			message.error("The resource you are accessing does not exist!");
			break;
		case 405:
			message.error("The request method is wrong! Please try again later");
			break;
		case 408:
			message.error("Request timed out! Please try again later");
			break;
		case 500:
			message.error("Service exception!");
			break;
		case 502:
			message.error("Gateway error!");
			break;
		case 503:
			message.error("Service unavailable!");
			break;
		case 504:
			message.error("Gateway timed out!");
			break;
		default:
			message.error("Request failed!");
	}
};
