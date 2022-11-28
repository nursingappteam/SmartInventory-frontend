import React from "react";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import "./ForgetPassword.css";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        (domain) => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { autoCompleteResult } = this.state;
    const { navigation } = this.props;
    const onFinish = async (values) => {
      const request_url =
        "https://smartinventory-backend.glitch.me/users/newUser";
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
            navigation("/");
          }
        })
        .catch((error) => {
          alert("Email already taken.");
        });
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
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
    /* const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86",
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    ); */

    const websiteOptions = autoCompleteResult.map((website) => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form ref={this.formref} {...formItemLayout} onFinish={onFinish}>
        <img
          src={
            "https://cdn.glitch.global/8f82fd3a-14bb-4138-b568-087de2f01eea/logo.png"
          }
          className="img"
          alt="logo"
        />
        <div className="title">
          <h1>Forget Password Request Form</h1>
          <h2>An email with reset password prompt will be sent to your email</h2>
        </div>
        <div className="text_box">
          
          <Form.Item
            name="username"
            label="E-mail"
            tooltip="Please enter your UTA email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Send Forget Password Request
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }
}

export default function (props) {
  const navigation = useNavigate();

  return <RegistrationForm {...props} navigation={navigation} />;
}

//export default RegistrationForm;
