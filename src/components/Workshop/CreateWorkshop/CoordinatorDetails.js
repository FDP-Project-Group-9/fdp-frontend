import { Col, Form, Input, Row, Select } from "antd";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";

import {
  selectWorkshopCoCoordinatorDetails,
  selectWorkshopCoordinatorDetails
} from '../../../redux/slices/workshop-slice';
import { requestHandler } from "../../../utils/apiCall";
import { SPECIALIZATION_API_URLS } from "../../../utils/apiUrls";

const { Option } = Select;

const fetchSpecializationAreas = async (setSpecializationAreas) => {
  try {
      const response = await requestHandler.get(SPECIALIZATION_API_URLS.GET_SPECIALIZATIONS);
      setSpecializationAreas(response.data);
  }
  catch(error) {}
};


export default function CoordinatorDetails({ setFormObj, setExtraApiRequestData }) {
  const [form] = Form.useForm();
  const coordinatorDetails = useSelector(selectWorkshopCoordinatorDetails);
  const coCoordinatorDetails = useSelector(selectWorkshopCoCoordinatorDetails);

  const [specializationAreas, setSpecializationAreas] = useState(null);

  const isEditing = Object.keys(coordinatorDetails).length > 0;
  const initialValues = {
    father_name: coordinatorDetails.father_name || null,
    whatsapp_no: coordinatorDetails.whatsapp_no || null,
    permanent_address: coordinatorDetails.permanent_address || null,
    alternate_email_id: coordinatorDetails.alternate_email_id || null,
    state_name: coordinatorDetails.state_name || null,
    district_name: coordinatorDetails.district_name || null,
    pincode: coordinatorDetails.pincode || null,
    emp_id: coordinatorDetails.emp_id || null,
    designation: coordinatorDetails.designation || null,
    specialization_id: coordinatorDetails.specialization_id || null,
    experience: coordinatorDetails.experience || null,
    co_coordinator_email_id: coCoordinatorDetails.email_id || null
  };

  // set the form obj to the state of parent component
  useEffect(() => {
    setFormObj(form);
    setExtraApiRequestData({
      edit: isEditing,
      updateWorkshop: true
    })
    fetchSpecializationAreas(setSpecializationAreas);
  }, []);


  return (
      <Form
        form = {form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 12,
        }}
        layout="horizontal"
        initialValues={initialValues}
      >
        <Row>
        <Col span={12}>
            <Form.Item
              label="Father Name"
              name="father_name"
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
              name="whatsapp_no"
              rules={[
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('whatsapp_no').length == 10) {
                        return Promise.resolve();
                        }
                        return Promise.reject(new Error('The length of mobile number should be 10!'));
                    },
                }),
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
              name="permanent_address"
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
              name="pincode"
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
              label="District Name"
              name="district_name"
            >
              <Input placeholder="Delhi"/>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              label="State Name"
              name="state_name"
            >
              <Input placeholder="Delhi"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
          <Form.Item
              label="Emp Id"
              name="emp_id"
            >
              <Input placeholder="12345"/>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              label="Designation"
              name="designation"
            >
              <Input placeholder="Hod of CSE"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
          <Form.Item name = "specialization_id" label = "Specialization"
              rules = {[
                  {
                      required: true,
                      message: "Specialization Area is required!"
                  }
              ]}
            >
              <Select>
                  {
                    specializationAreas 
                    ?
                        specializationAreas.map((area, index) => (
                            <Option value = {area.id} key = {index}>{area.specialization}</Option>
                        ))
                    :
                    null
                  }
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              label="Experience"
              name="experience"
            >
              <Input placeholder="12"/>
            </Form.Item>
          </Col>
        </Row>
      <Row>
        <Col span={12}>
          <Form.Item
              label="Co-coordinator Email Id"
              name="co_coordinator_email_id"
              rules={[
                {
                  type: 'email',
                  message: "Invalid email!"
                },
              ]}
            >
              <Input placeholder="example@host.com"/>
            </Form.Item>
          </Col>
        <Col span={12}>
          <Form.Item
              label="Alternate Email Id"
              name="alternate_email_id"
              rules={[
                {
                  type: 'email',
                  message: "Invalid email!"
                },
              ]}
            >
              <Input placeholder="example@host.com"/>
            </Form.Item>
          </Col>
         
        </Row>
      </Form>
  );
}

