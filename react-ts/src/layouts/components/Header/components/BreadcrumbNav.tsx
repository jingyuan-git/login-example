import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";

const BreadcrumbNav = (props: any) => {
	const { pathname } = useLocation();
	const breadcrumbList = props.breadcrumbList[pathname] || [];

	return (
		<Breadcrumb>
			<Breadcrumb.Item href={`#${HOME_URL}`}>Home Page</Breadcrumb.Item>
			{breadcrumbList.map((item: string) => {
				return <Breadcrumb.Item key={item}>{item !== "Home Page" ? item : null}</Breadcrumb.Item>;
			})}
		</Breadcrumb>
	);
};

const mapStateToProps = (state: any) => state.breadcrumb;
export default connect(mapStateToProps)(BreadcrumbNav);
