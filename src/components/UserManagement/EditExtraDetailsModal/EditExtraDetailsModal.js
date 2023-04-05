import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Modal, Typography, Form, Input, Row, Col, Select } from "antd";

import { selectUserData, selectUserApiCallStatus, modifyCoordinatorExtraDetails } from "../../../redux/slices/user-slice";
import { isLoading } from "../../../utils/helper";
import { fetchSpecializationAreas } from '../../../utils/apiCallHandlers';

const { Title } = Typography;
const { Option } = Select;

const EditExtraDetailsModal = ({
    showModal,
    editDetails,
    setShowModal,
    setLoadUserDetails
}) => {
    const userData = useSelector(selectUserData);
    const apiCallStatus = useSelector(selectUserApiCallStatus);
    const [specializationAreas, setSpecializationAreas] = useState(null);

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const data = {
        father_name: userData?.personal_details?.father_name || null,
        whatsapp_no: userData?.personal_details?.whatsapp_no || null,
        permanent_address: userData?.personal_details?.permanent_address || null,
        alternate_email_id: userData?.personal_details?.alternate_email_id || null,
        state_name: userData?.personal_details?.state_name || null,
        district_name: userData?.personal_details?.district_name || null,
        pincode: userData?.personal_details?.pincode || null,
        emp_id: userData?.personal_details?.emp_id || null,
        designation: userData?.personal_details?.designation || null,
        specialization_id: userData?.personal_details?.specialization_id || null,
        experience: userData?.personal_details?.experience || null,
    };

    const onSubmitHandler = async () => {
        try {
            await form.validateFields();
            const data = form.getFieldsValue();
            const thunkFnArguments = {
                data,
                edit: editDetails, 
                updateWorkshop: false
            };
            await dispatch(modifyCoordinatorExtraDetails(thunkFnArguments));
            setShowModal(false);
            setLoadUserDetails(true);
        }
        catch(error) {}
    };

    useEffect(() => {
        fetchSpecializationAreas(setSpecializationAreas);
    }, []);

    return (
        <Modal
            centered
            open = {showModal}
            confirmLoading = {isLoading(apiCallStatus)}
            okText = {"Save Changes"}
            onOk = {onSubmitHandler}
            onCancel = {() => setShowModal(false)}
            width = {'55%'}
            title = {<Title level = {4} className = {"no-margin"}>Edit Extra Details</Title>}
        >
            <Form
                form = {form}
                labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                initialValues = {{...data}}
            >
                <Row justify = {"space-between"} style = {{marginTop: "24px"}}>
                    <Col span = {11}>
                        <Form.Item name = "father_name" label = {"Father's Name"}
                            rules = {[
                                {
                                    required: true,
                                    message: "Father's Name is required!"
                                }
                            ]}
                        >
                            <Input placeholder="Enter Father's Name"/>
                        </Form.Item>
                    </Col>
                    <Col span = {11}>
                        <Form.Item name = "permanent_address" label = {"Address"}
                            rules = {[
                                {
                                    required: true, 
                                    message: "Permanent Address is required!"
                                }
                            ]}
                        >
                            <Input placeholder="Enter address"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"space-between"}>
                    <Col span = {11}>
                        <Form.Item name = "district_name" label = "District Name">
                            <Input placeholder = {"Enter district name"}/>
                        </Form.Item>
                    </Col>
                    <Col span = {11}>
                        <Form.Item name = "state_name" label = "State Name">
                            <Input placeholder = {"Enter State name"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"space-between"}>
                    <Col span = {11}>
                        <Form.Item name = "pincode" label = "Pin Code"
                            rules={[
                                {
                                    required: true,
                                    message: "Pincode is required!"
                                }
                            ]}
                        >
                            <Input placeholder = {"Enter Pin Code"}/>
                        </Form.Item>
                    </Col>
                    <Col span = {11}>
                        <Form.Item name = "alternate_email_id" label = "Alternate Email"
                            rules = {[
                                {
                                    type: 'email',
                                    message: 'Invalid Email Type'
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"space-between"}>
                    <Col span = {11}>
                        <Form.Item name = "whatsapp_no" label = "Whatsapp No."
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
                            <Input placeholder="Enter mobile number" type = "number"/>
                        </Form.Item>
                    </Col>
                    <Col span = {11}>
                        <Form.Item name = "emp_id" label = "Employee Id">
                            <Input placeholder="Enter Employee Id"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"space-between"}>
                    <Col span = {11}>
                        <Form.Item name = "designation" label = "Desgination">
                            <Input placeholder="Enter Designation"/>
                        </Form.Item> 
                    </Col>
                    <Col span = {11}>
                        <Form.Item name = "experience" label = "Experience">
                            <Input placeholder="Enter experience in years"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span = {11}>
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
                </Row>
            </Form>
        </Modal>
    );
};

export default EditExtraDetailsModal;