import { useEffect, useState } from 'react'
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useSelector } from 'react-redux';

import { selectWorkshopDetails } from '../../../redux/slices/workshop-slice';
import { SPECIALIZATION_API_URLS } from '../../../utils/apiUrls';
import { requestHandler } from '../../../utils/apiCall';
import { formatDayJsDate } from '../../../utils/helper';

const { Option } = Select;

const fetchSpecializationAreas = async (setSpecializationAreas) => {
  try {
      const response = await requestHandler.get(SPECIALIZATION_API_URLS.GET_SPECIALIZATIONS);
      setSpecializationAreas(response.data);
  }
  catch(error) {}
};

export default function WorkshopDetailsForm({ 
  setFormObj,
  setExtraApiRequestData
}) {

  const [ form ] = Form.useForm();
  const workshopDetails = useSelector(selectWorkshopDetails);

  const [specializationAreas, setSpecializationAreas] = useState(null);

  const isEditing = Object.keys(workshopDetails).length > 0;
  const initialValues = {
    area_specialization_id: workshopDetails.area_specialization_id || null,
    sub_area: workshopDetails.sub_area || null,
    title: workshopDetails.title || null,
    begin_date: formatDayJsDate(workshopDetails.begin_date || null),
    end_date: formatDayJsDate(workshopDetails.end_date || null),
    mode: workshopDetails.mode || null,
    participant_intake: workshopDetails.participant_intake || null
  };

  useEffect(() => {
    setFormObj(form);
    setExtraApiRequestData({
      edit: isEditing
    });
    fetchSpecializationAreas(setSpecializationAreas);
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
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Workshop title is Required",
                },
              ]}
            >
              <Input placeholder="Workshop Title"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name = "area_specialization_id" label = "Specialization"
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
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Sub Area"
              name="sub_area"
            >
              <Input placeholder="Sub Area for workshop"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mode"
              name="mode"
              rules={[
                {
                  required: true,
                  message: "Workshop Mode is Required!",
                },
              ]}
            >
              <Select>
                <Option value = "online">Online</Option>
                <Option value = "offline">Offline</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Workshop Begin Date"
              name="begin_date"
              rules={[
                {
                  required: true,
                  message: "Begin date is required!",
                },
              ]}
            >
              <DatePicker format={"YYYY-MM-DD"} style = {{width: '100%'}}/>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item
              label="Workshop End Date"
              name="end_date"
              rules={[
                {
                  required: true,
                  message: "Workshop End Date is Required!",
                },
              ]}
            >
              <DatePicker format={"YYYY-MM-DD"} style = {{width: '100%'}}/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
                label="Total Participant Intake"
                name="participant_intake"
                rules={[
                  {
                    required: true,
                    message: "Total Participant intake is Required",
                  },
                ]}
              >
                <Input placeholder="100"/>
              </Form.Item>
            </Col>
          </Row>
      </Form>
  );
}
