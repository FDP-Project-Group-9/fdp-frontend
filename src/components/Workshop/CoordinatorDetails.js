import React from 'react'
import { Col, Form, Input, Row } from "antd";


export default function CoordinatorDetails() {
  return (
    <div style={{
      margin: 20,
      padding: "0 40px",
      alignContent: "center",
      alignItems:"center"
    }}>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 12,
        }}
        layout="horizontal"
      >
        <Row>
        <Col span={12}>
            <Form.Item
              label="Father Name"
              name="Father Name"
              rules={[
                {
                  required: true,
                  message: "Father Name is Required",
                },
              ]}
            >
              <Input placeholder="Mr. Walter White"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Whatsapp No"
              name="Whatsapp No"
              rules={[
                {
                  required: true,
                  message: "Whatsapp No is Required",
                },
              ]}
            >
              <Input placeholder="9823412567"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Permament Address"
              name="Permament Address"
              rules={[
                {
                  required: true,
                  message: "Permament Address is Required",
                },
              ]}
            >
              <Input placeholder="Delhi"/>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              label="Pincode"
              name="Pincode"
              rules={[
                {
                  required: true,
                  message: "Pincode is Required",
                },
              ]}
            >
              <Input placeholder="226021"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
          <Form.Item
              label="District"
              name="District"
              rules={[
                {
                  required: true,
                  message: "District Name is Required",
                },
              ]}
            >
              <Input placeholder="Delhi"/>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              label="State"
              name="State"
              rules={[
                {
                  required: true,
                  message: "State Name is Required",
                },
              ]}
            >
              <Input placeholder="Delhi"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
          <Form.Item
              label="Emp Id"
              name="Emp id"
              rules={[
                {
                  required: true,
                  message: "Employee Id is Required",
                },
              ]}
            >
              <Input placeholder="12345"/>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              label="Designation"
              name="Designation"
              rules={[
                {
                  required: true,
                  message: "Designation is Required",
                },
              ]}
            >
              <Input placeholder="Hod of CSE"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
          <Form.Item
              label="Specialization Id"
              name="Specialization Id"
              rules={[
                {
                  required: true,
                  message: "Specialization Id is Required",
                },
              ]}
            >
              <Input placeholder="3"/>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              label="Experience"
              name="Experience"
              rules={[
                {
                  required: true,
                  message: "Experience is Required",
                },
              ]}
            >
              <Input placeholder="12"/>
            </Form.Item>
          </Col>
        </Row>
      <Row>
        <Col span={12}>
          <Form.Item
              label="Co-cordinator Email Id"
              name="Co-cordinator Email Id"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input placeholder="3"/>
            </Form.Item>
          </Col>
         
        </Row>
      </Form>
    </div>
  )
}

// "father_name": "Optimus Prime",
//         "whatsapp_no": "1234567890",
//         "state_name": "Uttar Pradesh",
//         "district_name": "Lucknow",
//         "permanent_address": "Address new",
//         "pincode": "323232",
//         "emp_id": 123432,
//         "designation": "HOD OF CSE",
//         "specialization_id": 2,
//         "experience": 12,
//         "co_coordinator_email_id": "coordinator+1@gmail.com"
