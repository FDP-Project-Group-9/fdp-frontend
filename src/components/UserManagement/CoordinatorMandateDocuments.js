import { useEffect, useState } from "react";
import { Button, Card, Col, Divider, Row, Typography, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FileImageOutlined, FileTextOutlined, UploadOutlined } from "@ant-design/icons";

import { fetchUserDetails, selectUserApiCallStatus, selectUserData } from "../../redux/slices/user-slice";
import FileCard from "../Workshop/CoordinatorWorkshopDetails/FileCard";
import { getUserId, isLoading } from "../../utils/helper";
import { 
    deleteCoordinatorMandateDocs,
    getCoordinatorMandateForm, 
    getCoordinatorPhoto, 
    getCoordinatorSignature,
    getInstituteLogo,
    uploadCoordinatorMandateDocs
} from "../../utils/apiCallHandlers";

const { Title } = Typography;

const FILE_TYPE = {
    MANDATE_FORM: 'mandate-form',
    COORDINATOR_PHOTO: 'coordinator-photo',
    COORDINATOR_SIGNATURE: 'coordinator-signature',
    INSTITUTE_LOGO: 'institute-logo'
};

const CoordinatorMandateDocuments = () => {
    const userDetails = useSelector(selectUserData);
    const apiCallStatus = useSelector(selectUserApiCallStatus);

    const dispatch = useDispatch();

    const userId = getUserId();

    useEffect(() => {
        dispatch(fetchUserDetails(userId));
    }, []);

    const [uploadDocumentObj, setUploadDocumentObj] = useState({});
    const [loading, setLoading] = useState(false);

    let mandateFormFileId = null, coordinatorPhotoId = null, coordinatorSignatureId = null, instituteLogoId = null;
    const userDocuments = userDetails.documents ?? {};

    if(userDocuments.coordinator_mandate_form_url) {
        mandateFormFileId = userDocuments.id;
    }

    if(userDocuments.coordinator_photo_url) {
        coordinatorPhotoId = userDocuments.id;
    }

    if(userDocuments.coordinator_signature_url) {
        coordinatorSignatureId = userDocuments.id;
    }

    if(userDocuments.institute_logo_url) {
        instituteLogoId = userDocuments.id;
    }
    
    const onPreviewHandler = async (fileId, fileType) => {
        try {
            let url = '', doc;
            switch(fileType) {
                case FILE_TYPE.MANDATE_FORM:
                    doc = await getCoordinatorMandateForm(fileId);
                    url = window.URL.createObjectURL(new Blob([doc.data], {type: doc.data.type}));
                    break;
                case FILE_TYPE.COORDINATOR_PHOTO:
                    doc = await getCoordinatorPhoto(fileId);
                    url = window.URL.createObjectURL(new Blob([doc.data], {type: doc.data.type}));
                    break;
                case FILE_TYPE.COORDINATOR_SIGNATURE:
                    doc = await getCoordinatorSignature(fileId);
                    url = window.URL.createObjectURL(new Blob([doc.data], {type: doc.data.type}));
                    break;
                case FILE_TYPE.INSTITUTE_LOGO:
                    doc = await getInstituteLogo(fileId);
                    url = window.URL.createObjectURL(new Blob([doc.data], {type: doc.data.type}));
                    break;
            }
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        catch(error) {}
    };

    const onDeleteHandler = async (fileType) => {
        const data = {
            "mandate_form": false, 
            "photo": false,
            "signature": false,
            "institute_logo": false
        };
        setLoading(true);
        try {
            switch(fileType) {
                case FILE_TYPE.MANDATE_FORM:
                    data.mandate_form = true;
                    await deleteCoordinatorMandateDocs(data);
                    break;
                case FILE_TYPE.COORDINATOR_PHOTO:
                    data.photo = true;
                    await deleteCoordinatorMandateDocs(data);
                    break;
                case FILE_TYPE.COORDINATOR_SIGNATURE:
                    data.signature = true;
                    await deleteCoordinatorMandateDocs(data);
                    break;
                case FILE_TYPE.INSTITUTE_LOGO:
                    data.institute_logo = true;
                    await deleteCoordinatorMandateDocs(data);
                    break;
            }
            setLoading(false);
            await dispatch(fetchUserDetails(userId));
        }
        catch(error) {
            setLoading(true);
        }
    };

    const onFileChangeHandler = (file, fileType) => {
        if(file && file.originFileObj) {
            const documentObj = {...uploadDocumentObj};
            switch(fileType) {
                case FILE_TYPE.MANDATE_FORM:
                    documentObj['coordinator_mandate_form'] = file.originFileObj;
                    break;
                case FILE_TYPE.COORDINATOR_PHOTO:
                    documentObj['coordinator_photo'] = file.originFileObj;
                    break;
                case FILE_TYPE.COORDINATOR_SIGNATURE:
                    documentObj['coordinator_signature'] = file.originFileObj;
                    break;
                case FILE_TYPE.INSTITUTE_LOGO:
                    documentObj['institute_logo'] = file.originFileObj;
                    break;
            }
            setUploadDocumentObj(documentObj);
        }
        else {
            const documentObj = {...uploadDocumentObj};
            switch(fileType) {
                case FILE_TYPE.MANDATE_FORM:
                    delete documentObj['coordinator_mandate_form'];
                    break;
                case FILE_TYPE.COORDINATOR_PHOTO:
                    delete documentObj['coordinator_photo'];
                    break;
                case FILE_TYPE.COORDINATOR_SIGNATURE:
                    delete documentObj['coordinator_signature'];
                    break;
                case FILE_TYPE.INSTITUTE_LOGO:
                    delete documentObj['institute_logo'];
                    break;
            }
            setUploadDocumentObj(documentObj);
        }
    };

    const onUploadHandler = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('user_id', userId);
        Object.entries(uploadDocumentObj).forEach(([key, value]) => {
            formData.append(key, value);
        })
        try {
            await uploadCoordinatorMandateDocs(formData);
            setLoading(false);
            await dispatch(fetchUserDetails(userId));
        }
        catch(error) {
            setLoading(false);
        }
    }
    return (
        <Row gutter = {[0, 24]}>
            <Col span = {18}>
                <Card>
                    <Title className = "no-margin">Mandate Form</Title>
                </Card>
            </Col>
            <Col span = {18}>
                <Card loading = {isLoading(apiCallStatus)}>
                    <Divider orientation="left" orientationMargin={0}>Coordinator Mandate Form</Divider>
                    {
                        mandateFormFileId
                        ?
                            <FileCard
                                fileIcon = {<FileTextOutlined />} 
                                fileName = {"Coordinator Mandate Form"}
                                onPreviewHandler = {() => onPreviewHandler(mandateFormFileId, FILE_TYPE.MANDATE_FORM)}
                                onDeleteHandler = {() => onDeleteHandler(FILE_TYPE.MANDATE_FORM)}
                                loading = {loading}
                            />
                        :
                            <Upload
                                listType = {"picture"}
                                beforeUpload = {() => false}
                                onChange = {({fileList}) => onFileChangeHandler(fileList.slice(-1)[0], FILE_TYPE.MANDATE_FORM)}
                                maxCount = {1}
                            >
                                <Button icon={<UploadOutlined />}>Upload Form</Button>
                            </Upload>
                    }

                    <Divider orientation="left" orientationMargin={0}>Coordinator Photo</Divider>
                    {
                        coordinatorPhotoId
                        ?
                            <FileCard 
                                fileIcon = {<FileImageOutlined />} 
                                fileName = {"Photo"}
                                onPreviewHandler = {() => onPreviewHandler(coordinatorPhotoId, FILE_TYPE.COORDINATOR_PHOTO)}
                                onDeleteHandler = {() => onDeleteHandler(FILE_TYPE.COORDINATOR_PHOTO)}
                                loading = {loading}
                            />
                        :
                            <Upload
                                listType = {"picture"}
                                beforeUpload = {() => false}
                                onChange = {({fileList}) => onFileChangeHandler(fileList.slice(-1)[0], FILE_TYPE.COORDINATOR_PHOTO)}
                                maxCount = {1}
                            >
                                <Button icon={<UploadOutlined />}>Upload Photo</Button>
                            </Upload>
                    }

                    <Divider orientation="left" orientationMargin={0}>Coordinator Signature</Divider>
                    {
                        coordinatorSignatureId
                        ?
                            <FileCard 
                                fileIcon = {<FileTextOutlined />} 
                                fileName = {"Signature"}
                                onPreviewHandler = {() => onPreviewHandler(coordinatorSignatureId, FILE_TYPE.COORDINATOR_SIGNATURE)}
                                onDeleteHandler = {() => onDeleteHandler(FILE_TYPE.COORDINATOR_SIGNATURE)}
                                loading = {loading}
                            />
                        :
                            <Upload
                                listType = {"picture"}
                                beforeUpload = {() => false}
                                onChange = {({fileList}) => onFileChangeHandler(fileList.slice(-1)[0], FILE_TYPE.COORDINATOR_SIGNATURE)}
                                maxCount = {1}
                            >
                                <Button icon={<UploadOutlined />}>Upload Signature</Button>
                            </Upload>
                    }

                    <Divider orientation="left" orientationMargin={0}>Institute Logo</Divider>
                    {
                        instituteLogoId
                        ?
                            <FileCard 
                                fileIcon = {<FileTextOutlined />} 
                                fileName = {"Institute Logo"}
                                onPreviewHandler = {() => onPreviewHandler(instituteLogoId, FILE_TYPE.INSTITUTE_LOGO)}
                                onDeleteHandler = {() => onDeleteHandler(FILE_TYPE.INSTITUTE_LOGO)}
                                loading = {loading}
                            />
                        :
                            <Upload
                                listType = {"picture"}
                                beforeUpload = {() => false}
                                onChange = {({fileList}) => onFileChangeHandler(fileList.slice(-1)[0], FILE_TYPE.INSTITUTE_LOGO)}
                                maxCount = {1}
                            >
                                <Button icon={<UploadOutlined />}>Upload Logo</Button>
                            </Upload>
                    }
                    {
                        (!mandateFormFileId || !coordinatorPhotoId || !coordinatorSignatureId || !instituteLogoId) && (
                            <Row justify={"center"}>
                                <Button
                                    type = {"primary"}
                                    style = {{marginTop: "24px"}}
                                    loading = {loading}
                                    icon = {loading ? null : <UploadOutlined />}
                                    onClick = {onUploadHandler}
                                    disabled = {Object.keys(uploadDocumentObj).length == 0}
                                >
                                    Upload Documents
                                </Button>
                            </Row>
                        )
                    }
                </Card>
            </Col>
        </Row>
    );
};

export default CoordinatorMandateDocuments;