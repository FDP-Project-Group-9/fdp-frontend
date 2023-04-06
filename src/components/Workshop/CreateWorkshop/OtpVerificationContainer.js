import { Row, Col, Card, Typography, Button, Space, Form, Input, message, Progress, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchWorkshopDetails, selectWorkshopOTPVerificationStatus } from "../../../redux/slices/workshop-slice";
import { requestHandler } from "../../../utils/apiCall";
import { WORKSHOP_API_URLS } from "../../../utils/apiUrls";
import { ROUTES } from "../../../utils/constants";
import { getOtpSent, getOtpSentTime, removeOtpSent, removeOtpSentTime, setOtpSent, setOtpSentTime } from "../../../utils/helper";

const { Title, Text } = Typography;
const waitTime = 120000;

const getWorkshopSubmissionOtp = async () => {
    try {
      await requestHandler.get(WORKSHOP_API_URLS.GET_WORKSHOP_APPLICATION_SUBMIT_OTP);
      message.success("OTP has been sent to the registered mobile number!");
    }
    catch(error) {
        message.error("Could not send OTP, please try again after 10 mins!");
        throw error;
    }
};

const verifyWorkshopSubmissionOtp = async ({ otp, workshopId}) => {
    try {
        await requestHandler.post(WORKSHOP_API_URLS.VERIFY_WORKSHOP_APPLICATION_SUBMIT_OTP, {otp, workshop_id: workshopId});
    }
    catch(error) {
        throw error;
    }
};

const createWorkshop = async (workshopId) => {
    try {
        await requestHandler.put(WORKSHOP_API_URLS.SUBMIT_WORKSHOP_APPLICATION, {
            workshop_id: workshopId
        });
    }
    catch(error) {
        throw error;
    }
};

const OtpVerficationContainer = ({ workshopId }) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [disableResendOtpButton, setDisableResendOtpButton] = useState(false);
    const [wasOtpSent, setWasOtpSent] = useState(false);
    const [timer, setTimer] = useState(null);
    const [otp, setOtp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingResendButton, setLoadingResendButton] = useState(false);

    const otpVerified = useSelector(selectWorkshopOTPVerificationStatus);

    //use effect to check if the timer for resend button is still running
    useEffect(() => {
        const currentTime = (new Date()).getTime();
        setWasOtpSent(getOtpSent() && getOtpSent() == 'true' ? true : false);
        //if the timer is completed then remove the timer from local storage and enable the resend button
        if(currentTime >= waitTime + Number(getOtpSentTime())){
            removeOtpSentTime();
            setDisableResendOtpButton(false);
        }
        //otherwise disable the resend button
        else{
            setTimer((currentTime - Number(getOtpSentTime()))/1000);
            setDisableResendOtpButton(true);
        }
    }, []);


    //update the timer 
    useEffect(() => {
        if(timer >= 120) {
            setDisableResendOtpButton(false);
            removeOtpSentTime();
        }
        if(disableResendOtpButton) {
            setTimeout(() => {
                setTimer((value) => value + 1);
            }, 1000);
        }
    }, [timer]);

    const onOtpChangeHandler = (event) => {
        setOtp(event.target.value);
    };

    //resend button click event handler
    const resendOtpHandler = async () => {
        setLoadingResendButton(true);
        try {
            await getWorkshopSubmissionOtp();
            setLoadingResendButton(false);
            //disable the resend button
            setDisableResendOtpButton(true);
            //set timer to 0
            setTimer(0);
            //get current time
            const time = (new Date()).getTime();
            //set time of click in local storage
            setOtpSentTime(time);
            //begin set timeout function to remove the disabling logic
            setTimeout(() => {
                setDisableResendOtpButton(false);
                removeOtpSentTime();
            }, 120000);
        }
        catch(error) {
            setLoadingResendButton(false);
        }
    };

    const sendOtpHandler = async () => {
        setLoading(true);
        try {
            await getWorkshopSubmissionOtp();
            setOtpSent(true);
            setWasOtpSent(true);
            setDisableResendOtpButton(true);
            setTimer(0);
            const time = (new Date()).getTime();
            setOtpSentTime(time);
            setTimeout(() => {
                setDisableResendOtpButton(false);
                removeOtpSentTime();
            }, 120000);
            setLoading(false);
        }
        catch(error) {
            setLoadingResendButton(false);
        }
    };

    const verifyOtpHandler = async () => {
        setLoading(true);
        try {
            if(!otp) {
                message.error("Please enter the OTP!");
                throw new Error();
            }
            await verifyWorkshopSubmissionOtp({otp: otp, workshopId: workshopId});
            await dispatch(fetchWorkshopDetails(workshopId));
            setLoading(false);
            setOtp("");
            setDisableResendOtpButton(false);
            //removing local storage for otp
            removeOtpSentTime();
            removeOtpSent();
        }
        catch(error) {
            setLoading(false);
        }
    };

    const onSubmitApplicationHandler = async () => {
        setLoading(true);
        try {
            await createWorkshop(workshopId);
            setLoading(false);
            navigate(ROUTES.MY_WORKSHOP);
        }
        catch(error) {
            setLoading(false);
        }
    };

    return (
        <Row justify = "center">
            <Col span = {16}>
                <Card style = {{minHeight: '40vh', display: 'flex', alignItems: "center", flexDirection: 'column', justifyContent: "center"}}
                    className = {"card-container"}
                >
                    <Space direction="vertical" size = {8} align = "center">
                        {
                            !otpVerified 
                            ?
                                wasOtpSent || disableResendOtpButton
                                ?
                                    <>
                                        <Title level={4} className = "no-margin">Enter the One Time Password</Title>
                                        <Text type="secondary">An OTP has been sent to your registered mobile number!</Text>
                                        <Form>
                                            <Form.Item
                                                label = {"OTP"}
                                                name = {"otp"}
                                            >
                                                <Input placeholder="Enter the OTP" onChange = {onOtpChangeHandler} type = {"number"} value = {otp}/>
                                            </Form.Item>
                                        </Form>
                                        <Space>
                                            <Tooltip title = {disableResendOtpButton ? "Wait for 2 mins before resending the OTP!" : ""}>
                                                <Button
                                                    icon = {disableResendOtpButton ? <Progress status="active" percent = {(timer * 100)/120} type = {"circle"} size = {16}/> : null}
                                                    disabled = {disableResendOtpButton}
                                                    onClick = {resendOtpHandler}
                                                    loading = {loadingResendButton}
                                                >
                                                    &nbsp;Resend OTP
                                                </Button>
                                            </Tooltip>
                                            <Button
                                                type = {"primary"}
                                                loading = {loading}
                                                onClick = {verifyOtpHandler}
                                            >
                                                Verify OTP
                                            </Button>
                                        </Space>
                                    </>
                                :
                                <>
                                    <Title level={4} className = "no-margin">Verify workshop application via OTP</Title>
                                    <Text type="secondary">OTP verification is required before the final submission of workshop application!</Text>
                                    <Button
                                        type = {"primary"}
                                        onClick = {sendOtpHandler}
                                        loading = {loading}
                                    >
                                        Send OTP
                                    </Button>
                                </>
                            :
                            <>
                                <Title level={4} className = "no-margin">Submit Workshop Application!</Title>
                                <Text type="secondary">After successful submission of workshop application, </Text>
                                <Text type = "secondary">the <b>Administrator</b> will be notified requesting the approval for workshop number- <b>{workshopId}</b></Text>
                                <Button
                                    type = {"primary"}
                                    onClick = {onSubmitApplicationHandler}
                                    loading = {loading}
                                    style = {{marginTop: "20px"}}
                                >
                                    Submit Application
                                </Button>
                            </>
                        }
                    </Space>
                </Card>
            </Col>
        </Row>
    );
};

export default OtpVerficationContainer;