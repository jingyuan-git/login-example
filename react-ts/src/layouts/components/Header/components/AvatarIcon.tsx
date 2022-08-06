import { useRef } from "react";
import { Avatar, Modal, Menu, Dropdown, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import InfoModal from "./InfoModal";
import avatar from "@/assets/images/avatar.png";

const AvatarIcon = (props: any) => {
	const { setToken } = props;
	const navigate = useNavigate();

	interface ModalProps {
		showModal: (params: {}) => void;
	}
	const infoRef = useRef<ModalProps>(null);

	// 退出登录
	const logout = () => {
		Modal.confirm({
			title: "Warm prompt 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "Are you sure you want to log out?",
			okText: "Confirm",
			cancelText: "Cancel",
			onOk: () => {
				setToken("");
				message.success("Logout succeeded!");
				navigate("/login");
			}
		});
	};

	// Dropdown Menu
	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: <span className="dropdown-item">Home page</span>,
					onClick: () => navigate(HOME_URL)
				},
				{
					key: "2",
					label: <span className="dropdown-item">User profile</span>,
					onClick: () => infoRef.current!.showModal({})
				},
				{
					type: "divider"
				},
				{
					key: "3",
					label: <span className="dropdown-item">Log Out</span>,
					onClick: logout
				}
			]}
		></Menu>
	);
	return (
		<>
			<Dropdown overlay={menu} placement="bottom" arrow trigger={["click"]}>
				<Avatar size="large" src={avatar} />
			</Dropdown>
			<InfoModal innerRef={infoRef}></InfoModal>
		</>
	);
};

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(AvatarIcon);
