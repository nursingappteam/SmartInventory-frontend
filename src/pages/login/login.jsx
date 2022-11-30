import React from "react";
import "antd/dist/antd.css";
import "./styles.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

const NormalLoginForm = ({ setAccessToken }) => {
  // move to registration page
  const toReg = () => {
    var data = { accessToken: 1 };
    setAccessToken(data);
  };
  //const navigate = useNavigate();

  /* const toRegister = () => {
    navigate("/register");
  };

  const toForgetPassword = () =>{
    navigate("/ForgetPassword");
  }

  const toDashboard = () => {
    navigate("/Dashboard");
  }; */

  // logic for Login
  let onFinish = async (values) => {
    const request_url = "/users/validateUser";
    const { username, password } = values;

    //axios request options
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key: API_KEY,
      },
      data: {
        user_email: username,
        password,
      },
      url: request_url,
    };

    //axios request
    const response = await axios(options)
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("user_type_id", response.data.user_type_id);
          sessionStorage.setItem("user_id", response.data.user_id);
          sessionStorage.setItem("user_name", response.data.user_name);
          // assign an access token to allow user to pass
          setAccessToken({ accessToken: 5 });
        }
      })
      .catch((error) => {
        alert("Your credentials are incorrect. Try again.");
      });
  };

  return (
    <div className="container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className="login-sider">
          <h2>New Here?</h2>
          <div>
            Sign up and take advantage of UTA's Nursing Department inventory.
            <Form.Item>
              <Button
                type="button"
                onClick={toReg}
                className="login-form-signup-button"
              >
                Sign Up
              </Button>
            </Form.Item>
          </div>
          <img
            className="img"
            src={
              "https://cdn.glitch.global/8f82fd3a-14bb-4138-b568-087de2f01eea/uta.png?v=1667445058928"
            }
          />
        </div>
        <div className="login-form-container">
          <img
            src={
              "https://cdn.glitch.global/8f82fd3a-14bb-4138-b568-087de2f01eea/logo.png?v=1667445088387"
            }
          />
          <h1>Login to Your Account</h1>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username/Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username/Email"
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
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <a className="login-form-forgot" href="" onClick={toForgetPassword} >
            Forgot password?
          </a>
        </div>
      </Form>
    </div>
  );
};

export default NormalLoginForm;
