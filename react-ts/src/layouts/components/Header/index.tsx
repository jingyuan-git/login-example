import { Layout } from "antd";
import AvatarIcon from "./components/AvatarIcon";
import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
// import Language from "./components/Language";
// import Theme from "./components/Theme";
import Fullscreen from "./components/Fullscreen";
import { store } from "@/redux";
import "./index.less";

const LayoutHeader = () => {
	const { Header } = Layout;
	const ninkName = store.getState().global.userInfo.nickname

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				<BreadcrumbNav />
			</div>
			<div className="header-ri">
				{/* <Language />
				<Theme />  */}
				<Fullscreen />
				<span className="username"> {ninkName}</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
