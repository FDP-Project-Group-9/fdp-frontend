import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Card, Skeleton, Divider, List, Spin, Descriptions, Tag, Empty, Button, Space, Switch, Radio } from "antd";
import InfiniteScroll from 'react-infinite-scroll-component';

import { 
    selectUserWorkshopsData, 
    selectWorkshopApiCallStatus,
    selectTotalWorkshopsCountData,
    fetchCoordinatorWorkshops,
    nextPage,
    resetUserWorkshopData,
    resetPaginationObj
 } from "../../../redux/slices/workshop-slice";
import styles from './CoordinatorWorkshops.module.css';
import { apiStatusFailed, formatDate, isLoading } from "../../../utils/helper";
import { LoadingOutlined, ReconciliationOutlined } from "@ant-design/icons";
import { ROUTES } from "../../../utils/constants";
import NoDataText from "../../Extras/NoDataText";
import EmptyCard from "../../Extras/Empty";
import { getWorkshopStatusTag } from "../../Extras/helpers";

const { Title, Text } = Typography;

const CoordinatorWorkshops = (props) => {
    const workshopsData = useSelector(selectUserWorkshopsData);
    const apiCallStatus = useSelector(selectWorkshopApiCallStatus);
    const totalWorkshopsCount = useSelector(selectTotalWorkshopsCountData);

    const [filters, setFilters] = useState({});

    const navigate = useNavigate();

    const loadMoreWorkshops = async () => {
        if(isLoading(apiCallStatus))
            return;
        try {
            await dispatch(fetchCoordinatorWorkshops({ filters: filters}));
        }
        catch(error) {}
    };

    const initializerFunction = async () => {
        await dispatch(resetPaginationObj());
        await dispatch(resetUserWorkshopData());
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

    const onDraftFilterChangeHandler = (draft) => {
        setFilters(value => ({...value, draft: draft}));
    };

    const dispatch = useDispatch();
    return (
        <>
            <Row gutter = {[24, 24]}>
                <Col span = {24}>
                    <Card className="card-container">
                        <Title level = {2} className="no-margin">        
                            <ReconciliationOutlined />&nbsp;
                            My Workshops
                        </Title>
                    </Card>
                </Col>
                <Col span = {18}>
                    <div id = "scrollableDiv" className = {[styles.container, styles['scrollable-div-container']].join(' ')}>
                        { 
                            workshopsData.length > 0 ?
                                <InfiniteScroll 
                                    dataLength={workshopsData.length}
                                    next={() => {
                                        dispatch(nextPage());
                                        loadMoreWorkshops();
                                    }}
                                    hasMore={workshopsData.length < totalWorkshopsCount}
                                    loader={ 
                                        <Row justify={"center"}>
                                            <Spin indicator={<LoadingOutlined />} tip = {"Hold on! Fetching more workshops..."}/> 
                                        </Row>
                                    }
                                    endMessage={<Divider plain>That's all for now!</Divider>}
                                    scrollableTarget="scrollableDiv"
                                >
                                    <List
                                    dataSource={workshopsData}
                                    renderItem={(item) => (
                                        <List.Item key={item.workshop_id} className = {["card-container", styles['item-card']].join(' ')}>
                                            <Row style = {{width: '100%'}}>
                                                <Col span = {24}>
                                                    <Link to = {ROUTES.MY_WORKSHOP + `/${item?.workshop_id || ""}`}>
                                                        <Card title = {item.title || "Untitled"} hoverable>
                                                            <Descriptions column={2}>
                                                                <Descriptions.Item label = {"Workshop No."}>{item?.workshop_id || <NoDataText />}</Descriptions.Item>
                                                                <Descriptions.Item label = {"Status"}>{getWorkshopStatusTag(item?.workshop_completed ,item?.workshop_approval_status, item?.draft)}</Descriptions.Item>
                                                                <Descriptions.Item label = {"Start Date"}>{formatDate(item?.begin_date) || <NoDataText />}</Descriptions.Item>
                                                                <Descriptions.Item label = {"End Date"}>{formatDate(item?.end_date) || <NoDataText />}</Descriptions.Item>
                                                                <Descriptions.Item label = {"Workshop Specialization Area"}>{item?.specialization || <NoDataText />}</Descriptions.Item>
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
                                                    <Space direction = {"vertical"}>
                                                        <Title level = {5} className="no-margin">
                                                            No Workshop Found!
                                                        </Title>
                                                        <Text type = {"secondary"}>Create workshops to see them here</Text>
                                                        <Button type="primary" onClick={() => navigate(ROUTES.CREATE_WORKSHOP)}>
                                                            Create your first workshop
                                                        </Button>
                                                    </Space>
                                                }
                                            />
                                        </Card>
                        }
                    </div>
                </Col>
                <Col span = {6}>
                    <Card className = {["card-container", styles['filters-card']].join(' ')} title = {"Filters"}>
                        <Title level = {5} className="no-margin">
                            Draft&nbsp;
                            <Switch onChange = {onDraftFilterChangeHandler} checked = {filters.draft}/> 
                        </Title>
                        <Divider />
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

export default CoordinatorWorkshops;