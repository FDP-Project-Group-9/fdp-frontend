import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

const FileCard = ({
    fileIcon,
    fileName,
    onPreviewHandler,
    onDeleteHandler,
    loading = false
}) => {
    const [mouseOver, setMouseOver] = useState(false);
    return (
        <Card onMouseOver = {() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)} style = {{width: '100%'}} hoverable loading = {loading}>
            <Row justify = {"space-between"} align={'middle'}>
                <Col>
                    <Space size = {10}>
                        {fileIcon}
                        <Text className="font-weight-500">{fileName}</Text>
                    </Space>
                </Col>
                <Col>
                    {
                        mouseOver
                        ?
                            <Space size = {16}>
                                <Button type = {"link"} icon = {<EyeOutlined size = {10}/>} onClick = {onPreviewHandler}/>
                                <Button type = {"link"} danger icon = {<DeleteOutlined size = {10}/>} onClick = {onDeleteHandler} />
                            </Space>
                        :
                            null
                    }
                </Col>
            </Row>
        </Card>
    );
};

export default FileCard;