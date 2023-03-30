import { FormOutlined } from '@ant-design/icons';
import { Row, Col, Card, Typography } from 'antd';
import { Outlet } from 'react-router';

const { Title } = Typography;

const CreateWorkshopContainer = () => {
    return (
        <Row gutter = {[0, 24]}>
            <Col span = {24}>
                <Card className = {"card-container"}>
                    <Title className = {"no-margin"} level = {2}>
                    <FormOutlined />&nbsp;
                    Create Workshop
                    </Title>
                </Card>
            </Col>
            <Col span = {24}>
                <Outlet />
            </Col>
        </Row>
    );
};

export default CreateWorkshopContainer;