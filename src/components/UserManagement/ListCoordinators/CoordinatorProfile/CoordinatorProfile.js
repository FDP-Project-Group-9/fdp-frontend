import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Card, Avatar, Space, Tag, Button, Divider, Descriptions, Popconfirm, Tooltip} from 'antd';

import { approveRejectCoordinator, fetchCoordinatorDetails, getIdentificationRegistrationDocument } from '../../../../utils/apiCallHandlers';
import EmptyCard from '../../../Extras/Empty';
import NoDataText from '../../../Extras/NoDataText';
import { formatDate } from '../../../../utils/helper';

import styles from './CoordinatorProfile.module.css';

const { Title } = Typography;

const CoordinatorProfile = () => {
    const { coordinatorId } = useParams();

    const [loading, setLoading] = useState(false);
    const [apiCallFailed, SetApiCallFailed] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [userDocuments, setUserDocuments] = useState({});

    const coordinatorName = `${userDetails.title} ${userDetails.first_name} ${userDetails.last_name}`;
    const avatarName = `${userDetails.first_name && userDetails.first_name.toUpperCase()[0]} ${userDetails.first_name && userDetails.last_name && userDetails.last_name.toUpperCase()[0]}`;
    let tagColor = 'orange';
    let tagContentText = '';
    let btnContent = null;

    const fetchUserDetailsHandler = async () => {
        setLoading(true);
        try {
            const details = await fetchCoordinatorDetails(coordinatorId);
            setUserDetails(details.personal_details ?? {});
            setUserDocuments(details.documents);
            setLoading(false);
        }
        catch(error) {
            setLoading(false);
            SetApiCallFailed(true);
        }
    };

    useEffect(() => {
        fetchUserDetailsHandler();
    }, []);

    const viewIdentificationDocumentHandler = async () => {
        try {
            const doc = await getIdentificationRegistrationDocument(coordinatorId);
            const url = window.URL.createObjectURL(new Blob([doc.data], {type: doc.data.type}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        catch(error) {}
    };

    const approveRejectCoordinatorHandler = async (approve = true) => {
        try {
            await approveRejectCoordinator(coordinatorId, approve);
            await fetchUserDetailsHandler();
        }
        catch(error) {}
    };
    
    if(userDetails.profile_approved) {
        tagColor = 'green';
        tagContentText = 'Approved';
        btnContent = null;
    } 
    else if(userDetails.first_name && userDetails.profile_approved == null){
        tagColor = 'orange';
        tagContentText = 'Waiting for Administrator approval';
        btnContent = (
            <Space size = {10} direction='vertical'>
                <Popconfirm
                    title = {"Approve Registration"}
                    okText = {"Yes"}
                    cancelText = {"No"}
                    onConfirm={() => approveRejectCoordinatorHandler(true)}
                    description = {<span>Are you sure you want to <b>Approve</b> this registration?</span>}
                >
                    <Button
                        type = {"primary"}
                    >
                        Approve Registration
                    </Button>
                </Popconfirm>
                <Popconfirm
                    title = {"Reject Registration"}
                    okText = {"Yes"}
                    okButtonProps={{danger: true, type: "primary"}}
                    cancelText = {"No"}
                    onConfirm={() => approveRejectCoordinatorHandler(false)}
                    description = {<span>Are you sure you want to <b>Reject</b> this registration?</span>}
                >
                    <Button
                        type='primary'
                        className = {styles['reject-btn']}
                        danger
                    >
                        Reject Registration
                    </Button>
                </Popconfirm>
            </Space>
        );
    }
    else if(userDetails.profile_approved != undefined){
        tagColor = 'red';
        tagContentText = 'Rejected';
        btnContent = (
            <Popconfirm
                title = {"Approve Registration"}
                okText = {"Yes"}
                cancelText = {"No"}
                onConfirm={() => approveRejectCoordinatorHandler(true)}
                description = {<span>Are you sure you want to <b>Approve</b> this registration?</span>}
            >
                <Button
                    type = {"primary"}
                >
                    Approve Registration
                </Button>
            </Popconfirm>
        );
    }

    return (
        <Row gutter = {[24, 24]}>
            <Col span = {18}>
                <Card className='card-container'>
                    <Title level = {2} className='no-margin'>
                        <UserOutlined />&nbsp;
                        Coordinator Details
                    </Title>
                </Card>
            </Col>
            <Col span = {18}>
                {
                    apiCallFailed
                    ?
                        <EmptyCard />
                    :
                        <Card className='card-container' loading = {loading}>
                            <Row justify={"space-between"} align = {"middle"}>
                                <Space size = {10}>
                                    <Avatar size = {128}>
                                        <strong>{avatarName}</strong>
                                    </Avatar>
                                    <Space size = {10} direction = {"vertical"}>
                                        <Title level = {3} className='no-margin'>
                                            {coordinatorName}
                                        </Title>
                                        <Tag color = {tagColor}>
                                            {tagContentText}
                                        </Tag>
                                    </Space>
                                </Space>
                                {
                                    userDetails.profile_approved
                                    ?
                                        null
                                    :
                                        btnContent
                                }
                            </Row>
                            <Divider />
                            <Row>
                                <Descriptions column={1}>
                                    <Descriptions.Item label = {"Email-Id"}>
                                        {userDetails.email_id ?? <NoDataText />}
                                    </Descriptions.Item>
                                    <Descriptions.Item label = {"Mobile Number"}>
                                        {userDetails.mobile_no ?? <NoDataText />}
                                    </Descriptions.Item>
                                    <Descriptions.Item label = {"Date Of Birth"}>
                                        {formatDate(userDetails.dob) || <NoDataText />}
                                    </Descriptions.Item>
                                    <Descriptions.Item label = {"Gender"}>
                                        {userDetails.gender ?? <NoDataText />}
                                    </Descriptions.Item>
                                    <Descriptions.Item label = {"Identification Document"}>
                                        <Tooltip
                                            title = {!userDocuments || !userDocuments.registration_doc_url ? "User has not submitted id document": ""}
                                        >
                                            <Button type = {"primary"} className = {styles['view-document-btn']}
                                                onClick = {viewIdentificationDocumentHandler}
                                                disabled = {!userDocuments || !userDocuments.registration_doc_url}
                                            >
                                                View Document
                                            </Button>
                                        </Tooltip>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Row>
                        </Card>
                }
            </Col>
        </Row>
    );
};

export default CoordinatorProfile;