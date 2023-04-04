import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Descriptions, Row, Col, Typography, Space, Button, Divider, Avatar, Empty } from 'antd'; 
import { EditOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

import styles from './Profile.module.css';
import { selectUserData, selectUserApiCallStatus } from '../../../redux/slices/user-slice';
import { fetchUserDetails } from '../../../redux/slices/user-slice';
import { getUserId, getJWTData, makeUserNameString, formatDate, isLoading, apiStatusFailed } from '../../../utils/helper';
import { ROLE_NAMES } from '../../../utils/constants';
import Building from '../../../assets/images/building.png';
import EditPersonalDetailsModal from '../EditPersonalDetailsModal/EditPersonalDetailsModal';
import EditExtraDetailsModal from '../EditExtraDetailsModal/EditExtraDetailsModal';
import EditInstituteDetailsModal from '../EditInstituteDetailsModal/EditInstituteDetailsModal';
import NoDataText from '../../Extras/NoDataText';
import EmptyCard from '../../Extras/Empty';

const { Text, Title } = Typography;

const topProfileContent = (userData, roleName) => {
    const title =userData?.personal_details?.title;
    const firsName = userData?.personal_details?.first_name;
    const lastName = userData?.personal_details?.last_name;
    const userName = makeUserNameString(title, firsName, lastName);
    const userEmailId = userData?.personal_details?.email_id || "";
    const userMobileNo = userData?.personal_details?.mobile_no || "";
    return (
        <>
            <Title level = {2} className = {'no-margin'}>{userName}</Title>
            <div className = {styles['profile-subtext']}>
                <Text className = {'font-weight-500 font-size-12'}>{roleName.toUpperCase()}</Text>
                <Space direction = {"horizontal"} size = {24}>
                    <Text type = {"secondary"}>
                        <Space size = {6} className = {'font-size-12'}>
                            <MailOutlined size = {10}/>
                            {userEmailId}
                        </Space>
                    </Text>
                    <Text type = {"secondary"}>
                        <Space size = {6} className = {'font-size-12'}>
                            <PhoneOutlined size = {10}/>
                            {userMobileNo}
                        </Space>
                    </Text>
                </Space>
            </div>
        </>
    );
};

const profileDetailsContent = (userData, setShowModal) => {
    const dob = formatDate(userData?.personal_details?.dob);
    const gender = userData?.personal_details?.gender;
    return (
        <Row justify = {"space-between"}>
            <Col span = {20}>
                <Divider orientation = {"left"} orientationMargin = {0}>Personal Details</Divider>
                <Descriptions column = {1} className = {styles['sub-content']}>
                    <Descriptions.Item label = {"DOB"} className = {"no-padding"} labelStyle = {{fontWeight: 500}}>{dob}</Descriptions.Item>
                    <Descriptions.Item label = {"Gender"} className = {"no-padding"} labelStyle = {{fontWeight: 500}}>{gender}</Descriptions.Item>
                </Descriptions>
            </Col>
            <Col span = {1}>
                <Button icon = {<EditOutlined />} type = {"link"} className = {styles['edit-btn']} onClick = {() => setShowModal(true)}/>
            </Col>
        </Row>
    );
};

const extraProfileDetailsContent = (userData, isCoordinator, setShowExtraProfileDetails, setEditDetails) => {
    const data = {
        ['Father Name']: userData?.personal_details?.father_name,
        ['Alternate Email-id']: userData?.personal_details?.alternate_email_id,
        ['Whatsapp Number']: userData?.personal_details?.whatsapp_no,
        ['District Name']: userData?.personal_details?.district_name,
        ['State Name']: userData?.personal_details?.state_name,
        ['Address']: userData?.personal_details?.permanent_address,
        ['Pincode']: userData?.personal_details?.pincode,
        ['Employee Id']: userData?.personal_details?.emp_id,
        ['Designation']: userData?.personal_details?.designation,
        ['Experience']: userData?.personal_details?.experience ? userData?.personal_details?.experience + " Years": undefined,
        ['Specialization']: userData?.personal_details?.specialization,
    };

    let isEmpty = true;
    Object.entries(data).forEach(([key, value]) => {
        if(!value) {
            data[key] = <NoDataText />;
        }
        else {
            isEmpty = false;
        }
    });

    const descriptionItems = Object.entries(data).map(([key, value], index) => {
        return (
            <Descriptions.Item label = {key} className = {"no-padding"} key = {index} labelStyle = {{fontWeight: 500}}>{value}</Descriptions.Item>
        );
    });

    return (
        isCoordinator
        ?
            <Row justify = {"space-between"}>
                <Col span = {20}>
                    <Divider orientation = {"left"} orientationMargin = {0}>Extra Details</Divider>
                    {
                        isEmpty 
                        ?
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{ height: 60 }}
                                description={
                                    <span>
                                        No details found!
                                    </span>
                                }
                            >
                                <Button type="primary" onClick = {() => {
                                    setEditDetails(false);
                                    setShowExtraProfileDetails(true);
                                }}>Add Extra Details</Button>
                            </Empty>                    
                        :
                            <Descriptions column = {2} className = {styles['sub-content']}>
                                {descriptionItems}
                            </Descriptions>
                    }
                </Col>
                <Col span = {1}>
                    <Button 
                        icon = {<EditOutlined />} 
                        type = {"link"} 
                        className = {styles['edit-btn']} 
                        disabled = {isEmpty} 
                        onClick = {() => {
                            setEditDetails(true);
                            setShowExtraProfileDetails(true);
                        }}
                    />
                </Col>
            </Row>
        :
            null
    );
};

const instituteDetailsContent = (userData, isCoordinator, apiCallStatus, setShowEditInstituteDetails, setEditDetails) => {
    const data = {
        ['Institute Name']: userData?.institute_details?.institute_name,
        ['Institute Type']: userData?.institute_details?.institute_type,
        ['AICTE Approved']: userData?.institute_details?.aicte_approved != undefined && (userData?.institute_details?.aicte_approved ? 'Yes': 'No'),
        ['Institute Address']: userData?.institute_details?.institute_address,
        ['District Name']: userData?.institute_details?.district_name,
        ['State Name']: userData?.institute_details?.state_name
    };

    let isEmpty = true;
    Object.entries(data).forEach(([key, value]) => {
        if(!value) {
            data[key] = <NoDataText />;
        }
        else {
            isEmpty = false;
        }
    });

    const descriptionItems = Object.entries(data).map(([key, value], index) => {
        return (
            <Descriptions.Item label = {key} className = {"no-padding"} key = {index} labelStyle = {{fontWeight: 500}}>{value}</Descriptions.Item>
        );
    });

    return (
        isCoordinator 
        ?
            <Col span = {18}>
                <Card className = "card-container" loading = {isLoading(apiCallStatus)}>
                    <Row justify = {"space-between"}>
                        <Col span = {20}>
                            <Row>
                                <Col span = {2.5}>
                                    <Avatar size = {64} src = {Building} />
                                </Col>
                                <Col span = {21}>
                                    <Divider orientation = {"left"} orientationMargin = {0} style = {{width: "100%"}}>Institute Details</Divider>
                                </Col>
                            </Row>
                            {
                                isEmpty
                                ?
                                    <Empty
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{ height: 60 }}
                                        description={
                                            <span>
                                                No details found!
                                            </span>
                                        }
                                    >
                                        <Button type="primary" onClick = {() => {
                                            setEditDetails(false);
                                            setShowEditInstituteDetails(true);
                                        }}>Add Institute Details</Button>
                                    </Empty>                    
                                :
                                    <Descriptions className = {styles['sub-content']} column = {2}>
                                        {descriptionItems}
                                    </Descriptions>
                            }
                        </Col>
                        <Col span = {1}>
                            <Button 
                                icon = {<EditOutlined />} 
                                type = {"link"} 
                                className = {styles['edit-btn']} 
                                disabled = {isEmpty}
                                onClick = {() => {
                                    setEditDetails(true);
                                    setShowEditInstituteDetails(true);
                                }}
                            />
                        </Col>
                    </Row>
                </Card>
            </Col>
        :
            null
    );
};

const Profile = (props) => {
const apiCallStatus = useSelector(selectUserApiCallStatus);
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch();

    //state to manage when the data needs to be refreshed after editing details
    const [loadUserDetails, setLoadUserDetails] = useState(true);
    //state to manage whether we are editing/adding details
    const [editDetails, setEditDetails] = useState(true);
    //state for managing profile edit modal
    const [showEditProfileDetails, setShowEditPersonalDetails] = useState(false);
    //state for managing extra profile details modal
    const [showEditExtraProfileDetails, setShowExtraProfileDetails] = useState(false);
    //state for managing institute details modal
    const [showEditInsituteDetails, setShowEditInstituteDetails] = useState(false);

    const roleName = getJWTData().role_name;
    const isCoordinator = roleName === ROLE_NAMES.COORDINATOR;

    //use effect to fetch the profile details
    useEffect(() => {
        if(loadUserDetails){
            const userId = getUserId();
            dispatch(fetchUserDetails(userId));
            setLoadUserDetails(false);
        }
    }, [loadUserDetails]);

    return (
        <>
            <Row gutter = {[0, 24]}>
                { 
                    apiStatusFailed(apiCallStatus)
                    ?
                        <Col span = {18}>
                            <EmptyCard />
                        </Col>
                    :
                        <>
                            <Col span = {18}>
                                <Card className = "card-container" loading = {isLoading(apiCallStatus)}>
                                    <Space direction = {"vertical"} size = {0}>
                                        {/* ----------------- Top Profile Section ------------------------------ */}
                                        { topProfileContent(userData, roleName) }

                                        {/*  ----------------- Profile Details Section ---------------------------*/}
                                        { profileDetailsContent(userData, setShowEditPersonalDetails) }                                

                                        {/* -------------------------- Extra Profile Details Section ------------------------------ */}
                                        { extraProfileDetailsContent(userData, isCoordinator, setShowExtraProfileDetails, setEditDetails) }
                                    </Space>
                                </Card>
                            </Col>
                            { /* ------------------- Institute Details Section -------------------------- */ }
                            { instituteDetailsContent(userData, isCoordinator, apiCallStatus, setShowEditInstituteDetails, setEditDetails) }

                            { /* --------------------- Edit Modals ---------------------------------------- */ }
                            <EditPersonalDetailsModal 
                                showModal = {showEditProfileDetails} 
                                setShowModal = {setShowEditPersonalDetails}
                                setLoadUserDetails = {setLoadUserDetails}
                            />
                            <EditExtraDetailsModal 
                                showModal = {showEditExtraProfileDetails} 
                                editDetails = {editDetails}
                                setShowModal = {setShowExtraProfileDetails} 
                                setLoadUserDetails = {setLoadUserDetails}
                            />
                            <EditInstituteDetailsModal 
                                showModal = {showEditInsituteDetails}
                                editDetails = {editDetails}
                                setShowModal = {setShowEditInstituteDetails}
                                setLoadUserDetails = {setLoadUserDetails}
                            />
                        </>
                }
            </Row>
        </>
    );
};

export default Profile;