import { Affix, Button, Card, Col, Pagination, Radio, Row, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { approveRejectParticipation, getWorkshopParticipants } from "../../../utils/apiCallHandlers";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/helper";
import { getParticipantApprovalStatusTag } from "../../Extras/helpers";
import { ROUTES } from "../../../utils/constants";

const { Title } = Typography;

const getParticipantsDataForTable = (participantsDetails) => {
    return participantsDetails.map(details => ({
        key: details.participant_id,
        name: (details.title ?? "") + " " + (details.first_name ?? "") + " " + (details.last_name ?? ""),
        email: details.email_id ?? "N/A",
        mobileNo: details.mobile_no ?? "N/A",
        dob: formatDate(details.dob ?? "") ?? "N/A",
            status: getParticipantApprovalStatusTag(details.participant_approval_status ?? 2),
        participantApprovalStatus: details.participant_approval_status ?? 2,
    }));
};

const WorkshopParticipants = () => {
    const [ workshopParticipants, setWorkshopParticipants ] = useState([]);
    const [ paginationObj, setPaginationObj ] = useState({
        pageNo: 1,
        pageSize: 10,
        totalItems: 0 
    });
    const [ approvalStatus, setParticipantApprovalStatus] = useState("all");
    const [ loading, setLoading ] = useState(false);

    const { workshopId } = useParams();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (_, participantDetails) => (
                <Link to = {ROUTES.PARTICIPANT_DETAILS + "/" + participantDetails.key + "?workshopId="+workshopId}>
                    {participantDetails.name}
                </Link>
            )
        },
        {
            title: 'Email Id',
            dataIndex: 'email',
            key: 'email',
            align: 'center'
        },
        {
            title: 'Mobile No',
            dataIndex: 'mobileNo',
            key: 'mobileNo',
            align: 'center'
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'dob',
            key: 'dob',
            align: 'center'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center'
        },
        {
            title: 'Approve Participation',
            dataIndex: 'approveParticipation',
            key: 'approveParticipation',
            align: 'center',
            render: (_, participantDetails) => (
                <Space size = {10}>
                    {
                        participantDetails.participantApprovalStatus == 2 
                        ?
                            <>
                                <Button danger
                                    onClick = {() => approveRejectHandler(participantDetails.key, "rejected")}
                                >
                                    Reject
                                </Button>
                                <Button 
                                    onClick = {() => approveRejectHandler(participantDetails.key, "accepted")}
                                    type = "primary"
                                    style = {{backgroundColor: "#429d15"}}
                                >
                                    Approve
                                </Button>    
                            </>
                        :
                            participantDetails.participantApprovalStatus == 3 
                            ?
                                null
                            :
                                <Button 
                                    onClick = {() => approveRejectHandler(participantDetails.key, "accepted")}
                                    type = "primary"
                                    style = {{backgroundColor: "#429d15"}}
                                >
                                    Approve
                                </Button>   
                    }
                </Space>
            )
        },    
    ];

    const approveRejectHandler = async (participantId, status) => {
        try {
            setLoading(true);
            await approveRejectParticipation(workshopId, participantId, status);
            await fetchWorkshopParticipants();
            setLoading(false);
        }
        catch(error) {
            setLoading(false);
        }
    };

    const fetchWorkshopParticipants = async () => {
        try {
            setLoading(true);
            const response = await getWorkshopParticipants(workshopId, paginationObj.pageNo, paginationObj.pageSize, approvalStatus);
            setWorkshopParticipants(response.participants);
            setPaginationObj((value) => ({...value, totalItems: response.total_participants_count ?? 0}));
            setLoading(false);
        }
        catch(error) {
            setLoading(false);
        }
    };

    const onPaginationChangeHandler = (newPageNo, newPageSize) => {
        setPaginationObj((value) => ({...value, pageNo: newPageNo, pageSize: newPageSize}));
        fetchWorkshopParticipants();
    };

    const onParticipantStatusChangeHandler = (event) => {
        setParticipantApprovalStatus(event.target.value);
    };

    useEffect(() => {
        fetchWorkshopParticipants();
    }, [approvalStatus]);

    return (
        <Row gutter = {[24, 16]}>
            <Col span = {18}>
                <Row align="end" style = {{position: "relative"}}>
                    <Pagination
                        current = {paginationObj.pageNo}
                        pageSize = {paginationObj.pageSize}
                        total = {paginationObj.totalItems}
                        showSizeChanger
                        showQuickJumper
                        responsive
                        pageSizeOptions={[10, 25, 50]}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        onChange = {onPaginationChangeHandler}
                    />
                </Row>
            </Col>
            <Col span = {18}>
                <Table 
                    pagination = {false}
                    scroll = {workshopParticipants.length > 6 ? {y: '64vh',x : 'auto'}: {}}
                    loading = {loading}
                    columns={columns}
                    dataSource = {getParticipantsDataForTable(workshopParticipants)}
                />
            </Col>
            <Col span = {6}>
                <Affix offsetTop = {162}>
                    <Card className = "card-container" style = {{
                        height: '74vh',
                        boxSizing: 'border-box',
                    }}>
                        <Title level = {5} >Participant Approval status:-</Title>
                        <Radio.Group 
                            defaultValue="all" 
                            buttonStyle="solid" 
                            onChange = {onParticipantStatusChangeHandler}
                            value = {approvalStatus}
                        >
                            <Space direction = {"horizontal"} wrap>
                                <Radio.Button value = "all">All</Radio.Button>
                                <Radio.Button value="approved">Approved</Radio.Button>
                                <Radio.Button value="pending">Pending</Radio.Button>
                                <Radio.Button value="rejected">Rejected</Radio.Button>
                            </Space>
                        </Radio.Group>
                    </Card>
                </Affix>
            </Col>
        </Row>
    )
};

export default WorkshopParticipants;