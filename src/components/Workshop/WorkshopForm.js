import { Button, message, Steps, theme } from 'antd';
import { useState, useEffect } from 'react';
import CoordinatorDetails from './CoordinatorDetails';
import WorkshopDetails from './WorkshopDetails';
import InstituteDetails from './InstituteDetails';
import { getWorkshopDetails } from '../../utils/apiCall';

const NewWorkShop = () => {
    return <h1>Agraj</h1>
}
const steps = [
  {
    title: 'Coordinator Details',
    content: <CoordinatorDetails />,
  },
  {
    title: 'Institute Details',
    content: <InstituteDetails />,
  },
  {
    title: 'Workshop Details',
    content:  <WorkshopDetails />,
  },
];
const WorkshopForm = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [coordinatorDetails, setCoordinatorDetails] = useState({});
  const [institutionDetails, setInstitutionDetails] = useState({});
  const [workshopDetails, setWorkshopDetails] = useState({});

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  useEffect(() => {
    const workshop_id = 1;
    getWorkshopDetails(workshop_id) 
    .then((res) => {

      console.log(res);
      setInstitutionDetails(res.data.data.institute_details);
      setCoordinatorDetails(res.data.data.coordinator_details);
      setWorkshopDetails(res.data.data.workshop_details);
    })
    .catch((err) => {
      console.log(err)
    })
    console.log("agraj");
 }, [])
 console.log(coordinatorDetails, institutionDetails, workshopDetails)
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
          float : 'right'
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default WorkshopForm;