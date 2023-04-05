import { UserOutlined } from "@ant-design/icons";
import { Pagination, Row, Col, Card, Typography, Space, Divider, Avatar, Tag, Skeleton, Empty, Radio } from "antd";

import NoDataText from "../../Extras/NoDataText";
import styles from "./ListCoordinators.module.css";
import { useEffect, useState } from "react";
import EmptyCard from "../../Extras/Empty";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import { fetchCoordinators } from "../../../utils/apiCallHandlers";

const { Title, Text } = Typography;

const ProfileCard = ({
    emailId,
    title, 
    firstName, 
    lastName,
    profileApproved
}) => {

    const name = `${title ?? ""} ${firstName ?? ""} ${lastName ?? ""}`;
    let tagColor = '';
    let profileApprovedText = '';

    if(profileApproved) {
        tagColor = 'green';
        profileApprovedText = 'Approved';
    } 
    else if(profileApproved == null){
        tagColor = 'orange';
        profileApprovedText = 'Waiting for Administrator approval';
    }
    else{
        tagColor = 'red';
        profileApprovedText = 'Rejected';
    }
    return (
        <Card hoverable className="card-container">
            <Row justify={"space-between"}>
                <Avatar size = {48} style = {{marginRight: "10px"}}>
                    {`${firstName && firstName.toUpperCase()[0]}${firstName && lastName && lastName.toUpperCase()[0]}`}
                </Avatar>
                <Col span = {22}>
                    <Row justify = {"space-between"}>
                        <Col>
                            <Space size = {0} direction = {"vertical"}>
                                <Text className = "font-weight-500">{name}</Text>
                                <Text type = {"secondary"}>{emailId ?? <NoDataText />}</Text>
                            </Space>
                        </Col>
                        <Col>
                            <Tag color = {tagColor}>
                                {profileApprovedText}
                            </Tag>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

const ListCoordinators = () => {
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [perPageSize, setPerPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [apiFailed, setApiFailed] = useState(false);
    const [coordinators, setCoordinators] = useState([]);
    const [totalResultCount, setTotalResultCount] = useState(0);
    const [filterValue, setFilterValue] = useState('all');

    const fetchCoordinatorsHandler = async (currentPageNo, perPageSize) => {
        setLoading(true);
        try {
            const coordinatorsData = await fetchCoordinators(currentPageNo, perPageSize, filterValue);
            setCoordinators(coordinatorsData.users ?? []);
            setTotalResultCount(coordinatorsData.total_count ?? 0);
            setLoading(false);
        }
        catch(error) {
            setLoading(false);
            setApiFailed(true);
        }
    };

    useEffect(() => {
        fetchCoordinatorsHandler(currentPageNo, perPageSize);
    }, [filterValue]);

    const onPaginationChangeHandler = (newPageNo, newPageSize) => {
        setCurrentPageNo(newPageNo);
        setPerPageSize(newPageSize);
        fetchCoordinatorsHandler(newPageNo, newPageSize);
    };

    const onFilterChangeHandler = (event) => {
        setFilterValue(event.target.value);
    };

    let content = coordinators.map((coordinator, index) => (
        <Col span = {24} key = {index}>
            <Link to={ROUTES.COORDINATORS + "/" + coordinator.user_id}>
                <ProfileCard
                    emailId={coordinator.email_id} 
                    title = {coordinator.title}
                    firstName = {coordinator.first_name}
                    lastName = {coordinator.last_name}
                    profileApproved = {coordinator.profile_approved}
                />
            </Link>
        </Col>
    ));

    if(content.length == 0) {
        content = (<Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
            <Title level = {5} className="no-margin">
                No Coordinator data found!
            </Title>
            }
      />);
    }

    return (
        <Row gutter = {[24, 24]}>
            <Col span = {24}>
                <Card className="card-container">
                    <Title level = {2} className = "no-margin">
                        <UserOutlined />&nbsp;
                        Coordinators
                    </Title>
                </Card>
            </Col>
            <Col span = {18}>
                {
                    apiFailed
                    ?
                        <EmptyCard />
                    :
                        <Card className = {[styles['parent-container'], "card-container"]} loading = {loading}>
                            <Row align="end" style = {{position: "relative"}}>
                                <Pagination 
                                    current = {currentPageNo}
                                    pageSize = {perPageSize}
                                    total = {totalResultCount}
                                    showSizeChanger
                                    showQuickJumper
                                    responsive
                                    pageSizeOptions={[10, 25, 50]}
                                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                                    onChange = {onPaginationChangeHandler}
                                />
                            </Row>
                            <Divider />
                            <div className= {styles['profile-card-container']}>
                                <Row gutter = {[ 0 , 16]} justify={"center"}>
                                    {content}
                                </Row>
                            </div>
                        </Card>
                }
            </Col>
            <Col span = {6}>
                <Card className = {[styles['filters-container'], "card-container"].join(' ')}>
                    <Title level = {5} style = {{margin: "8px 0px 0px 0px"}}>Filters</Title>
                    <Divider/>
                    <Title level = {5}>Profile Registration Status:-</Title>
                    <Radio.Group defaultValue="all" buttonStyle="solid" onChange = {onFilterChangeHandler}>
                        <Space direction = {"vertical"}>
                            <Radio.Button value="all">All</Radio.Button>
                            <Radio.Button value="pending">Pending</Radio.Button>
                            <Radio.Button value="rejected">Rejected</Radio.Button>
                            <Radio.Button value="approved">Approved</Radio.Button>
                        </Space>
                    </Radio.Group>
                </Card>
            </Col>
        </Row>
    );
};

export default ListCoordinators;