import { Row, Col, Card, Space, Typography, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { requestHandler } from "../../../utils/apiCall";
import { WORKSHOP_API_URLS } from "../../../utils/apiUrls";
import { ROUTES } from "../../../utils/constants";

const {Text, Title} = Typography;

const CreateWorkshopInit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const createWorkshopDraftHandler = () => {
        setLoading(true);
        requestHandler.post(WORKSHOP_API_URLS.CREATE_WORKSHOP_DRAFT, {})
        .then((response) => {
            setLoading(false);
            const workshopId = response.data.workshop_id;
            navigate(ROUTES.CREATE_WORKSHOP + "/" + workshopId);
        })
        .catch(error => setLoading(false));
    };

    return (
        <Row justify={"center"} align = {"middle"} style = {{height: "75vh"}}>
            <Col span = {16}>
                <Card style = {{height: '60vh', display: 'flex', alignItems: "center", flexDirection: 'column', justifyContent: "center"}}
                    className = {"card-container"}
                >
                    <Space direction="vertical" size = {8} align = "center">
                        <Title level={4} className = "no-margin">Let's begin the application process!</Title>
                        <Text type="secondary">Creating a workshop is easy, all you have to do is go through 5 steps and submit your application,</Text>
                        <Text type="secondary">then wait for the <b>Administrator</b> to approve your workshop!</Text>
                        <Button style = {{marginTop: "20px"}}
                            type = {"primary"}
                            loading = {loading}
                            onClick = {createWorkshopDraftHandler}
                        >
                            Let's begin!
                        </Button>
                    </Space>
                </Card>
            </Col>
        </Row>
    );
};

export default CreateWorkshopInit;