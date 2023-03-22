import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  TreeSelect,
  Upload,
  Typography,
} from "antd";
import { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { openNotificationWithIcon } from "../Extras/Notification";
import { loginUser, requestHandler } from "../../utils/apiCall";
import { getJWTData, setJwtToken, setProfileStatus } from "../../utils/helper";
import { UMS_API_URLS } from "../../utils/constants";
const { Title } = Typography;
const {Option} = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const SignInForm = () => {
  const navigate = useNavigate();
  const [user,setUser] = React.useState({
    "email_id": "",
    "password": "",
  });
  const handleChange = (event) => {
     setUser({...user,[event.target.id] : event.target.value})
  }
  const onFinish = async (values) => {
    try {
      const response = await requestHandler.post(UMS_API_URLS.LOGIN, user);
      setJwtToken(response.token.split(' ')[1]);
      setProfileStatus();
      navigate(`/${getJWTData().role_name}/dashboard`);
    }
    catch(error) {
      return error;
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const formRef = React.createRef();
  return (
    <>
      {/* <Row> */}
      <div span={24} style={{ margin: 5, padding: 20 }}>
        <Row style={{ paddingLeft: 40, paddingRight: 40 }}>
          <Col span={10}>
            {" "}
            <img
              style={{ width: "100px" }}
              className="logo"
              src="https://aktu.ac.in/images/uptu_logo.png"
              alt=""
            />
          </Col>
          <Col span={10}>
            <Title level={1}>FDP Portal</Title>
          </Col>
          <Col span={4}>
            <Title level={3}>IET Lucknow</Title>
          </Col>
        </Row>

        <Card
          title="Sign In"
          style={{
            margin: "20px 200px",
            padding: "0 40px",
            boxShadow: "1px 2px 5px black",
            alignContent: "center",
            alignItems:"center"
          }}
        >
          <Form
            ref={formRef}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            layout="horizontal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            // style={{
            //   maxWidth: 600,
            // }}
          >
           
           
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email_id"
                  value="email_id"
                  onChange={handleChange}
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
                      message: "Please input valid email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
              <Form.Item
                  label="Password"
                  name="password"
                  value="password"
                  onChange={handleChange}
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input type="password"/>
                </Form.Item>
              </Col>
            </Row>
       
            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
           
          </Form>
          <div style={{alignItems:"center", alignSelf:"center"}}>New User?  <Link to="/signup">Register</Link></div>
        </Card>
      </div>
    </>
  );
};

export default SignInForm;