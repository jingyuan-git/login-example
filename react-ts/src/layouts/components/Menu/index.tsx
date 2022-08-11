import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin } from "antd";
import { findAllBreadcrumb, getOpenKeys, handleRouter, searchRoute } from "@/utils/util";
import { setMenuList } from "@/redux/modules/menu/action";
import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
import { setAuthRouter } from "@/redux/modules/auth/action";
import { getMenuList } from "@/api/modules/login";
import { connect } from "react-redux";
import type { MenuProps } from "antd";
import * as Icons from "@ant-design/icons";
import Logo from "./components/Logo";
import "./index.less";

const LayoutMenu = (props: any) => {
	const { pathname } = useLocation();
	const { isCollapse, setBreadcrumbList, setAuthRouter, setMenuList: setMenuListAction } = props;
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	// 刷新页面菜单保持高亮
	useEffect(() => {
		setSelectedKeys([pathname]);
		isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, isCollapse]);

	// 设置当前展开的 subMenu
	const onOpenChange = (openKeys: string[]) => {
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	};

	// 定义 menu 类型
	type MenuItem = Required<MenuProps>["items"][number];
	const getItem = (
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: "group"
	): MenuItem => {
		return {
			key,
			icon,
			children,
			label,
			type
		} as MenuItem;
	};

	// Dynamic Rendering Icon
	const customIcons: { [key: string]: any } = Icons;
	const addIcon = (name: string) => {
		return React.createElement(customIcons[name]);
	};

	// the key value of the menu returned by the processing background is the key value required by the antd menu
	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
		menuList.forEach((item: Menu.MenuOptions) => {
			// !item?.children?.length   ==>   (!item.children || item.children.length === 0)
			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
		});
		return newArr;
	};

	// get the menu list and process it into the format required by antd menu
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(false);
	const getMenuData = async () => {
		setLoading(true);
		try {
			const { data } = await getMenuList();
			if (!data) return;
			setMenuList(deepLoopFloat(data));
			// store all processed breadcrumbs in redux
			setBreadcrumbList(findAllBreadcrumb(data));
			// process the routing menu into a one-dimensional array, store it in redux, and judge the menu permissions
			const dynamicRouter = handleRouter(data);
			setAuthRouter(dynamicRouter);
			setMenuListAction(data);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getMenuData();
	}, []);

	// click the current menu to jump to the page
	const navigate = useNavigate();
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		const route = searchRoute(key, props.menuList);
		if (route.isLink) window.open(route.isLink, "_blank");
		navigate(key);
	};

	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo></Logo>
				<Menu
					theme="dark"
					mode="inline"
					triggerSubMenuAction="click"
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					items={menuList}
					onClick={clickMenu}
					onOpenChange={onOpenChange}
				></Menu>
			</Spin>
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { setMenuList, setBreadcrumbList, setAuthRouter };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
