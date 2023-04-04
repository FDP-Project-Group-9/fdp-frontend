import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Card, Skeleton, Divider, List, Spin, Descriptions, Tag, Empty, Radio, Space } from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';

import { 
    selectWorkshopApiCallStatus,
    selectTotalWorkshopsCountData,
    nextPage,
    resetPaginationObj,
    selectAllWorkshopsData,
    fetchAllWorkshops,
    resetAllWorkshopsData
 } from "../../../redux/slices/workshop-slice";
import styles from './AllWorkshops.module.css';
import { apiStatusFailed, formatDate, getJWTData, isLoading } from "../../../utils/helper";
import { LoadingOutlined, ReconciliationOutlined } from "@ant-design/icons";
import { ROLE_NAMES, ROUTES } from "../../../utils/constants";
import NoDataText from "../../Extras/NoDataText";
import EmptyCard from "../../Extras/Empty";

const { Title } = Typography;

const getWorkshopStatusTag = ( workshop_completed, workshop_approval_status) => {
    if(workshop_completed)
        return <Tag color = "green">Completed</Tag>
    else if(workshop_approval_status)
        return <Tag color = "geekblue">Approved</Tag>
    else if(workshop_approval_status === null)
        return <Tag color = "orange">Waiting for Admin Approval</Tag>
    else 
        return <Tag color = "red">Rejected</Tag>
};

const getTimelineStatusTag = (startDate , endDate) => {
    if(!startDate || !endDate)
        return null;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const currentDate = new Date();
    if(currentDate < startDate)
        return <Tag color = "blue">Upcoming</Tag>
    else if(currentDate > endDate)
        return <Tag color = "red">Completed</Tag>
    else
        return <Tag color = "green">Ongoing</Tag>
};

const AllWorkshops = (props) => {
    const allWorkshopsData = useSelector(selectAllWorkshopsData);
    const apiCallStatus = useSelector(selectWorkshopApiCallStatus);
    const totalWorkshopsCount = useSelector(selectTotalWorkshopsCountData);

    const [filters, setFilters] = useState({});

    const dispatch = useDispatch();

    const isAdmin = getJWTData().role_name === ROLE_NAMES.ADMINISTRATOR;

    getTimelineStatusTag();
    const loadMoreWorkshops = async () => {
        if(isLoading(apiCallStatus))
            return;
        try {
            await dispatch(fetchAllWorkshops({filters: filters, isAdmin: isAdmin}));
        }
        catch(error) {}
    };

    const initializerFunction = async () => {
        await dispatch(resetPaginationObj());
        await dispatch(resetAllWorkshopsData());
        loadMoreWorkshops();
    };

    useEffect(() => {
        initializerFunction();
    }, [filters]);

    const onWorkshopStatusFilterChangeHandler = (event) => {
        setFilters(value => ({...value, workshop_approval_status: event.target.value}));
    };

    const onTimelineChangeHandler = (event) => {
        setFilters(value => ({...value, timeline_status: event.target.value}));
    };

    return (
        <>
            <Row gutter = {[24, 24]}>
                <Col span = {24}>
                    <Card className="card-container">
                        <Title level = {2} className="no-margin">        
                            <ReconciliationOutlined />&nbsp;
                            All Workshops
                        </Title>
                    </Card>
                </Col>
                <Col span = {18}>
                    <div id = "scrollableDiv" className = {[styles.container, styles['scrollable-div-container']].join(' ')}>
                        { 
                            allWorkshopsData.length > 0 
                            ?
                                <InfiniteScroll 
                                    dataLength={allWorkshopsData.length}
                                    next={() => {
                                        dispatch(nextPage());
                                        loadMoreWorkshops();
                                    }}
                                    hasMore={allWorkshopsData.length < totalWorkshopsCount}
                                    loader={ 
                                        <Row justify={"center"}>
                                            <Spin indicator={<LoadingOutlined />} tip = {"Hold on! Fetching more workshops..."}/> 
                                        </Row>
                                    }
                                    endMessage={<Divider plain>That's all for now!</Divider>}
                                    scrollableTarget="scrollableDiv"
                                >
                                    <List
                                    dataSource={allWorkshopsData}
                                    renderItem={(item) => (
                                        <List.Item key={item.workshop_id} className = {["card-container", styles['item-card']].join(' ')}>
                                            <Row style = {{width: '100%'}}>
                                                <Col span = {24}>
                                                    <Link to = {ROUTES.My_WORKSHOP + `/${item?.workshop_id || ""}`}>
                                                        <Card title = {item.title || "Untitled"} hoverable>
                                                            <Descriptions column={2}>
                                                                <Descriptions.Item label = {"Workshop No."}>{item?.workshop_id || <NoDataText />}</Descriptions.Item>
                                                                <Descriptions.Item label = {"Status"}>{getWorkshopStatusTag(item?.workshop_completed, item?.workshop_approval_status)}</Descriptions.Item>
                                                                <Descriptions.Item label = {"Start Date"}>{formatDate(item?.begin_date) || <NoDataText />}</Descriptions.Item>
                                                                <Descriptions.Item label = {"End Date"}>{formatDate(item?.end_date) || <NoDataText />}</Descriptions.Item>
                                                                <Descriptions.Item label = {"Workshop Specialization Area"}>{item?.specialization || <NoDataText />}</Descriptions.Item>
                                                                <Descriptions.Item label = {"Workshop Timeline Status"}>{getTimelineStatusTag(item?.begin_date, item?.end_date) || <NoDataText />}</Descriptions.Item>
                                                            </Descriptions>
                                                        </Card>
                                                    </Link>

                                                </Col>
                                            </Row>
                                        </List.Item>
                                    )}
                                    />
                                </InfiniteScroll>
                            : 
                                apiStatusFailed(apiCallStatus)
                                ?
                                    <EmptyCard />
                                :
                                        isLoading(apiCallStatus)
                                        ?
                                            <Skeleton active/>
                                        :
                                        <Card>
                                            <Empty
                                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                imageStyle={{ height: 60 }}
                                                description={
                                                    <Title level = {5} className="no-margin">
                                                        No Workshop Found!
                                                    </Title>
                                                }
                                            />
                                        </Card>
                        }
                    </div>
                </Col>
                <Col span = {6}>
                    <Card className = {["card-container", styles['filters-card']].join(' ')} title = {"Filters"}>
                        {
                            isAdmin
                            ?
                                <>
                                    <Title level = {5} className={[styles['filters-title'], "no-margin"].join(' ')}>Workshop Approval Status:-</Title>
                                    <Radio.Group 
                                        defaultValue="all" 
                                        buttonStyle="solid" 
                                        onChange = {onWorkshopStatusFilterChangeHandler}
                                        value = {filters?.workshop_approval_status}
                                    >
                                        <Space direction = {"horizontal"} wrap>
                                            <Radio.Button value="all">All</Radio.Button>
                                            <Radio.Button value="pending">Pending</Radio.Button>
                                            <Radio.Button value="rejected">Rejected</Radio.Button>
                                            <Radio.Button value="approved">Approved</Radio.Button>
                                        </Space>
                                    </Radio.Group>
                                    <Divider />
                                </>
                            :
                                null
                        }
                        <Title level = {5} className={[styles['filters-title'], "no-margin"].join(' ')}>Workshop Timeline Status:-</Title>
                        <Radio.Group 
                            defaultValue="all" 
                            buttonStyle="solid" 
                            onChange = {onTimelineChangeHandler}
                            value = {filters?.timeline_status}
                        >
                            <Space direction = {"horizontal"} wrap>
                                <Radio.Button value="all">All</Radio.Button>
                                <Radio.Button value="upcoming">Upcoming</Radio.Button>
                                <Radio.Button value="ongoing">Ongoing</Radio.Button>
                                <Radio.Button value="completed">Completed</Radio.Button>
                            </Space>
                        </Radio.Group>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AllWorkshops;