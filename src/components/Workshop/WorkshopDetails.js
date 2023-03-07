import { Col, Form, Input, Row } from "antd";
import React from 'react'

// "area_specialization_id": 2,
// "sub_area": "Cryptography",
// "title": "Second workshop",
// "begin_date": "2023-02-12",
// "end_date": "2023-02-16",
// "mode": "online",
// "participant_intake": 110

export default function WorkshopDetails() {
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
              label="Title"
              name="Title"
              rules={[
                {
                  required: true,
                  message: "Title is Required",
                },
              ]}
            >
              <Input placeholder="RealTime Covid Analysis"/>
            </Form.Item>
          </Col>
        <Col span={12}>
            <Form.Item
              label="Area Specialization"
              name="Area Specialization"
              rules={[
                {
                  required: true,
                  message: "Area Specialization is Required",
                },
              ]}
            >
              <Input placeholder="2"/>
            </Form.Item>
          </Col>
          
        </Row>
        <Row>
        
        <Col span={12}>
            <Form.Item
              label="Sub Area"
              name="Sub Area"
              rules={[
                {
                  required: true,
                  message: "Sub Area is Required",
                },
              ]}
            >
              <Input placeholder="Sub Area"/>
            </Form.Item>
          </Col>
        <Col span={12}>
            <Form.Item
              label="Mode"
              name="Mode"
              rules={[
                {
                  required: true,
                  message: "Mode is Required",
                },
              ]}
            >
              <Input placeholder="online"/>
            </Form.Item>
          </Col>
          
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Begin Date"
              name="Begin Date"
              rules={[
                {
                  required: true,
                  message: "Sub Area is Required",
                },
              ]}
            >
              <Input placeholder="AI"/>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              label="End Date"
              name="End Date"
              rules={[
                {
                  required: true,
                  message: "End Date is Required",
                },
              ]}
            >
              <Input placeholder="online"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
          <Form.Item
              label="Total Intake"
              name="Total Intake"
              rules={[
                {
                  required: true,
                  message: "Total Intake is Required",
                },
              ]}
            >
              <Input placeholder="120"/>
            </Form.Item>
          </Col>
          </Row>
      </Form>
 
    </div>
  )
}
