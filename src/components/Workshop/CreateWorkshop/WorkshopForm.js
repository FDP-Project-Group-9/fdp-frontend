import { Button, Card, message, Row, Steps, theme, Col, Result } from 'antd';
import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { 
  selectWorkshopApiCallStatus, 
  selectWorkshopOTPVerificationStatus,
  fetchWorkshopDetails,
  modifyWorkshopDetails,
  selectWorkshopDraftStatus,
  selectWorkshopCoordinatorDetails
 } from '../../../redux/slices/workshop-slice';
 import { modifyCoordinatorExtraDetails, modifyInstituteDetails, selectUserApiCallStatus } from '../../../redux/slices/user-slice';

import CoordinatorDetails from './CoordinatorDetails';
import WorkshopDetails from './WorkshopDetails';
import InstituteDetails from './InstituteDetails';
import { ArrowLeftOutlined, ArrowRightOutlined, DownSquareFilled } from '@ant-design/icons';
import { apiStatusFailed, getUserId, isLoading } from '../../../utils/helper';
import Empty from '../../Extras/Empty';
import { ROUTES } from '../../../utils/constants';
import OtpVerficationContainer from './OtpVerificationContainer';

const WorkshopForm = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [notAuthorized, setNotAuthorized] = useState(false);
  const [stepStatus, setStepStatus] = useState("process");
  const [formObj, setFormObj] = useState();
  const [extraApiRequestData, setExtraApiRequestData] = useState({});

  const { workshopId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiCallStatus = useSelector(selectWorkshopApiCallStatus);
  const userApiCallStatus = useSelector(selectUserApiCallStatus);
  const workshopCoordinatorDetails = useSelector(selectWorkshopCoordinatorDetails);
  const workshopDraftStatus = useSelector(selectWorkshopDraftStatus);
  const otpVerified = useSelector(selectWorkshopOTPVerificationStatus);

  useEffect(() => {
    (async () => {
      await dispatch(fetchWorkshopDetails(workshopId));
      if(otpVerified && workshopDraftStatus) {
        setCurrent(3);
      }
      if( workshopCoordinatorDetails.user_id && workshopCoordinatorDetails.user_id !== Number(getUserId())) {
        setNotAuthorized(true);
      }
      else {
        setNotAuthorized(false);
      }
    })();
  }, [workshopDraftStatus]);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  
  const viewWorkshopDetailsHandler = () => {
    navigate(ROUTES.My_WORKSHOP + "/" + workshopId);
  };

  const onNextClickHandler = async () => {
    try {
      await formObj.validateFields();
      const data = {...formObj.getFieldsValue(), workshop_id: workshopId};
      const dataBody = {
        ...extraApiRequestData,
        data
      };
      if(current == 0) {  
        const response = await dispatch(modifyCoordinatorExtraDetails(dataBody))
        if(response.meta?.requestStatus === 'rejected'){
          setStepStatus("error");
          throw new Error("Failed");
        }
      }
      else if(current == 1) {
        const response = await dispatch(modifyInstituteDetails(dataBody))
        if(response.meta?.requestStatus === 'rejected'){
          setStepStatus("error");
          throw new Error("Failed");
        }
      }
      else if(current == 2){
        dataBody.data = {
          ...dataBody.data,
          begin_date: dataBody.data?.begin_date?.format('YYYY-MM-DD'),
          end_date: dataBody.data?.end_date?.format('YYYY-MM-DD')
        }
        const response = await dispatch(modifyWorkshopDetails(dataBody))
        if(response.meta?.requestStatus === 'rejected'){
          setStepStatus("error");
          throw new Error("Failed");
        }
      }
      dispatch(fetchWorkshopDetails(workshopId));
      setStepStatus("process");
      next();
    }
    catch(error) {
      message.error("Please resolve all the errors to proceed further!");
      setStepStatus("error");
    } 
  };

  const steps = [
    {
      title: 'Coordinator Details',
      content: <CoordinatorDetails setFormObj = {setFormObj} setExtraApiRequestData = {setExtraApiRequestData}/>,
    },
    {
      title: 'Institute Details',
      content: <InstituteDetails setFormObj = {setFormObj} setExtraApiRequestData = {setExtraApiRequestData}/>,
    },
    {
      title: 'Workshop Details',
      content:  <WorkshopDetails setFormObj = {setFormObj} setExtraApiRequestData = {setExtraApiRequestData}/>,
    },
    {
      title: 'OTP Verification',
      content: <OtpVerficationContainer workshopId = {workshopId}/>
    }
  ];
  
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    minHeight: '58vh',
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`
  };

  return (
    <Row gutter={[0, 24]} justify = {"center"}>
      {
        apiStatusFailed(apiCallStatus)
        ?
          <Col span = {24}>
            <Empty />
          </Col>
        :
        (
            notAuthorized 
            ?
              <Result
                status = {404}
                title = "Not Authorized!"
                subTitle = "You can only create/edit your own workshops!"
                extra = {
                  <Button
                    type = {"primary"}
                    onClick = {() => navigate(ROUTES.My_WORKSHOP)}
                  >
                    View Your Workshops
                  </Button>
                }
              />
            :
              (!otpVerified || workshopDraftStatus)
              ?
                <>
                  <Steps current={current} items={items} status = {stepStatus}/>
                  <Col span = {24}>
                    <Card style={contentStyle} className = {"card-container"} loading = {isLoading(apiCallStatus)} bodyStyle = {{minHeight: '58vh'}}>
                      <Row style = {{minHeight: 'calc(58vh - 48px)'}} align = {"middle"}>
                        <Col span = {24}>
                          { steps[current].content }
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Row style = {{width: "100%"}} justify = {"end"}>
                    <Col>
                        {current > 0 && (
                          <Button
                            style={{
                              margin: '0 8px',
                            }}
                            onClick={() => prev()}
                            icon = {<ArrowLeftOutlined />}
                          >
                            Previous
                          </Button>
                        )}
                        {current < steps.length - 1 && (
                          <Button type="primary" onClick={onNextClickHandler} icon = {<ArrowRightOutlined />} loading = {isLoading(apiCallStatus) || isLoading(userApiCallStatus)}>
                            Save as Draft
                          </Button>
                        )}
                        {/* {current === steps.length - 1 && (
                          <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Submit Workshop
                          </Button>
                        )} */}
                    </Col>
                  </Row>
                </>
              :
                <Result
                  status = "500"
                  title = "Application has already been created for this workshop number!"
                  subTitle = "Once submitted, an application cannot be created again for the same workshop number!"
                  extra = {
                    <Button
                      type = {"primary"}
                      onClick = {viewWorkshopDetailsHandler}
                    >
                      View Details for Workshop No. {workshopId}
                    </Button>
                  }
                />
            
        )}
    </Row>
  );
};

export default WorkshopForm;