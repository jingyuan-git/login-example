import md5 from "js-md5";
import { useState } from "react";
import { Button, Form, Input, message, Checkbox, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { Register } from "@/api/interface";
import { registerApi } from "@/api/modules/register";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const RegisterForm = (props: any) => {
	const { t } = useTranslation();
	const { setToken } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 登录
	const onFinish = async (registerForm: Register.ReqRegisterForm) => {
		try {
			setLoading(true);
			registerForm.password = md5(registerForm.password);
			console.log("loginForm", registerForm)
			const { data } = await registerApi(registerForm);
			setToken(data?.access_token);
			message.success("登录成功！");
			navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0,
			},
			sm: {
				span: 16,
				offset: 8,
			},
		},
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
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			className='register-form'
		>
			<Form.Item
				name="email"
				label="E-mail"
				rules={[
					{
						type: 'email',
						message: 'The input is not valid E-mail!',
					},
					{
						required: true,
						message: 'Please input your E-mail!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="password"
				label="Password"
				rules={[
					{ validator: pwdValidator },
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="Confirm Password"
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('The two passwords that you entered do not match!'));
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="nickname"
				label="Nickname"
				tooltip="What do you want others to call you?"
				rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="phone"
				label="Phone Number"
				rules={[{ message: 'Please input your phone number!' }]}
			>
				<Input style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				name="gender"
				label="Gender"
				rules={[{ required: true, message: 'Please select gender!' }]}
			>
				<Select placeholder="select your gender">
					<Option value="male">Male</Option>
					<Option value="female">Female</Option>
					<Option value="other">Other</Option>
				</Select>
			</Form.Item>

			<Form.Item
				name="agreement"
				valuePropName="checked"
				rules={[
					{
						validator: (_, value) =>
							value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
					},
				]}
				{...tailFormItemLayout}
			>
				<Checkbox>
					I have read the <a href="">agreement</a>
				</Checkbox>
			</Form.Item>
			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit" className="register-btn">
					Register
				</Button>
				Or <a href="#/login">login now!</a>
			</Form.Item>
		</Form >
	);
};

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(RegisterForm);
