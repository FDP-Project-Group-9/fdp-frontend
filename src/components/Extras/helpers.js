import { Tag } from "antd";

export const getWorkshopStatusTag = (workshop_completed, workshop_approval_status, draft = false) => {
    if(draft) 
        return <Tag color = "magenta">Draft</Tag>
    else if(workshop_completed)
        return <Tag color = "green">Completed</Tag>
    else if(workshop_approval_status)
        return <Tag color = "geekblue">Approved</Tag>
    else if(workshop_approval_status === null)
        return <Tag color = "orange">Waiting for Admin Approval</Tag>
    else 
        return <Tag color = "red">Rejected</Tag>
};

export const getParticipantApprovalStatusTag = (participant_approval_status) => {
    if(participant_approval_status == 3)
        return <Tag color = "green">Approved</Tag>
    else if(participant_approval_status == 2)
        return <Tag color = "geekblue">Pending</Tag>
    else 
        return <Tag color = "red">Rejected</Tag>
};

export const getTimelineStatusTag = (startDate , endDate) => {
    if(!startDate || !endDate)
        return null;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const currentDate = new Date();
    if(currentDate < startDate)
        return <Tag color = "blue">Upcoming</Tag>
    else if(currentDate > endDate)
        return <Tag color = "red">Completed</Tag>
    else
        return <Tag color = "green">Ongoing</Tag>
};