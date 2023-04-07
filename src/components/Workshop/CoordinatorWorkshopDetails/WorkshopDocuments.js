import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileImageOutlined, FileTextOutlined, UploadOutlined,} from "@ant-design/icons";
import { Button, Card, Col, Divider, Empty, Row, Space, Typography, Upload } from "antd";
import { useParams } from "react-router-dom";

import { 
    fetchWorkshopDetails, 
    selectWorkshopApiCallStatus, 
    selectWorkshopFilesDetails 
} from "../../../redux/slices/workshop-slice";
import { isLoading } from "../../../utils/helper";
import { 
    addWorkshopImages, 
    addWorkshopMediaImages, 
    addWorkshopReport, 
    addWorkshopStmtExpenditure, 
    deleteWorkshopBrochure, 
    deleteWorkshopImage, 
    deleteWorkshopMediaImage, 
    deleteWorkshopReport, 
    deleteWorkshopStmtExpendtiure, 
    getWorkshopBrochure, 
    getWorkshopImage, 
    getWorkshopMediaImage,
    getWorkshopReport, 
    getWorkshopStmtExpenditure 
} from "../../../utils/apiCallHandlers";
import FileCard from "./FileCard";

const { Title, Text } = Typography;

const FILE_TYPE = {
    mediaImages: 'mediaImages',
    workshopImages: 'workshopImages',
    report: 'report',
    stmtExpn: 'stmtExpn',
    brochure: 'brochure'
};

const WorkshopDocuments = ({
    isAdmin
}) => {

    const workshopFileDetails = useSelector(selectWorkshopFilesDetails);
    const apiCallStatus = useSelector(selectWorkshopApiCallStatus);

    const dispatch = useDispatch();
    const { workshopId } = useParams(); 

    const [loading, setLoading] = useState(false);

    let workshopMediaImagesList = [], 
        workshopImagesList = [], 
        workshopReportList = [], 
        workshopStmtOfExpenditureList = [],
        workshopBrochureId = null;
    
    const noDocumentUploaded = (
        <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
                <Title level = {5} className="no-margin">
                    No Document Uploaded!
                </Title>
            }
        />
    );

    if(workshopFileDetails.media_photos?.length > 0) {
        workshopMediaImagesList = workshopFileDetails.media_photos.map(file => ({
            uid: file.id,
        }));
    }
    
    if(workshopFileDetails.workshop_photos?.length > 0) {
        workshopImagesList = workshopFileDetails.workshop_photos.map(file => ({
            uid: file.id,
        }));
    }

    if(workshopFileDetails.other_docs?.report_exists) {
        workshopReportList = [{
            uid: workshopFileDetails.other_docs.id
        }];
    }

    if(workshopFileDetails.other_docs?.stmt_expenditure_exists) {
        workshopStmtOfExpenditureList = [{
            uid: workshopFileDetails.other_docs.id,
        }];
    }

    if(workshopFileDetails.other_docs?.brochure_exists) {
        workshopBrochureId = workshopFileDetails.other_docs.id;
    }

    const onFileChangeHandler = async (file, fileType) => {
        if(file && file.originFileObj) {
            const formData = new FormData();
            formData.append('workshop_id', workshopId);
            setLoading(true);
            try {
                switch(fileType) {
                    case FILE_TYPE.mediaImages:
                        formData.append('workshop_media_images', file.originFileObj);
                        await addWorkshopMediaImages(formData);
                        break;
                    case FILE_TYPE.workshopImages: 
                        formData.append('workshop_images', file.originFileObj);
                        await addWorkshopImages(formData);
                        break;
                    case FILE_TYPE.report: 
                        formData.append('workshop_report', file.originFileObj);
                        await addWorkshopReport(formData);
                        break;
                    case FILE_TYPE.stmtExpn: 
                        formData.append('workshop_stmt_of_expenditure', file.originFileObj);
                        await addWorkshopStmtExpenditure(formData);
                        break;
                };
                setLoading(false);
                await dispatch(fetchWorkshopDetails(workshopId));
            }
            catch(error) {
                setLoading(false);
            }
        }
    };

    const onPreviewHandler = async (file, fileType) => {
        try {
            let url = '', doc;
            switch(fileType) {
                case FILE_TYPE.mediaImages:
                    doc = await getWorkshopMediaImage(file.uid);
                    url = window.URL.createObjectURL(new Blob([doc.data], {type: doc.data.type}));
                    break;
                case FILE_TYPE.workshopImages:
                    doc = await getWorkshopImage(file.uid);
                    url = window.URL.createObjectURL(new Blob([doc.data], {type: doc.data.type}));
                    break;
                case FILE_TYPE.report:
                    doc = await getWorkshopReport(file.uid);
                    url = window.URL.createObjectURL(new Blob([doc.data], {type: doc.data.type}));
                    break;
                case FILE_TYPE.stmtExpn:
                    doc = await getWorkshopStmtExpenditure(file.uid);
                    url = window.URL.createObjectURL(new Blob([doc.data], {type: doc.data.type}));
                    break;
                case FILE_TYPE.brochure:
                    doc = await getWorkshopBrochure(file);
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

    const onFileRemoveHandler = async (file, fileType) => {
        setLoading(true);
        try {
            switch(fileType) {
                case FILE_TYPE.mediaImages:
                    await deleteWorkshopMediaImage(workshopId, file.uid);
                    break;
                case FILE_TYPE.workshopImages:
                    await deleteWorkshopImage(workshopId, file.uid);
                    break;
                case FILE_TYPE.report:
                    await deleteWorkshopReport(workshopId, file.uid);
                    break;
                case FILE_TYPE.stmtExpn:
                    await deleteWorkshopStmtExpendtiure(workshopId, file.uid);
                    break;
                case FILE_TYPE.brochure:
                    await deleteWorkshopBrochure(workshopId, file);
                    break;
            }
            setLoading(false);
            await dispatch(fetchWorkshopDetails(workshopId));
        }
        catch(error) {
            setLoading(false);
        }
    };

    const workshopMediaFileCards = workshopMediaImagesList.map((file, index) => (
        <FileCard 
            fileIcon={<FileImageOutlined />} 
            fileName = {"Image-" + (index + 1)} 
            key = {index} 
            onDeleteHandler = {() => onFileRemoveHandler(file, FILE_TYPE.mediaImages)}
            onPreviewHandler = {() => onPreviewHandler(file, FILE_TYPE.mediaImages)}
            disableDeleteBtn = {isAdmin}
        />
    )); 

    const workshopImagesFileCards = workshopImagesList.map((file, index) => (
        <FileCard 
            fileIcon={<FileImageOutlined />} 
            fileName = {"Image-" + (index + 1)} 
            key = {index} 
            onDeleteHandler = {() => onFileRemoveHandler(file, FILE_TYPE.workshopImages)}
            onPreviewHandler = {() => onPreviewHandler(file, FILE_TYPE.workshopImages)}
            disableDeleteBtn = {isAdmin}
        />
    )); 

    const workshopReportFileCards = workshopReportList.map((file, index) => (
        <FileCard 
            fileIcon={<FileTextOutlined />} 
            fileName = {"Workshop Report"} 
            key = {index} 
            onDeleteHandler = {() => onFileRemoveHandler(file, FILE_TYPE.report)}
            onPreviewHandler = {() => onPreviewHandler(file, FILE_TYPE.report)}
            disableDeleteBtn = {isAdmin}
        />
    )); 

    const workshopStmtExpenFileCards = workshopStmtOfExpenditureList.map((file, index) => (
        <FileCard 
            fileIcon={<FileTextOutlined />} 
            fileName = {"Workshop Statement Of Expenditure"} 
            key = {index} 
            onDeleteHandler = {() => onFileRemoveHandler(file, FILE_TYPE.stmtExpn)}
            onPreviewHandler = {() => onPreviewHandler(file, FILE_TYPE.stmtExpn)}
            disableDeleteBtn = {isAdmin}
        />
    )); 

    return (
        <Col span = {24}>
            <Card title = {"Documents"} className='card-container' loading = {isLoading(apiCallStatus)}>
                {
                    isAdmin
                    ?
                        null
                    :
                        <>
                            <Divider orientation="left" orientationMargin={0}>Media Images</Divider>
                            <Card loading = {loading}>
                                <Space direction = {"vertical"} style = {{width: '100%'}} >
                                    <Upload
                                        listType = {"picture"}
                                        beforeUpload = {() => false}
                                        onChange = {({fileList}) => onFileChangeHandler(fileList.slice(-1)[0], FILE_TYPE.mediaImages)}
                                        maxCount = {5}
                                        >
                                        {
                                            workshopMediaImagesList.length < 5 && !isAdmin
                                            ?
                                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                                            :   
                                            null
                                        }
                                    </Upload>
                                    { workshopMediaFileCards }
                                    {
                                        isAdmin
                                        ?   
                                            null
                                        :
                                            <Row align = {'end'}>
                                                <Text type = "secondary" className = "font-size-10"> (Max. 5 files allowed)</Text>
                                            </Row>
                                    }
                                </Space>
                            </Card>
                        </>
                }

                {
                    isAdmin
                    ?
                        null
                    :
                        <>
                            <Divider orientation="left" orientationMargin={0}>Workshop Images</Divider>
                            <Card>
                                <Space direction = {"vertical"} style = {{width: '100%'}}>
                                    <Upload
                                        listType = {"picture"}
                                        beforeUpload = {() => false}
                                        onChange = {({fileList}) => onFileChangeHandler(fileList.slice(-1)[0], FILE_TYPE.workshopImages)}
                                    >
                                        {
                                            workshopImagesList.length < 5 && !isAdmin
                                            ?
                                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                                            :
                                                null
                                        }
                                    </Upload>
                                    { workshopImagesFileCards }
                                    {
                                        isAdmin
                                        ?
                                            null
                                        :
                                            <Row align = {'end'}>
                                                <Text type = "secondary" className = "font-size-10"> (Max. 5 files allowed)</Text>
                                            </Row>
                                    }
                                </Space>
                            </Card>
                        </>
                }
                
                <Divider orientation="left" orientationMargin={0}>Workshop Brochure</Divider>
                <Card>
                    {
                        workshopBrochureId && 
                        <FileCard
                            fileIcon = {<FileTextOutlined />}
                            fileName = {"Brochure"}
                            onDeleteHandler = {() => onFileRemoveHandler(workshopBrochureId, FILE_TYPE.brochure)}
                            onPreviewHandler = {() => onPreviewHandler(workshopBrochureId, FILE_TYPE.brochure)}
                            disableDeleteBtn = {isAdmin}
                        />
                    }
                    {!workshopBrochureId && noDocumentUploaded}
                </Card>

                <Divider orientation="left" orientationMargin={0}>Workshop Report</Divider>
                <Card>
                    <Space direction = {"vertical"} style = {{width: '100%'}} >
                        <Upload
                            listType = {"picture"}
                            beforeUpload = {() => false}
                            onChange = {({fileList}) => onFileChangeHandler(fileList.slice(-1)[0], FILE_TYPE.report)}
                        >
                            {
                                workshopReportList.length < 1 && !isAdmin
                                ?
                                    <Button icon={<UploadOutlined />}>Upload Report</Button>
                                :   
                                    null
                            }
                        </Upload>
                        {workshopReportFileCards}
                        {
                            isAdmin
                            ?
                                null
                            :
                                <Row align = {'end'}>
                                    <Text type = "secondary" className = "font-size-10"> (Only 1 report file can be uploaded)</Text>
                                </Row>
                        }
                    </Space>
                    {workshopReportList.length === 0 && isAdmin && noDocumentUploaded}
                </Card>

                <Divider orientation="left" orientationMargin={0}>Statement Of Expenditure</Divider>
                <Card>
                    <Space direction = {"vertical"} style = {{width: '100%'}} >
                        <Upload
                            listType = {"picture"}
                            beforeUpload = {() => false}
                            onChange = {({fileList}) => onFileChangeHandler(fileList.slice(-1)[0], FILE_TYPE.stmtExpn)}
                        >
                            {
                                workshopStmtOfExpenditureList.length < 1 && !isAdmin
                                ?
                                    <Button icon={<UploadOutlined />}>Upload Statement Of Expenditure</Button>
                                :
                                    null
                            }
                        </Upload>
                        { workshopStmtExpenFileCards }
                        {
                            isAdmin 
                            ?
                                null
                            :
                                <Row align = {'end'}>
                                    <Text type = "secondary" className = "font-size-10"> (Only 1 statement file can be uploaded)</Text>
                                </Row> 
                        }
                    </Space>
                    {workshopStmtOfExpenditureList.length === 0 && isAdmin && noDocumentUploaded}
                </Card>
            </Card>
        </Col>
    );
};

export default WorkshopDocuments;