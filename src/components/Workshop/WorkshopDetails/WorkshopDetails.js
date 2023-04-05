import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Typography, Card, Carousel, Divider, Space, Button, Popconfirm, Result, Descriptions, Empty, Skeleton, Image } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { 
    fetchWorkshopDetails,
    selectWorkshopApiCallStatus, 
    selectWorkshopCoCoordinatorDetails,
    selectWorkshopCoordinatorDetails, 
    selectWorkshopDetails, 
    selectWorkshopDraftStatus, 
    selectWorkshopFilesDetails, 
    selectWorkshopInstituteDetails 
} from '../../../redux/slices/workshop-slice';

import { apiStatusFailed, formatDate, getJWTData, isLoading } from '../../../utils/helper';
import EmptyCard from '../../Extras/Empty';
import { ReadOutlined } from '@ant-design/icons';
import { ROLE_NAMES, ROUTES } from '../../../utils/constants';
import styles from './WorkshopDetails.module.css';
import NoDataText from '../../Extras/NoDataText';
import { getTimelineStatusTag, getWorkshopStatusTag } from '../../Extras/helpers';
import { approveWorkshop, getWorkshopImage, getWorkshopMediaImage } from '../../../utils/apiCallHandlers';

const { Title } = Typography;

const WorkshopDetails = () => {
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
    }, [workshopDetails]);
    
    const approveRejectWorkshopHandler = async (approvalValue) => {
        try {
            await approveWorkshop(workshopId, approvalValue);
            await dispatch(fetchWorkshopDetails(workshopId));
        }
        catch(error) {}
    };


    // function to render the header content for the details card
    const getHeaderDetails = () => { 
        let actions = null;
        
        // checking which actions to show based on the role of user
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
        else {
            actions = (
                <Popconfirm
                    title = {"Apply to Workshop!"}
                    okText = {"Yes"}
                    cancelText = {"No"}
                    // onConfirm={() => approveRejectCoordinatorHandler(true)}
                    description = {<span>Are you sure you want to <b>Apply</b> to this workshop?</span>}
                >
                    <Button
                        type = {"primary"}
                    >
                        Apply to Workshop
                    </Button>
                </Popconfirm>
            );
        }

        return (
            <Row justify = {"space-between"} align = {"middle"}>
                <Col>
                    <Title level = {4} className='no-margin'>
                        {workshopDetails.title}
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

        if(!isLoading(apiCallStatus) && workshopDraftStatus) {
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
        else if(!isLoading(apiCallStatus) && !isAdmin && !workshopDetails.workshop_approval_status) {
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
        else {
            content = (
                <>
                    <Col span = {15}>
                        <Card className='card-container' loading = {isLoading(apiCallStatus)}>
                            {/* Header for the details card */}
                            {getHeaderDetails()}
                            <Divider />
                            {/* Workshop details body content */}
                            {getWorkshopBodyDetails()}
                        </Card>
                    </Col>
                    <Col span = {9} >
                        <Card className = {[styles['images-container'], 'card-container'].join(' ')} loading = {isLoading(apiCallStatus)}>
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
                    </Col>
                </>
            );
        }

        return content;
    };

    return (
        <Row gutter = {[24, 24]} style = {{position: 'relative'}}>
            <Col span = {24}>
                <Card className='card-container'>
                    <Title className = 'no-margin' level = {2}>
                        <ReadOutlined />&nbsp;
                        Workshop Details
                    </Title>
                </Card>
            </Col>
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