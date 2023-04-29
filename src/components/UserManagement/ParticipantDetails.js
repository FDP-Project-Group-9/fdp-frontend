import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Divider, Empty, Row, Space, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchWorkshopDetails, selectWorkshopDetails } from "../../redux/slices/workshop-slice";
import { getParticipantDetails } from "../../utils/apiCallHandlers";
import { formatDate } from "../../utils/helper";
import { getParticipantApprovalStatusTag } from "../Extras/helpers";
import { updateAttendance } from "../../utils/apiCallHandlers";

const { Title, Text } = Typography;

const getAttendanceTag = (attendance, dayNo, requiredDayNo) => {
    if(attendance) 
        return <Tag color = "green">Present</Tag>
    else if(dayNo < requiredDayNo)
        return <Tag color = "orange">Cannot Update Yet</Tag>
    else 
        return <Tag color = "red">Absent</Tag>
};

const ParticipantDetails = () => {
    const workshopDetails = useSelector(selectWorkshopDetails);

    const [loading, setLoading] = useState(false);
    const [participantDetails, setParticipantDetails ] = useState({});

    const { participantId } = useParams(); 
    const workshopId = useSearchParams()[0].get('workshopId');
    const dispatch = useDispatch();

    const fetchDetails = async () => {
        try {
            setLoading(true);
            const response = await getParticipantDetails(workshopId, participantId);
            setParticipantDetails(response);
            await dispatch(fetchWorkshopDetails(workshopId));
            setLoading(false);
        }
        catch(error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const getWorkshopDay = () => {
        const currentDate = new Date().getTime();
        const workshopStartDate = new Date(workshopDetails.begin_date).getTime();
        const workshopEndDate = new Date(workshopDetails.end_date).getTime();

        let dayNo = 0;
        if(workshopEndDate - currentDate < 0 && Math.ceil((currentDate - workshopStartDate)/(1000 * 60 * 60 * 24)) > 5){
            dayNo = 6;
        }
        else if(currentDate - workshopStartDate < 0) {
            dayNo = -1;
        }
        else {
            dayNo = Math.ceil((currentDate - workshopStartDate)/(1000 * 60 * 60 * 24));
        }
        return dayNo;
    };

    const dayNo = getWorkshopDay(), workshopStartDate = new Date(workshopDetails.begin_date).getDate();

    const updateAttendanceHandler = async (present) => {
        try {
            setLoading(true);
            const data = {
                workshopId: workshopId,
                participantId: participantId,
                ['day' + dayNo]: present
            };
            await updateAttendance(data);
            fetchDetails();
            setLoading(false);
        }
        catch(error) {
            setLoading(false);
        }
    };

    const attendanceBtn = (
        <Space>
            <Button danger
                onClick = {() => updateAttendanceHandler(false)}
            >
                Mark as absent
            </Button>
            <Button type = "primary"
                onClick = {() => updateAttendanceHandler(true)}
            >
                Mark as present
            </Button>
        </Space>
    );

    return (
        <Row gutter = {[24, 24]}>
            <Col span = {24}>
                <Card className = "card-container">
                    <Title level = {2} className = "no-margin">
                        <UserOutlined />&nbsp;
                        Participant Details
                    </Title>
                </Card>
            </Col>
            <Col span = {14}>
                <Card loading = {loading}>
                    <Space direction = "vertical" size = {12}>
                        <Divider orientation = {"left"} orientationMargin = {0} className="no-margin">Personal Details</Divider>
                        <Title level = {4 } className = "no-margin">
                            {(participantDetails.title ?? "") + " " + (participantDetails.first_name ?? "") + " " + (participantDetails.last_name ?? "")}
                        </Title>
                        <Descriptions column = {1}>
                            <Descriptions.Item label = {"Participation Status"} className = {"no-padding"} labelStyle = {{fontWeight: 500}}>
                                {getParticipantApprovalStatusTag(participantDetails.participant_approval_status)}
                            </Descriptions.Item>
                            <Descriptions.Item label = {"Gender"} className = {"no-padding"} labelStyle = {{fontWeight: 500}}>
                                {participantDetails.gender}
                            </Descriptions.Item>
                            <Descriptions.Item label = {"Mobile No"} className = {"no-padding"} labelStyle = {{fontWeight: 500}}>
                                {participantDetails.mobile_no}
                            </Descriptions.Item>
                            <Descriptions.Item label = {"Date of Birth"} className = {"no-padding"} labelStyle = {{fontWeight: 500}}>
                                {formatDate(participantDetails.dob ?? "")}
                            </Descriptions.Item>                    
                            <Descriptions.Item label = {"Workshop Start Date"} className = {"no-padding"} labelStyle = {{fontWeight: 500}}>
                                {formatDate(workshopDetails.begin_date ?? "")}
                            </Descriptions.Item>                    
                            <Descriptions.Item label = {"Workshop End Date"} className = {"no-padding"} labelStyle = {{fontWeight: 500}}>
                                {formatDate(workshopDetails.end_date ?? "")}
                            </Descriptions.Item>                    
                        </Descriptions>
                    </Space>
                    <Divider orientation="left" orientationMargin={0}>Quiz Details</Divider>
                    <Descriptions>
                        <Descriptions.Item label = {"Quiz Attempted"}>
                            {participantDetails.quiz_attempted ? "Yes" : "No"}
                        </Descriptions.Item>
                        <Descriptions.Item label = {"Quiz Score"}>
                            {participantDetails.quiz_score ?? "N/A"}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </Col>
            <Col span = {10}>
                <Card loading = {loading} title = {"Attendance"}>
                    {
                        participantDetails.participant_approval_status === 2
                        ?
                            <Empty
                                description = "Participation Approval pending!"
                            />
                        :
                            participantDetails.participant_approval_status === -1
                            ?
                                <Empty
                                    description = "Participation has been rejected!"
                                />
                            :
                                dayNo < 0
                                ?
                                    <Empty
                                        description = {"Workshop has not begun yet"}
                                    />
                                :
                                    <Space size = {12} direction="vertical">
                                        <Space>
                                            <Text><strong>Day 1:- {formatDate(new Date().setDate(workshopStartDate))}</strong></Text>
                                            {
                                                dayNo == 1 && participantDetails.day1_attendance === null
                                                ?
                                                    attendanceBtn
                                                :
                                                    getAttendanceTag(participantDetails.day1_attendance, dayNo, 1)
                                            }
                                        </Space>
                                        <Space>
                                            <Text><strong>Day 2:- {formatDate(new Date().setDate(workshopStartDate + 1))}</strong></Text>
                                            {
                                                dayNo == 2 && participantDetails.day2_attendance === null
                                                ?
                                                    attendanceBtn
                                                :
                                                    getAttendanceTag(participantDetails.day2_attendance, dayNo, 2)
                                            }
                                        </Space>
                                        <Space>
                                            <Text><strong>Day 3:- {formatDate(new Date().setDate(workshopStartDate + 2))}</strong></Text>
                                            {
                                                dayNo == 3 && participantDetails.day3_attendance === null
                                                ?
                                                    attendanceBtn
                                                :
                                                    getAttendanceTag(participantDetails.day3_attendance, dayNo, 3)
                                            }
                                        </Space>
                                        <Space>
                                            <Text><strong>Day 4:- {formatDate(new Date().setDate(workshopStartDate + 3))}</strong></Text>
                                            {
                                                dayNo == 4 && participantDetails.day4_attendance === null
                                                ?
                                                    attendanceBtn
                                                :
                                                    getAttendanceTag(participantDetails.day4_attendance, dayNo, 4)
                                            }
                                        </Space>
                                        <Space>
                                            <Text><strong>Day 5:- {formatDate(new Date().setDate(workshopStartDate + 4))}</strong></Text>
                                            {
                                                dayNo == 5 && participantDetails.day5_attendance === null
                                                ?
                                                    attendanceBtn
                                                :
                                                    getAttendanceTag(participantDetails.day5_attendance, dayNo, 5)
                                            }
                                        </Space>
                                    </Space>
                    }
                </Card>
            </Col>
        </Row>
    );
};

export default ParticipantDetails;