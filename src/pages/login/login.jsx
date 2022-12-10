import React, { useContext } from "react";
import "antd/dist/antd.css";
import "./styles.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../components/UserContext";

const API_KEY = import.meta.env.VITE_API_KEY;

const NormalLoginForm = ({ setCookies }) => {
  const { user_id, set_user_id } = useContext(UserContext);
  const { user_email, set_user_email } = useContext(UserContext);
  const { user_name, set_user_name } = useContext(UserContext);
  const { user_type_id, set_user_type_id } = useContext(UserContext);

  const navigate = useNavigate();

  const toRegister = () => {
    navigate("/register");
  };

  const toForgetPassword = () => {
    navigate("/forgetPassword");
  };

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
          setCookies("inventory_session_id", response.data.cookie);
        }
      })
      .catch((error) => {
        console.log(error);
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
                onClick={toRegister}
                className="login-form-signup-button"
                size="large"
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
          <a className="login-form-forgot" onClick={toForgetPassword}>
            Forgot password?
          </a>
        </div>
      </Form>
    </div>
  );
};

export default NormalLoginForm;
