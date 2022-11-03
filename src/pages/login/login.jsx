import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: 400 }}>
        <img src={"https://cdn.glitch.global/ba37ca7a-26f4-4674-bea2-b77346f737cf/smart_inventory_logo.png?v=1666977749129"} alt="logo" style={{ width: 400 }} />
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
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
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a  href="/register">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}