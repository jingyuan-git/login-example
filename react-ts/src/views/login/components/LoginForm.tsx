import md5 from "js-md5";
import { useState } from "react";
import { Button, Form, Input, message, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface";
import { loginApi } from "@/api/modules/login";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken, setUserInfo } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";

const LoginForm = (props: any) => {
	const { t } = useTranslation();
	const { setToken } = props;
	const { setUserInfo } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			loginForm.password = md5(loginForm.password);
			console.log("loginForm", loginForm)
			const { data } = await loginApi(loginForm);
			setToken(data?.access_token);
			setUserInfo(data?.user_info)
			message.success("Login success!");
			navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const pwdValidator = (rule: any, value: any, callback: any) => {
		if (!value) {
			return Promise.reject(
				'Please input your password!');
		} else if (value.length < 6) {
			return Promise.reject(
				"Password must be larger than 6 characters!");
		}
		return Promise.resolve();
	}

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			className='login-form'
		>
			<Form.Item
				label="E-mail"
				name="email"
				rules={[
					{
						type: 'email',
						message: 'The input is not valid E-mail!',
					},
					{
						required: true,
						message: 'Please input your E-mail!'
					},
				]}
			>
				<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[
					{ validator: pwdValidator },
					{ required: true },
				]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }} >
				<Button type="primary" htmlType="submit" className="login-btn" loading={loading} icon={<UserOutlined />}>
					Login
				</Button>
				Or <a href="#/register">register now!</a>
			</Form.Item>
		</Form >
	);
};

const mapDispatchToProps = { setToken, setUserInfo };
export default connect(null, mapDispatchToProps)(LoginForm);
