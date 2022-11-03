import React from "react";
import "antd/dist/antd.css";
import "./styles.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import uta from "./assets/uta.png";
import logo from "./assets/logo_remaster.png";

import axios from 'axios';



export default function Login() {
  
  //verify login info
  const onFinish = values => {
    const {username, password} = values
    axios.post('https://smartinventory-backend.glitch.me/users/validateUser', 
               null, 
               {params: {username, password}})
    .then(res => {
      if(res.data.validation){
        alert("Your password is correct.") //TODO: navigate to inventory page
      }
      else{
        alert("Your password is incorrect. Try again.")
      }
    })
  }
  
  
  return (
    <div className="container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <div className="login-sider">
          <h2>New Here?</h2>
          <p>
            Sign up and take advantage of UTA's Nursing Department inventory.
            <Form.Item>
              <Button type="button" className="login-form-signup-button">
                Sign Up
              </Button>
            </Form.Item>
          </p>
          <img src={uta} className="img" />
        </div>
        <div className="login-form-container">
          <img src={logo} />
          <h1>Login to Your Account</h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!"
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!"
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password?
          </a>
        </div>
      </Form>
    </div>
  );
};

export default NormalLoginForm;
