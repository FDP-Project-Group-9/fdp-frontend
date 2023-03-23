import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import moment from "moment";
import { openNotificationWithIcon } from "../Extras/Notification";
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
import { Link, Navigate } from "react-router-dom";
import { registerUser, requestHandler } from "../../utils/apiCall";
import { OPEN_ROUTES, UMS_API_URLS } from "../../utils/constants";
const { Title } = Typography;
const {Option} = Select;

const RegisterForm = () => {
  const [user,setUser] = React.useState({
    "email_id": "",
    "first_name": "",
    "last_name": "",
    "title": "",
    "dob": "",
    "mobile_no": "",
    "password": "",
    "confirm_password": "",
    "role_id": "",
    "gender": ""
  });
const navigate = useNavigate();
  const handleChange = (event) => {
     setUser({...user,[event.target.id] : event.target.value})
  }
  const onFinish = async (e) => {
    try {
      await requestHandler.post(UMS_API_URLS.SIGNUP, user);
      if(user.role_id == "2"){
        navigate(OPEN_ROUTES.UPLOAD_DOCS);
      } 
      else {
        navigate("/login");
      }
    }
    catch(error) {
      return;
    }
  };

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
          title="Register User"
          style={{
            margin: 20,
            padding: "0 40px",
            boxShadow: "0px 0px 5px 1px #e6f4ff",
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
              <Col span={12}>
                <Form.Item
                  label="Role"
                  value="role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please input your role!",
                    },
                  ]}
                >
                  <Select name="role_id" onChange={(event) => {setUser({...user,role_id:event})}}>
                    <Select.Option value="2">
                      Coordinator
                    </Select.Option>
                    <Select.Option value="3">
                      Participants
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input your title!",
                    },
                  ]}
                >
                  <Select onChange={(event) => {setUser({...user,title:event})}}>
                    <Option value="Mr.">Mr</Option>
                    <Option value="Ms.">Ms</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="first_name"
                  value="first_name"
                  onChange={handleChange}
                  rules={[
                    {
                      required: true,
                      message: "Please input your First Name!",
                    },
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  onChange={handleChange}
                  value="last_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Last Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email_id"
                  value="email_id"
                  onChange={handleChange}
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    {
                      type: 'email',
                      message: "Please Enter a valid email!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mobile No."
                  name="mobile_no"
                  value="mobile_no"
                  onChange={handleChange}
                  rules={[
                    {
                      required: true,
                      message: "Please input your mobile no!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('mobile_no').length == 10) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The length of mobile number should be 10!'));
                      },
                    }),
                  ]}
                >
                  <Input type="number" maxLength={10} minLength={10}/>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Gender"
                  name="gender"
                  value="gender"
                  rules={[
                    {
                      required: true,
                      message: "Please input your gender!",
                    },
                  ]}
                >
                  <Select  onChange={(event) => {setUser({...user,gender:event})}}>
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Date of Birth"
                  name="dob"
                  value="dob"
                  rules={[
                    {
                      required: true,
                      message: "Date of birth is Required!",
                    },
                  ]}
                >
                  <DatePicker format={"YYYY-MM-DD"}  onChange={(event) => {setUser({...user,dob:moment(event).format("YYYY-MM-DD")})}}/>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
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
              <Col span={12}>
                <Form.Item
                  label="Confirm Password"
                  name="confirm_password"
                  value="confirm_password"
                  onChange={handleChange}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input type="password" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
           
          </Form>
          <div style={{alignItems:"center", alignSelf:"center"}}>Aleady have a account? <Link to="/login">login</Link> </div>
        </Card>
      </div>
    </>
  );
};

export default RegisterForm;