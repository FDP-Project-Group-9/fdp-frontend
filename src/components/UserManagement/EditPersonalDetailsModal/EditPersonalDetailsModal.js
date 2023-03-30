import { useSelector, useDispatch } from "react-redux";
import { Modal, Typography, Form, Input, Row, Col, Select, DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";

import { selectUserData, selectUserApiCallStatus, updateUserDetails } from "../../../redux/slices/user-slice";
import { formatDayJsDate, getUserId, isLoading } from "../../../utils/helper";

const { Title } = Typography;
const { Option } = Select;

const EditPersonalDetailsModal = ({
    showModal,
    setShowModal,
    setLoadUserDetails
}) => {
    const userData = useSelector(selectUserData);
    const apiCallStatus = useSelector(selectUserApiCallStatus);

const [form] = Form.useForm();
    const dispatch = useDispatch();

    const data = {
        first_name: userData?.personal_details?.first_name || null,
        last_name: userData?.personal_details?.last_name || null,
        email_id: userData?.personal_details?.email_id || null,
        mobile_no: userData?.personal_details?.mobile_no || null,
        dob: formatDayJsDate(userData?.personal_details?.dob || null),
        title: userData?.personal_details?.title || null,
        gender: userData?.personal_details?.gender || null
    }

    const onSubmitHandler = async () => {
        try {
            await form.validateFields();
            const data = form.getFieldsValue();
            data.dob = data.dob.format('YYYY-MM-DD');
            await dispatch(updateUserDetails({ 
                data,
                userId: getUserId()
            }));
            setShowModal(false);
            setLoadUserDetails(true);
        }
        catch(err) {}
    }

    return (
        <Modal
            centered
            open = {showModal}
            confirmLoading = {isLoading(apiCallStatus)}
            okText = {"Save Changes"}
            onOk = {onSubmitHandler}
            onCancel = {() => setShowModal(false)}
            width = {'55%'}
            title = {<Title level = {4} className = {"no-margin"}>Edit Personal Details</Title>}
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
                        <Form.Item name = "first_name" label = {"First Name"}>
                            <Input placeholder="Enter First Name" disabled/>
                        </Form.Item>
                    </Col>
                    <Col span = {11}>
                        <Form.Item name = "last_name" label = {"Last Name"}>
                            <Input placeholder="Enter last name" disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"space-between"}>
                    <Col span = {11}>
                    <Form.Item name = "title" label = "Title"
                        rules = {[
                            {
                                required: true,
                                message: "Title is required!"
                            }
                        ]}
                    >
                            <Select>
                                <Option value = "Dr">Dr</Option>
                                <Option value = "Er">Er</Option>
                                <Option value = "Prof">Prof</Option>
                                <Option value = "Mr">Mr</Option>
                                <Option value = "Ms">Ms</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span = {11}>
                        <Form.Item name = "email_id" label = "Email Id"
                            rules = {[
                                {
                                    type: 'email',
                                    message: 'Invalid Email Type'
                                }
                            ]}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"space-between"}>
                    <Col span = {11}>
                        <Form.Item name = "mobile_no" label = "Mobile No."
                            rules={[
                                {
                                    required: true,
                                    message: "Mobile Number is required!"
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
                            <Input placeholder="Enter mobile number" type = "number"/>
                        </Form.Item>
                    </Col>
                    <Col span = {11}>
                        <Form.Item name = "gender" label = "Gender"
                            rules = {[
                                {
                                    required: true,
                                    message: "Gender is required!"
                                }
                            ]}
                        >
                            <Select>
                                <Option value = "Male">Male</Option>
                                <Option value = "Female">Female</Option>
                                <Option value = "Other">Other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span = {11}>
                        <Form.Item name = "dob" label = "Date Of Birth">
                            <DatePicker format={"YYYY-MM-DD"} style = {{width: '100%'}}/>
                        </Form.Item> 
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default EditPersonalDetailsModal;