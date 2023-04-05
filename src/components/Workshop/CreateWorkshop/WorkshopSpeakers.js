import { Row, Col, Table, Form, Input, Button, Modal, Typography, Select, Divider, Spin, Empty } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWorkshopDetails, selectWorkshopSpeakersDetails } from '../../../redux/slices/workshop-slice';
import NoDataText from '../../Extras/NoDataText';
import { isLoading } from '../../../utils/helper';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { addWorkshopSpeaker, fetchSpecializationAreas, fetchWorkshopSpeakers, findWorkshopSpeakerDetails, modifyWorkshopSpeakerDetails, removeWorkshopSpeaker } from '../../../utils/apiCallHandlers';
import { useParams } from 'react-router-dom';

const { Option } = Select;
const { Title } = Typography;

const getTableDataHandler = (workshopSpeakersDetails) => {
    return workshopSpeakersDetails.map((speakerDetails, index) => ({
        key: index,
        id: speakerDetails.id,
        name: speakerDetails.person_name,
        mobileNo: speakerDetails.mobile_no,
        emailId: speakerDetails.email_id,
        designation: speakerDetails.designation,
        specialization: speakerDetails.specialization,
        specializationId: speakerDetails.specialization_id ?? null,
        country: speakerDetails.country,
        stateName: speakerDetails.state_name ?? <NoDataText />,
        organizationName: speakerDetails.organization_name
    }));
};

const AddEditWorkshopSpeakdersModal = ({
    edit = false,
    showModal,
    setShowModal,
    workshopSpeakerDetails = {},
    specializationAreas,
}) => {
    const initialValues = {
        person_name: workshopSpeakerDetails.name ?? null,
        email_id: workshopSpeakerDetails.emailId ?? null,
        mobile_no: workshopSpeakerDetails.mobileNo ?? null,
        designation: workshopSpeakerDetails.designation ?? null,
        specialization_id: workshopSpeakerDetails.specializationId ?? null,
        country: workshopSpeakerDetails.country ?? null,
        state_name: workshopSpeakerDetails.stateName ?? null,
        organization_name: workshopSpeakerDetails.organizationName ?? null
    };

    const [ form ] = Form.useForm();
    const dispatch = useDispatch();
    const { workshopId } = useParams();

    const [searchedSpeakersOptions, setSearchedSpeakersOptions] = useState([]);
    const [selectedSpeakerId, setSelectedSpeakerId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        form.setFieldsValue(initialValues);
        setLoading(false);
    }, [showModal]);

    const speakerSearchHandler = (searchValue) => {
        if(searchValue.length > 0) {
            if(searchTimeout)
                clearTimeout(searchTimeout);    
            const timeoutVal = setTimeout(async() => {
                try {
                    setLoading(true);
                    const response = await fetchWorkshopSpeakers(searchValue);
                    const speakerOptions = response.map(speaker => ({
                        value: speaker.id,
                        label: speaker.person_name
                    }));
                    setSearchedSpeakersOptions(speakerOptions);
                    setLoading(false);
                }
                catch(error) {
                    setLoading(false);
                }
            }, 500);
            setSearchTimeout(timeoutVal);
        }
    };

    const speakerChangeHandler = (value) => {
        setSelectedSpeakerId(value);
    }

    const searchSpeakersBox = (
        <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Search speakers by name"
            onChange={speakerChangeHandler}
            onSearch = {speakerSearchHandler}
            options={searchedSpeakersOptions}
            notFoundContent={loading ? <Spin size="small" /> : <Empty />}
            defaultActiveFirstOption = {false}
            filterOption={false}
            value = {selectedSpeakerId}
        />
    );

    const addSpeakerToWorkshopHandler = async () => {
        setLoading(true);
        try {
            await addWorkshopSpeaker(workshopId, [selectedSpeakerId]);
            setLoading(false);
            setShowModal(false);
            await dispatch(fetchWorkshopDetails(workshopId));
        }
        catch(error) {
            setLoading(false);
        }
    };

    const addEditWorkshopSpeakerDetails = async () => {
        setLoading(true);
        try {
            await form.validateFields();
            const data = form.getFieldsValue();
            if(edit) {
                data.id = workshopSpeakerDetails.id
            }
            await modifyWorkshopSpeakerDetails(data, edit);
            setLoading(false);
            setShowModal(false);
            await dispatch(fetchWorkshopDetails(workshopId));
        }
        catch(error) {
            setLoading(false);
        }
    }

    const addEditForm = (
        <Form
            form = {form}
            labelCol={{
                span: 10,
              }}
            wrapperCol={{
                span: 14,
            }}
        >
            <Row justify = {"space-between"} style = {{marginTop: '24px'}}>
                <Col span = {11}>
                    <Form.Item 
                        label = {"Name"} 
                        name = {"person_name"}
                        rules = {[
                            {
                                required: true,
                                message: "Name is required!"
                            }
                        ]}
                    >
                        <Input placeholder = {"Boba Fett"}/>
                    </Form.Item>
                </Col>
                <Col span = {11}>
                    <Form.Item
                        label = {"Email Id"}
                        name = {"email_id"}
                        rules = {[
                            {
                                required: true,
                                message: "Email Id is required!"
                            },
                            {
                                type: 'email',
                                message: "Please enter a valid email!"
                            }
                        ]}
                    >
                        <Input placeholder = {"abc@xyz.com"} disabled = {edit}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify = {"space-between"}>
                <Col span = {11}>
                    <Form.Item
                     label = {"Mobile Number"}
                     name = {"mobile_no"}
                     rules = {[
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
                        <Input type = "number" placeholder = {"9876543210"} disabled = {edit}/>
                    </Form.Item>
                </Col>
                <Col span = {11}>
                    <Form.Item
                        label = {"Desgination"}
                        name = {"designation"}
                        rules = {[
                            {
                                required: true,
                                message: "Desgination is required!"
                            }
                        ]}
                    >
                        <Input placeholder = {"Software Engineer"} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify = {"space-between"}>
                <Col span = {11}>
                    <Form.Item
                        label = {"Specialization"}
                        name = {"specialization_id"}
                        rules = {[
                            {
                                required: true, 
                                message: "Specialization is required!"
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
                <Col span = {11}>
                    <Form.Item
                        label = {"Organization Name"}
                        name = {"organization_name"}
                        rules = {[
                            {
                                required: true, 
                                message: "Organization name is required!"
                            }
                        ]}
                    >
                        <Input placeholder = {"Google Inc."} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify = {"space-between"}>
                <Col span = {11}>
                    <Form.Item
                        label = {"Country"}
                        name = {"country"}
                        rules = {[
                            {
                                required: true, 
                                message: "Country name is required!"
                            }
                        ]}
                    >
                        <Input placeholder = {"India"} />
                    </Form.Item>
                </Col>
                <Col span = {11}>
                    <Form.Item
                        label = {"State Name"}
                        name = {"state_name"}
                    >
                        <Input placeholder = {"Uttar Pradesh"} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );

    return (
        <Modal
            centered
            open = {showModal}
            confirmLoading = {loading}
            okText = {edit ? "Edit speaker" : "Add speaker"}
            onOk = {addEditWorkshopSpeakerDetails}
            onCancel = {() => setShowModal(false)}
            width = {'55%'}
            title = {<Title level = {4} className = {"no-margin"}>{edit ? "Edit Speaker Details": "Add Speaker" }</Title>}
        >
            {
                edit
                ?
                    addEditForm
                :
                <>
                    <Row justify = {"end"}>
                        <Col span = {24}>
                            <Form.Item label = {<Title level = {5} className = {"no-margin"}>Search Speaker</Title>}>
                                { searchSpeakersBox }
                            </Form.Item>
                        </Col>
                        <Button 
                            type = {"primary"}
                            loading = {loading}
                            onClick = {addSpeakerToWorkshopHandler}
                        >
                            Add Speaker to Workshop
                        </Button>
                    </Row>
                    <Divider orientation = {"middle"} orientationMargin = {0}>Or Add New Speaker</Divider>
                    { addEditForm }
                </>
            }
        </Modal>
    );
};

const WorkshopSpeakers = () => {
    const workshopSpeakersDetails = useSelector(selectWorkshopSpeakersDetails);

    const dispatch = useDispatch();
    const { workshopId } = useParams();

    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedSpeakerDetails, setSelectedSpeakerDetails] = useState({});
    const [specializationAreas, setSpecializationAreas] = useState(null);
    
    useEffect(() => {
        fetchSpecializationAreas(setSpecializationAreas);
    }, []);

    const onEditBtnClickHandler = (speakerDetails) => {
        setEdit(true);
        setSelectedSpeakerDetails(speakerDetails);
        setShowModal(true);
    };

    const onDeleteBtnClickHandler = async (speakerDetails) => {
        const speakerId = speakerDetails.id;
        setLoading(true);
        try {
            await removeWorkshopSpeaker(workshopId, speakerId);
            setLoading(false);
            await dispatch(fetchWorkshopDetails(workshopId));
        }
        catch(err) {
            setLoading(false);
        } 
    };

    const onAddBtnClickHandler = () => {
        setShowModal(true);
        setEdit(false);
        setSelectedSpeakerDetails({});
    };

    const columns = [
        {
            key: 'id',
            width: 0
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobileNo',
            key: 'mobileNo',
            align: 'center'
        },
        {
            title: 'Email Id',
            dataIndex: 'emailId',
            key: 'emailId',
            align: 'center'
        },
        {
            title: 'Desgination',
            dataIndex: 'designation',
            key: 'desgination',
            align: 'center'
        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization',
            align: 'center'
        },
        {
            key: 'specializationId',
            render: () => null,
            align: 'center',
            width: 0
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            align: 'center'
        },
        {
            title: 'State',
            dataIndex: 'stateName',
            key: 'stateName',
            align: 'center'
        },
        {
            title: 'Organization Name',
            dataIndex: 'organizationName',
            key: 'organizationName',
            align: 'center'
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (_, speakerDetails) => (
                <Button 
                    icon = {<EditOutlined />} 
                    type = {"link"}
                    onClick = {() => onEditBtnClickHandler(speakerDetails)}
                />
            ),
            width: '70px',
            align: 'center'
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (_, speakerDetails) => (
                <Button 
                    icon = {!loading ? <DeleteOutlined />: null} 
                    type = {"link"}
                    loading = {loading}
                    danger
                    onClick = {() => onDeleteBtnClickHandler(speakerDetails)}
                />
            ),
            width: '80px',
            align: 'center'
        }
    ];

    return ( 
        <Row>
            <Col span = {24}>
                <Row justify = {"end"}>
                    <Button
                        onClick = {onAddBtnClickHandler}
                        type = {"primary"}
                        style = {{marginBottom: "24px"}}
                    >
                        Add Workshop Speakers
                    </Button>
                </Row>
                <Table 
                    dataSource={getTableDataHandler(workshopSpeakersDetails)} 
                    columns={columns} 
                    scroll={{y: 220}} 
                    pagination = {false}
                    bordered
                />
            </Col>
            <AddEditWorkshopSpeakdersModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                edit = {edit} 
                workshopSpeakerDetails={selectedSpeakerDetails}
                specializationAreas = {specializationAreas}
            />
        </Row>
    );
};

export default WorkshopSpeakers;