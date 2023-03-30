import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Card, Skeleton, Divider, List, Spin, Descriptions, Tag } from "antd";
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
import { formatDate, isLoading } from "../../../utils/helper";
import { LoadingOutlined } from "@ant-design/icons";
import { ROUTES } from "../../../utils/constants";
import NoDataText from "../../Extras/NoDataText";

const { Title } = Typography;

const getStatusTag = (draft, workshop_completed, workshop_approval_status) => {
    if(draft) 
        return <Tag color = "magenta">Draft</Tag>
    else if(workshop_completed)
        return <Tag color = "green">Completed</Tag>
    else if(workshop_approval_status)
        return <Tag color = "geekblue">Approved By Admin</Tag>
    else
        return <Tag color = "orange">Waiting for Admin Approval</Tag>
};

const CoordinatorWorkshops = (props) => {
    const workshopsData = useSelector(selectUserWorkshopsData);
    const apiCallStatus = useSelector(selectWorkshopApiCallStatus);
    const totalWorkshopsCount = useSelector(selectTotalWorkshopsCountData);

    const loadMoreWorkshops = async () => {
        if(isLoading(apiCallStatus))
            return;
        try {
            await dispatch(fetchCoordinatorWorkshops());
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
    }, []);

    const dispatch = useDispatch();
    return (
        <>
            <Row gutter = {[24, 24]}>
                <Col span = {18}>
                    <Card className="card-container">
                        <Title level = {2} className="no-margin">My Workshops</Title>
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
                                                    <Link to = {ROUTES.My_WORKSHOP + `/${item?.workshop_id || ""}`}>
                                                        <Card title = {item.title || "Untitled"} hoverable>
                                                            <Descriptions column={2}>
                                                                <Descriptions.Item label = {"Workshop No."}>{item?.workshop_id || <NoDataText />}</Descriptions.Item>
                                                                <Descriptions.Item label = {"Status"}>{getStatusTag(item?.draft, item?.workshop_completed, item?.workshop_approval_status)}</Descriptions.Item>
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
                            : <Skeleton />
                        }
                    </div>
                </Col>
                <Col span = {6}>
                    <Card className = {["card-container", styles['filters-card']].join(' ')} title = {"Filters"}>
                        filters
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CoordinatorWorkshops;