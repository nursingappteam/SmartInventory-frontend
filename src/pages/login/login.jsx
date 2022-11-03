import React from "react";
import "antd/dist/antd.css";
import "./styles.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
//import uta from "https://cdn.glitch.global/8f82fd3a-14bb-4138-b568-087de2f01eea/uta.png?v=1667445058928";
//import logo from "https://cdn.glitch.global/8f82fd3a-14bb-4138-b568-087de2f01eea/logo_remaster.png?v=1667445064207";

import axios from 'axios';



const NormalLoginForm = () => {
  
  /*const instance = axios.create({
    baseURL: 'https://smartinventory-backend.glitch.me'
  });
  
  instance.defaults.headers.common['Authorization'] = REACT_APP_API_KEY;
  */
  
  let onFinish = async (values) => {
    const request_url = 'https://smartinventory-backend.glitch.me/users/validateUser'
    const {username, password} = values
    const options = {
      method: 'POST',
      url: request_url,
      headers: { 'content-type': 'application/x-www-form-urlencoded',
                 'api_key': REACT_APP_API_KEY},
      data: {
        'username': username,
        'password': password
      }
    };
    console.log(options);
    await axios(options);
    // axios.post('https://smartinventory-backend.glitch.me/users/validateUser', 
    //            {"username": username, 
    //             "password": password }, null)
    //   .then(res => {
    //     if(res.data.validation){
    //       alert("Your password is correct.") //TODO: navigate to inventory page
    //     }
    //     else{
    //       alert("Your password is incorrect. Try again.")
    //     }
    //   }
    //   )
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
          <img src={"https://cdn.glitch.global/8f82fd3a-14bb-4138-b568-087de2f01eea/uta.png?v=1667445058928"} className="img" />
        </div>
        <div className="login-form-container">
          <img src={"https://cdn.glitch.global/8f82fd3a-14bb-4138-b568-087de2f01eea/logo.png?v=1667445088387"} />
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
