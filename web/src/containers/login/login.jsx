import React, { Component } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { useNavigate } from 'react-router-dom';
import * as authActions from "../../actions/auth"
import './css/login.less'
import logo from './imgs/logo.jpg'
const { Item } = Form

const Login = (props) => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(props.authActions)
        // 还原errors的提示
        props.authActions.asyncSetUserObj({
            email: values.email,
            password: values.password
        }).then(res => {
            console.log("res", res)
            if (res.status === 200) {
                // 成功
                console.log("res into", res)
                navigate("/");
                console.log("res end", res)
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const pwdValidator = (/** @type {any} */ rule, /** @type {any} */ value) => {
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
        <div className='login' >
            <header>
                <img src={logo} alt="logo"></img>
                <h1>Management System </h1>
            </header>

            <section>
                <h1>
                    User Login
                </h1>

                <Form
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
                            { required: true, message: 'Please input your email!' },
                            { max: 15, message: "Username must be less than 15 characters!" },
                            { min: 4, message: "Username must be larger than 4 characters!" },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div >
    );
    // }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)