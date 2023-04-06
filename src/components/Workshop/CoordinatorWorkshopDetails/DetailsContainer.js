import { Card, Col, Row, Tabs, Typography } from "antd";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { ROUTES } from "../../../utils/constants";
import { FormOutlined, ReadOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const { Title } = Typography;

const tabItems = [
    {
        label: <Title level = {5} className="no-margin">
                <ReadOutlined />
                Workshop Details
            </Title>,
        key: ROUTES.MY_WORKSHOP
    },
    {
        label: <Title level = {5} className="no-margin">
                <UsergroupAddOutlined />
                Participants Details
            </Title>,
        key: ROUTES.PARTICIPANTS
    },
    {
        label: <Title level = {5} className="no-margin">
                <FormOutlined />
                Workshop Quiz
            </Title>,
        key: ROUTES.QUIZ
    }
];

const DetailsContainer = () => {
    const navigate = useNavigate();
    const { workshopId } = useParams();
    const location = useLocation();

    const [activeTabKey, setActiveTabKey] = useState(null);

    useEffect(() => {
        setActiveTabKey(location.pathname.split('/').slice(0, -1).join('/'));
    }, [location.pathname]);

    const onTabChangeHandler = (key) => {
        navigate(key + "/" + workshopId);
    };

    return (
        <Row>
            <Col span = {24}>
                <Tabs
                    tabBarGutter={32}
                    activeKey = {activeTabKey}
                    items = { tabItems }
                    onChange = { onTabChangeHandler }
                />
            </Col>
            <Col span = {24}>
                <Outlet />
            </Col>
        </Row>
    );
};

export default DetailsContainer;