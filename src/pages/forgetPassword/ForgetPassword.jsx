import React from "react";
import "antd/dist/antd.css";
import "./ForgetPassword.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

const ForgetPasswordForm = () => {
  // moving to register page
  const navigate = useNavigate();

  const toRegister = () => {
    navigate("/register");
  };

  const toForgetPassword = () =>{
    navigate("/ForgetPassword");
  }

  const toDashboard = () => {
    navigate("/Dashboard");
  };
  // logic for Login
  let onFinish = async (values) => {
    const request_url =
      "https://smartinventory-backend.glitch.me/users/validateUser";
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
          navigate("/ResetPassword");
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
          <h2>Forget Password</h2>
          <div>
            An email with confirmation code will be sent to your email to reset password.
            
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
          <h1>Please enter your email</h1>
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
          
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              // Send user to Reset password page
            >
              Send Reset Password Request
            </Button>
          </Form.Item>
          
        </div>
      </Form>
    </div>
  );
};

export default ForgetPasswordForm;