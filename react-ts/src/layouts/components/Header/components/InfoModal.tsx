import { useState, useImperativeHandle, Ref } from "react";
import { Modal, message } from "antd";
import { store } from "@/redux";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void } | undefined>;
}

const InfoModal = (props: Props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const userInfo = store.getState().global.userInfo

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (params: {}) => {
		console.log("params showModal", params);
		setModalVisible(true);
	};

	const handleOk = () => {
		setModalVisible(false);
		// message.success("show user infornamtion success 🎉🎉🎉");
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	return (
		<Modal
			className=""
			title="User Infomation"
			visible={modalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
			destroyOnClose={true}
			cancelButtonProps={{ disabled: true }}
		>
			<p>Nickname: {userInfo.nickname}</p>
			<p>Email: {userInfo.email}</p>
			<p>Phone number: {userInfo.phone}</p>
			<p>Gender: {userInfo.gender}</p>
		</Modal>
	);
};


export default InfoModal;
