import { Col, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { 
  selectWorkshopInstituteDetails
} from '../../../redux/slices/workshop-slice';

const { Option } = Select;

export default function InstituteDetails({
  setFormObj,
  setExtraApiRequestData
}) {

  const [form] = Form.useForm();

  const instituteDetails = useSelector(selectWorkshopInstituteDetails);

  const isEditing = Object.keys(instituteDetails).length > 0;
  const initialValues = {
    aicte_approved: instituteDetails.aicte_approved != undefined ? instituteDetails.aicte_approved : null,
    institute_name: instituteDetails.institute_name || null,
    institute_type: instituteDetails.institute_type || null,
    institute_address: instituteDetails.institute_address || null,
    state_name: instituteDetails.state_name || null,
    district_name: instituteDetails.district_name || null,
  };
  useEffect(() => {
    setFormObj(form);
    setExtraApiRequestData({
      edit: isEditing,
      updateWorkshop: true
    });
  }, []);

  return (
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 12,
        }}
        layout="horizontal"
        form = {form}
        initialValues = {initialValues}
      >
        <Row>
          <Col span={12}>
            <Form.Item name = "institute_name" label = {"Institute Name"}
                rules = {[
                    {
                        required: true,
                        message: "Institute Name is required!"
                    }
                ]}
            >
                <Input placeholder="Enter Institute Name"/>
            </Form.Item>
          </Col>
          <Col span = {12}>
            <Form.Item name = "institute_address" label = {"Address"}
                rules = {[
                    {
                        required: true, 
                        message: "Institute Address is required!"
                    }
                ]}
            >
                <Input placeholder="Enter address"/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span = {12}>
              <Form.Item name = "district_name" label = "District Name">
                  <Input placeholder = {"Enter district name"}/>
              </Form.Item>
          </Col>
          <Col span = {12}>
              <Form.Item name = "state_name" label = "State Name">
                  <Input placeholder = {"Enter State name"}/>
              </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
          <Form.Item name = "institute_type" label = "Institute Type"
              rules={[
                  {
                      required: true,
                      message: "Institute Type is required!"
                  }
              ]}
          >
              <Select>
                  <Option value = "Private University">Private University</Option>
                  <Option value = "Government Affiliated">Government Affiliated</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span = {12}>
              <Form.Item name = "aicte_approved" label = "AICTE Approved">
                  <Select>
                      <Option value = {true}>Yes</Option>
                      <Option value = {false}>No</Option>
                  </Select>
              </Form.Item>
          </Col>
        </Row>
      </Form>
  );
}
