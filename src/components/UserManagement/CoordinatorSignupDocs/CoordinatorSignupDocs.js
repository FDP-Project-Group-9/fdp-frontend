import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Card, Upload, Button, Space, Input, Form, message } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import styles from './CoordinatorSignupDocs.module.css';
import { requestHandler } from '../../../utils/apiCall';
import { UMS_API_URLS } from '../../../utils/apiUrls';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const { Dragger } = Upload;

const CoordinatorSignupDocs = () => {
    const [files, setFiles] = useState([]);
    const [emailId, setEmailId] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const uploadProps = {
        name: 'registration_doc',
        multiple: true,
        maxCount: 1,
        beforeUpload: () => false,
        onChange: (fileInfo) => {
            const filesData = fileInfo.fileList.map(file => file.originFileObj);
            setFiles(filesData);
        },
        accept: 'image/jpeg,image/png,application/pdf',
    };

    const onFileUpload = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('email_id', emailId);
            files.forEach(file => formData.append('registration_doc', file));
            await requestHandler.post(UMS_API_URLS.UPLOAD_REGISTRATION_DOC, formData);
            message.success("The Administrator has been notified about your registration!");
            setTimeout(() => {
                navigate("/login");   
            }, 1000);
        }
        catch(error){}
        setLoading(false);
    };

    return (
        <div span={24} style={{ margin: 5, padding: 20 }}>
            <Row style={{ paddingLeft: 40, paddingRight: 40 }}>
            <Col span={10}>
                {" "}
                <img
                style={{ width: "100px" }}
                className="logo"
                src="https://aktu.ac.in/images/uptu_logo.png"
                alt=""
                />
            </Col>
            <Col span={10}>
                <Title level={1}>FDP Portal</Title>
            </Col>
            <Col span={4}>
                <Title level={3}>IET Lucknow</Title>
            </Col>
            </Row>

            <Row justify = {"center"}>
                <Col span = {12}>
                    <Card style = {{width: "100%", boxShadow: "0px 0px 5px 1px #e6f4ff"}}>
                        <Space size = {15} direction = {"vertical"} style = {{width: "100%"}}>
                            <Form.Item 
                                label = "Email Id"
                                name = "email_id"
                                className = {styles.field}
                            >
                                <Input value = {emailId} onChange = {(e) => setEmailId(e.target.value)} placeholder = {'Enter email id'}/>
                            </Form.Item>
                            <Text className = {styles.field}>Upload Documents for Verification</Text>
                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Please Upload atmost <b>2 Identification Documents</b>
                                    <br/>
                                    Supported file types are <b>.pdf, .jpeg/.jpg  and .png</b>
                                </p>
                            </Dragger>
                        </Space>
                        <Space align='center' style = {{width: '100%', marginTop: "15px"}} direction = "vertical">
                            <Button type = 'primary' onClick = {onFileUpload} icon = {!loading ? <UploadOutlined />: null} loading = {loading}>
                                Upload 
                            </Button>
                        </Space>
                        <div style={{textAlign: 'end'}}>Aleady have an account? <Link to="/login">Login</Link> </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CoordinatorSignupDocs;