import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Typography, Card, Carousel, Divider, Space, Button, Popconfirm, Result, Descriptions, Empty, Skeleton, Image, Table, Upload, Affix, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { 
    fetchWorkshopDetails,
    selectSingleWorkshopData,
    selectWorkshopApiCallStatus, 
    selectWorkshopCoCoordinatorDetails,
    selectWorkshopCoordinatorDetails, 
    selectWorkshopDetails, 
    selectWorkshopDraftStatus, 
    selectWorkshopFilesDetails, 
    selectWorkshopInstituteDetails, 
    selectWorkshopSpeakersDetails
} from '../../../redux/slices/workshop-slice';

import { apiStatusFailed, formatDate, getJWTData, getUserId, isLoading } from '../../../utils/helper';
import EmptyCard from '../../Extras/Empty';
import { ReadOutlined } from '@ant-design/icons';
import { ROLE_NAMES, ROUTES } from '../../../utils/constants';
import styles from './WorkshopDetails.module.css';
import NoDataText from '../../Extras/NoDataText';
import { getTimelineStatusTag, getWorkshopStatusTag } from '../../Extras/helpers';
import { applyToWorkshop, approveWorkshop, createWorkshopBrochure, getWorkshopImage, getWorkshopMediaImage } from '../../../utils/apiCallHandlers';
import WorkshopDocuments from '../CoordinatorWorkshopDetails/WorkshopDocuments';

const { Title } = Typography;

const WorkshopDetails = ({ coordinatorWorkshop = false}) => {
    const singleWorkshopData = useSelector(selectSingleWorkshopData);
    const apiCallStatus = useSelector(selectWorkshopApiCallStatus);
    const workshopCoordinatorDetails = useSelector(selectWorkshopCoordinatorDetails);
    const workshopInsitituteDetails = useSelector(selectWorkshopInstituteDetails);
    const workshopDetails = useSelector(selectWorkshopDetails);
    const workshopCoCoordinatorDetails = useSelector(selectWorkshopCoCoordinatorDetails);
    const workshopFileDetails = useSelector(selectWorkshopFilesDetails);
    const workshopDraftStatus = useSelector(selectWorkshopDraftStatus);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { workshopId } = useParams();
    
    const [workshopMediaPhotosBlob, setWorkshopMediaPhotosBlob] = useState([]);
    const [workhsopPhotosBlob, setWorkshopPhotosBlob] = useState([]);
    const [loadingWorkshopMediaImages, setLoadingWorkshopMediaImages] = useState(false);
    const [loadingWorkshopImages, setLoadingWorkshopImages] = useState(false);
    const [errorWorkshopMediaImages, setErrorWorkshopMediaImages] = useState(false);
    const [errorWorkshopImages, setErrorWorkshopImages] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const isAdmin = getJWTData().role_name === ROLE_NAMES.ADMINISTRATOR;
    const isWorkshopDetailsEmpty = Object.keys(workshopDetails).length === 0;
    
    const getAllWorkshopMediaImages = async () => {
        setErrorWorkshopMediaImages(false);
        setLoadingWorkshopMediaImages(true);
        try {
            const response = await Promise.all(workshopFileDetails.media_photos?.map(file => getWorkshopMediaImage(file.id)));
            const fileBlob = response.map(file => {
                return window.URL.createObjectURL(new Blob([file.data], {type: file.data.type}));
            });
            setWorkshopMediaPhotosBlob(fileBlob);
            setLoadingWorkshopMediaImages(false);
        }
        catch(error) {
            setErrorWorkshopMediaImages(true);
            setLoadingWorkshopMediaImages(false);
        }
    };

    const getAllWorkshopImages = async () => {
        setErrorWorkshopImages(false);
        setLoadingWorkshopImages(true);
        try {
            const response = await Promise.all(workshopFileDetails.workshop_photos?.map(file => getWorkshopImage(file.id)));
            const fileBlob = response.map(file => {
                return window.URL.createObjectURL(new Blob([file.data], {type: file.data.type}));
            });
            setWorkshopPhotosBlob(fileBlob);
            setLoadingWorkshopImages(false);
        }
        catch(error) {
            setErrorWorkshopImages(true);
            setLoadingWorkshopImages(false);
        }
    }

    const fileLoaderFunction = async () => {
        try {
            if(workshopFileDetails.media_photos?.length > 0) {
                getAllWorkshopMediaImages();
            }
            if(workshopFileDetails.workshop_photos?.length > 0) {
                getAllWorkshopImages();
            }
        }
        catch(error) {}
    };
    
    useEffect(() => {
        dispatch(fetchWorkshopDetails(workshopId));
    }, []);
    
    useEffect(() => {
        fileLoaderFunction();
    }, [singleWorkshopData]);
    
    const approveRejectWorkshopHandler = async (approvalValue) => {
        try {
            await approveWorkshop(workshopId, approvalValue);
            await dispatch(fetchWorkshopDetails(workshopId));
        }
        catch(error) {}
    };

    const applyToWorkshopHandler = async () => {
        try {
            const userId = getUserId();
            await applyToWorkshop(workshopId, userId);
            await dispatch(fetchWorkshopDetails(workshopId));
        }
        catch(error) {}
    };

    const checkHasAppliedButton = () => {
        const hasApplied = singleWorkshopData.appliedParticipants.find(id => id === Number(getUserId()));
        return !!hasApplied;
    };


    // function to render the header content for the details card
    const getHeaderDetails = () => { 
        let actions = null;
        
        const generateWorkshopBrochure = async () => {
            setLoading(true);
            try {
                await createWorkshopBrochure(workshopId);
                setLoading(false);
                await dispatch(fetchWorkshopDetails(workshopId));
            }
            catch(error) {
                setLoading(false);
            } 
        }

        // checking which actions to show based on the role of user
        if(coordinatorWorkshop) {
            if(workshopDraftStatus) {
                actions = (
                    <Button
                        type = {"primary"}
                        onClick = {() => navigate(ROUTES.CREATE_WORKSHOP + "/" + workshopId)}
                    >
                        Complete Application
                    </Button>
                );
            }
            else if(workshopDetails.workshop_approval_status && workshopFileDetails.other_docs && !workshopFileDetails.other_docs.brochure_exists) {
                actions = (
                    <Button
                        type = {"primary"}
                        onClick = {generateWorkshopBrochure}
                        loading = {loading}
                    >
                        Generate Workshop Brochure
                </Button>
                );
            }
        }
        else {
            if(isAdmin) {
                const approveWorkshopBtn = (
                    <Popconfirm
                        title = {"Approve Workshop Proposal!"}
                        okText = {"Yes"}
                        cancelText = {"No"}
                        onConfirm={() => approveRejectWorkshopHandler(true)}
                        description = {<span>Are you sure you want to <b>Approve</b> this workshop proposal?</span>}
                    >
                        <Button
                            type = {"primary"}
                        >
                            Approve Workshop Proposal
                        </Button>
                    </Popconfirm>
                );
                if(!isWorkshopDetailsEmpty && workshopDetails.workshop_approval_status === null) {
                    actions = (
                        <Space direction = {"horizontal"}>
                            <Popconfirm
                                title = {"Reject Workshop Proposal!"}
                                okText = {"Yes"}
                                okButtonProps = {{danger: true}}
                                cancelText = {"No"}
                                onConfirm={() => approveRejectWorkshopHandler(false)}
                                description = {<span>Are you sure you want to <b>Reject</b> this workshop proposal?</span>}
                            >
                                <Button
                                    type = {"primary"}
                                    className = {styles['reject-btn-style']}
                                    danger
                                >
                                    Reject Workshop Proposal
                                </Button>
                            </Popconfirm>
                            {approveWorkshopBtn}
                        </Space>
                    );
                }
                else if(!isWorkshopDetailsEmpty && !workshopDetails.workshop_approval_status){
                    actions = approveWorkshopBtn;
                }
            }
            else if(!checkHasAppliedButton()){
                actions = (
                    <Popconfirm
                        title = {"Apply to Workshop!"}
                        okText = {"Yes"}
                        cancelText = {"No"}
                        onConfirm={applyToWorkshopHandler}
                        description = {<span>Are you sure you want to <b>Apply</b> to this workshop?</span>}
                    >
                        <Tooltip title = {Number(getUserId()) === singleWorkshopData.coordinatorDetails?.user_id ? "Cannot apply to own workshop!": ""}>
                            <Button
                                disabled = {Number(getUserId()) === singleWorkshopData.coordinatorDetails?.user_id}
                                type = {"primary"}
                            >
                                Apply to Workshop
                            </Button>
                        </Tooltip>
                    </Popconfirm>
                );
            }
        }

        return (
            <Row justify = {"space-between"} align = {"middle"}>
                <Col>
                    <Title level = {4} className='no-margin'>
                        {workshopDetails.title ?? "Untitled"}
                    </Title>
                </Col>
                <Col>
                    {actions}
                </Col>
            </Row>      
        );
    };

    const getWorkshopBodyDetails = () => {
        const workshopDataObj = {
            ['Approval Status']: getWorkshopStatusTag(workshopDetails.workshop_completed, workshopDetails.workshop_approval_status),
            ['Timeline Status']: getTimelineStatusTag(workshopDetails.begin_date, workshopDetails.end_date),
            ['Workshop Specialization Area']: workshopDetails.area_specialization || <NoDataText />,
            ['Workshop Sub Area']: workshopDetails.sub_area || <NoDataText />,
            ['Participant Intake']: workshopDetails.participant_intake || <NoDataText />,
            ['Workshop Mode']: workshopDetails.mode?.toUpperCase() || <NoDataText />,
            ['Workshop Start Date']: formatDate(workshopDetails.begin_date) || <NoDataText />,
            ['Workshop End Date']: formatDate(workshopDetails.end_date) || <NoDataText />
        };

        const coordinatorDataObj = {
            ['Coordinator Name']: workshopCoordinatorDetails.title ? `${workshopCoordinatorDetails.title} ${workshopCoordinatorDetails.first_name} ${workshopCoordinatorDetails.last_name}`: <NoDataText />,
            ['Coordinator Email-id']: workshopCoordinatorDetails.email_id,
            ['Insitute Name']: workshopInsitituteDetails.institute_name || <NoDataText />,
            ['Institute Address']: workshopInsitituteDetails.institute_address || <NoDataText />,
            ['Institute District']: workshopInsitituteDetails.district_name || <NoDataText />,
            ['Institute State']: workshopInsitituteDetails.state_name || <NoDataText />,
            ['AICTE Approved']: workshopInsitituteDetails.aicte_approved || <NoDataText />,
            ['Institute Type']: workshopInsitituteDetails.institute_type || <NoDataText />
        };

        if(Object.keys(workshopCoCoordinatorDetails).length > 0) {
            coordinatorDataObj['Co-cordinator Name'] = `${workshopCoCoordinatorDetails.title ?? ""} ${workshopCoCoordinatorDetails.first_name ?? ""} ${workshopCoCoordinatorDetails.last_name ?? ""}`;
            coordinatorDataObj['Co-cordinator Email-id'] = workshopCoCoordinatorDetails.email_id;
        }

        const workshopContent = Object.entries(workshopDataObj).map(([key, value], index) => (
            <Descriptions.Item label = {key} key = {index} className='font-weight-500'>
                {value}
            </Descriptions.Item>
        ));

        const coordinatorDetailsContent = Object.entries(coordinatorDataObj).map(([key, value], index) => (
            <Descriptions.Item label = {key} key = {index} className = 'font-weight-500'>
                {value}
            </Descriptions.Item>
        ));

        return (
            <>
                <Descriptions column={2}>
                    {workshopContent}        
                </Descriptions>
                <Divider orientation = {"left"} orientationMargin = {0}>Coordinator/Institute Details</Divider>
                <Descriptions column = {2}>
                    {coordinatorDetailsContent}
                </Descriptions>
            </>
        );
    };

    const WorkshopSpeakers = () => {
        const workshopSpeakersDetails = useSelector(selectWorkshopSpeakersDetails);

        const getTableDataHandler = (workshopSpeakersDetails) => {
            return workshopSpeakersDetails.map((speakerDetails, index) => ({
                key: index,
                name: speakerDetails.person_name,
                emailId: speakerDetails.email_id,
                designation: speakerDetails.designation,
                specialization: speakerDetails.specialization,
                organizationName: speakerDetails.organization_name
            }));
        };

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
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
                title: 'Organization Name',
                dataIndex: 'organizationName',
                key: 'organizationName',
                align: 'center'
            }
        ];

        return (
            <Table
                dataSource={getTableDataHandler(workshopSpeakersDetails)} 
                columns={columns} 
                scroll={workshopSpeakersDetails.length > 3 ? {y: 220}: {}} 
                pagination = {false}
                bordered
            />
        );
    };

    //function to render the main body content 
    const getMainBody = () => {
        let content = null;
        let mediaImagesContent = (
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 60 }}
                description={
                    <Title level = {5} className="no-margin">
                        No Media Images found!
                    </Title>
                }
            />
        );
        let workshopImagesContent = (
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 60 }}
                description={
                    <Title level = {5} className="no-margin">
                        No Workshop Images found!
                    </Title>
                }
            />
        );

        if(workshopFileDetails.media_photos?.length > 0) {
            mediaImagesContent = (
                <Carousel autoplay>
                    {workshopMediaPhotosBlob.map((file, index) => (
                        <Image src = {file} key = {index} height={200} width={'100%'}/>
                    ))}
                </Carousel>
            );
        }

        if(workshopFileDetails.workshop_photos?.length > 0) {
            workshopImagesContent = (
                <Carousel autoplay>
                    {workhsopPhotosBlob.map((file, index) => (
                        <Image src = {file} key = {index} height={200} width={'100%'}/>
                    ))}
                </Carousel>
            );
        }

        if(!isLoading(apiCallStatus) && !coordinatorWorkshop && workshopDraftStatus) {
            content = (
                <Col span = {24}>
                    <Result 
                        status = {403}
                        title = "Workshop is in Draft state!"
                        subTitle = {<span>Workshop No: <b>{workshopId}</b> has not been submitted by the coordinator!</span>}
                        extra = {
                        <Button
                            type = {"primary"}
                            onClick = {() => navigate(ROUTES.ALL_WORKSHOPS)}
                        >
                            View All Workshops
                        </Button>
                        }
                    />
                </Col>
            );
        }
        else if(!isLoading(apiCallStatus) && !coordinatorWorkshop && !isAdmin && !workshopDetails.workshop_approval_status) {
            content = (
                <Col span = {24}>
                    <Result 
                        status = {403}
                        title = "Cannot view workshop!"
                        subTitle = {<span>Workshop No: <b>{workshopId}</b> has not been Approved by the Administrator!</span>}
                        extra = {
                        <Button
                            type = {"primary"}
                            onClick = {() => navigate(ROUTES.ALL_WORKSHOPS)}
                        >
                            View All Workshops
                        </Button>
                        }
                    />
                </Col>
            );
        }
        else if(!isLoading(apiCallStatus) && coordinatorWorkshop && Number(workshopCoordinatorDetails.user_id) != Number(getUserId())) {
            content = (
                <Col span = {24}>
                    <Result 
                        status = {403}
                        title = "Cannot view workshop!"
                        subTitle = {<span>Cannot view the details of other coordinator's workshop!</span>}
                        extra = {
                        <Button
                            type = {"primary"}
                            onClick = {() => navigate(ROUTES.MY_WORKSHOP)}
                        >
                            View Your Workshops
                        </Button>
                        }
                    />
                </Col>
            );
        }
        else {
            content = (
                <>
                    <Col span = {15}>
                        <Row gutter = {[0, 24]}>
                            <Col span = {24}>
                                <Card className='card-container' loading = {isLoading(apiCallStatus)}>
                                    {/* Header for the details card */}
                                    {getHeaderDetails()}
                                    <Divider />
                                    {/* Workshop details body content */}
                                    {getWorkshopBodyDetails()}
                                </Card>
                            </Col>
                            {/* Workshop Speakers details */}
                            <Col span = {24}>
                                <Card loading = {isLoading(apiCallStatus)} title = {"Workshop Speakers"}>
                                    <WorkshopSpeakers />
                                </Card>
                            </Col>
                            {
                                coordinatorWorkshop || isAdmin
                                 ?
                                    <WorkshopDocuments isAdmin = {isAdmin} />
                                :
                                    null
                            }
                        </Row>
                    </Col>
                    <Col span = {9} >
                        <Affix offsetTop={coordinatorWorkshop ? 114: 24}>
                            <Card className = {'card-container'} loading = {isLoading(apiCallStatus)}>
                                <Title level = {5} className='no-margin'>Media Images:-</Title>
                                {
                                    loadingWorkshopMediaImages
                                    ?
                                        <Skeleton active />
                                    :
                                        errorWorkshopMediaImages
                                        ?
                                            <EmptyCard />
                                        :
                                        mediaImagesContent 
                                }
                                <Divider />
                                <Title level = {5} className='no-margin'>Workshop Images:-</Title>
                                {
                                    loadingWorkshopImages
                                    ?
                                        <Skeleton active />
                                    :
                                        errorWorkshopImages
                                        ?
                                            <EmptyCard />
                                        :
                                        workshopImagesContent
                                }
                            </Card>
                        </Affix>
                    </Col>
                </>
            );
        }

        return content;
    };

    return (
        <Row gutter = {[24, 24]} style = {{position: 'relative'}}>
            {
                !coordinatorWorkshop
                ?
                    <Col span = {24}>
                        <Card className='card-container'>
                            <Title className = 'no-margin' level = {2}>
                                <ReadOutlined />&nbsp;
                                Workshop Details
                            </Title>
                        </Card>
                    </Col>

                :
                    null
            }
            {
                apiStatusFailed(apiCallStatus)
                ?
                    <Col span = {24}>
                        <EmptyCard />
                    </Col>
                :
                    getMainBody()   
            }
        </Row>
    );
};

export default WorkshopDetails;