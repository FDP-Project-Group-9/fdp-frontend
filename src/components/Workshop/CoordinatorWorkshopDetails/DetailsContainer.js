import { Affix, Card, Col, Row, Tabs, Typography } from "antd";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { ROUTES } from "../../../utils/constants";
import { FormOutlined, QuestionCircleOutlined, ReadOutlined, SafetyCertificateOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const { Title } = Typography;

const coordinatorTabItems = [
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

const participantTabItems = [
    {
        label: <Title level = {5} className="no-margin">
                <ReadOutlined />
                Workshop Details
            </Title>,
        key: ROUTES.APPLIED_WORKSHOPS
    },
    {
        label: <Title level = {5} className="no-margin">
                <QuestionCircleOutlined />
                Quiz
            </Title>,
        key: ROUTES.PARTICIPANT_QUIZ
    },
    {
        label: <Title level = {5} className="no-margin">
                <FormOutlined />
                Feedback
            </Title>,
        key: ROUTES.PARTICIPANT_FEEDBACK
    },
    // {
    //     label: <Title level = {5} className="no-margin">
    //             <SafetyCertificateOutlined />
    //             Certificate
    //         </Title>,
    //     key: ROUTES.PARTICIPANT_FEEDBACK
    // },

];

const DetailsContainer = () => {
    const navigate = useNavigate();
    const { workshopId } = useParams();
    const location = useLocation();

    const [activeTabKey, setActiveTabKey] = useState(null);
    const [affixed, setAffixed] = useState(false);

    useEffect(() => {
        setActiveTabKey(location.pathname.split('/').slice(0, -1).join('/'));
    }, [location.pathname]);

    const onTabChangeHandler = (key) => {
        navigate(key + "/" + workshopId);
    };

    return (
        <Row gutter = {[0, 24]}>
            <Col span = {24}>
                <Affix offsetTop={24} onChange={() => setAffixed(value => !value)}>
                    <Tabs
                        tabBarGutter={32}
                        activeKey = {activeTabKey}
                        items = { location.pathname.includes(ROUTES.APPLIED_WORKSHOPS) ? participantTabItems : coordinatorTabItems }
                        onChange = { onTabChangeHandler }
                        style={{
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            padding: '0px 16px',
                            boxShadow: affixed ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' : ''
                        }}
                    />
                </Affix>
            </Col>
            <Col span = {24}>
                <Outlet />
            </Col>
        </Row>
    );
};

export default DetailsContainer;