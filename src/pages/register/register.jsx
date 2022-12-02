import React from "react";
import "antd/dist/antd.css";
import "./register.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

const RegisterForm = () => {
  // moving to register page
  const navigate = useNavigate();

  const toLog = () => {
    navigate("/");
  };

  // logic for register
  const onFinish = async (values) => {
    const request_url = "/users/newUser";
    const { name, username, password } = values;
    // axios post options
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key: API_KEY,
      },
      data: {
        username: name,
        user_email: username,
        password,
        // regular user
        user_type: 1,
      },
      url: request_url,
    };

    //axios request
    const response = await axios(options)
      .then((response) => {
        if (response.status === 201) {
          //alert("Account Created");
          toLog();
        }
      })
      .catch((error) => {
        alert("Email already taken.");
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
          <h2>Register</h2>

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
          <h1>Registration Form</h1>
          {/* // Name */}
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          {/* // Email */}
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
          {/* // Password */}
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
          {/* // Confirm Password */}
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              // Send user to Reset password page
            >
              Register
            </Button>{" "}
            or <a onClick={toLog}>Return to Login</a>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
