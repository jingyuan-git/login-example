import { useLocation, Navigate } from "react-router-dom";
import { AxiosCanceler } from "@/api/helper/axiosCancel";
import { searchRoute } from "@/utils/util";
import { rootRouter } from "@/routers/index";
import { HOME_URL } from "@/config/config";
import { store } from "@/redux/index";

const axiosCanceler = new AxiosCanceler();

/**
 * @description route guard component
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
	const { pathname } = useLocation();
	const route = searchRoute(pathname, rootRouter);
	// * clear all requests before jumping the route
	axiosCanceler.removeAllPending();

	// * determine whether the current route needs access permission (direct release without permission)
	if (!route.meta?.requiresAuth) return props.children;

	// * determine if there is a token
	const token = store.getState().global.token;
	if (!token) return <Navigate to="/login" replace />;

	// * Dynamic routing, a one-dimensional array generated based on the menu data returned by the backend
	const dynamicRouter = store.getState().auth.authRouter;
	// * Static Router: must configure the home page address, otherwise  cannot enter the home page to obtain data
	const staticRouter = [HOME_URL, "/403"];
	const routerList = dynamicRouter.concat(staticRouter);
	// * if the accessed address is not redirected to a 403 page in the routing table
	if (routerList.indexOf(pathname) == -1) return <Navigate to="/403" />;

	// * the current account has permission to return to the router and access the page normally
	return props.children;
};

export default AuthRouter;
