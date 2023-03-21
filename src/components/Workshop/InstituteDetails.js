import { Col, Form, Input, Row } from "antd";
import React from "react";

export default function InstituteDetails() {
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
              label="AICTE Approved"
              name="AICTE Approved"
              rules={[
                {
                  required: true,
                  message: "This is Required",
                },
              ]}
            >
              <Input placeholder="Yes"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Institution Type"
              name="Institution Type"
              rules={[
                {
                  required: true,
                  message: "Institution Type is Required",
                },
              ]}
            >
              <Input placeholder="Government"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
          <Form.Item
              label="Institution Name "
              name="Institution Name"
              rules={[
                {
                  required: true,
                  message: "Institution Name is Required",
                },
              ]}
            >
              <Input placeholder="IET Lucknow"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Institution Address"
              name="Institution Address"
              rules={[
                {
                  required: true,
                  message: "Institution Address is Required",
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
      </Form>
    </div>
  );
}
