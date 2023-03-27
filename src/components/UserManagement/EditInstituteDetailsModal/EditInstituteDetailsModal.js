import { useSelector, useDispatch } from "react-redux";
import { Modal, Typography, Form, Input, Row, Col, Select } from "antd";

import { selectUserData, selectUserApiCallStatus, modifyInstituteDetails } from "../../../redux/slices/user-slice";
import { isLoading } from "../../../utils/helper";

const { Title } = Typography;
const { Option } = Select;

const EditInstituteDetailsModal = ({
    showModal,
    editDetails,
    setShowModal,
    setLoadUserDetails
}) => {
    const userData = useSelector(selectUserData);
    const apiCallStatus = useSelector(selectUserApiCallStatus);

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const data = {
        aicte_approved: userData?.institute_details?.aicte_approved || null,
        institute_name: userData?.institute_details?.institute_name || null,
        institute_type: userData?.institute_details?.institute_type || null,
        institute_address: userData?.institute_details?.institute_address || null,
        state_name: userData?.institute_details?.state_name || null,
        district_name: userData?.institute_details?.district_name || null,
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
            await dispatch(modifyInstituteDetails(thunkFnArguments));
            setShowModal(false);
            setLoadUserDetails(true);
        }
        catch(error) {}
    };

    return (
        <Modal
            centered
            open = {showModal}
            confirmLoading = {isLoading(apiCallStatus)}
            okText = {"Save Changes"}
            onOk = {onSubmitHandler}
            onCancel = {() => setShowModal(false)}
            width = {'55%'}
            title = {<Title level = {4} className = {"no-margin"}>Edit Institute Details</Title>}
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
                    <Col span = {11}>
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
                    <Col span = {11}>
                        <Form.Item name = "aicte_approved" label = "AICTE Approved">
                            <Select>
                                <Option value = {true}>Yes</Option>
                                <Option value = {false}>No</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default EditInstituteDetailsModal;