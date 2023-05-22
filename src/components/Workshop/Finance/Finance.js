import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import * as FileSaver from 'file-saver';
import * as XLSX from 'sheetjs-style';

import { fetchSpecializationAreas, getWorkshopFinanceReport } from "../../../utils/apiCallHandlers";
import { formatDate, getJWTData, getUserId } from "../../../utils/helper";
import { ROLE_NAMES } from "../../../utils/constants";

const { Title } = Typography;
const { Option } = Select;

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        align: 'center'
    },
    {
        title: 'Specialization',
        dataIndex: 'specialization',
        key: 'specialization',
        align: 'center'
    },
    {
        title: 'Start Date',
        dataIndex: 'begin_date',
        key: 'begin_date',
        align: 'center'
    },
    {
        title: 'End Date',
        dataIndex: 'end_date',
        key: 'end_date',
        align: 'center'
    },
    {
        title: 'Mode',
        dataIndex: 'mode',
        key: 'mode',
        align: 'center'
    },
    {
        title: 'Alloted Funds',
        dataIndex: 'alloted_funds',
        key: 'alloted_funds',
        align: 'center'
    },
    {
        title: 'Expenditure',
        dataIndex: 'expenditure',
        key: 'expenditure',
        align: 'center'
    },
    {
        title: 'Coordinator Name',
        dataIndex: 'coordinator_name',
        key: 'coordinator_name',
        align: 'center'
    },  
    {
        title: 'Institute Name',
        dataIndex: 'institute_name',
        key: 'institute_name',
        align: 'center'
    }
];

const Finance = () => {

    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ areaSpecilization, setAreaSpecilization] = useState([]);
    const [maxBudget, setMaxBudget ] = useState(null);
    const [ month, setMonth ] = useState(null);
    const [ year, setYear ] = useState(null);
    const [ areaSpecializationId, setAreaSpecilizationId ] = useState(null);

    const getReportData = async () => {
        try {
            const coordinatorId = getJWTData().role_name === ROLE_NAMES.COORDINATOR ? getUserId() : null;
            setLoading(true);
            const response = await getWorkshopFinanceReport(coordinatorId, month, year, maxBudget, areaSpecializationId);
            const formattedData = response.data?.map(details => {
                return {
                    title: details.title,
                    specialization: details.specialization,
                    begin_date: formatDate(details.begin_date),
                    end_date: formatDate(details.end_date),
                    mode: details.mode,
                    alloted_funds: details.alloted_funds,
                    expenditure: details.expenditure,
                    coordinator_name: details.first_name + " " + details.last_name,
                    institute_name: details.institute_name
                };
            });
            setData(formattedData);
            setLoading(false);
        }
        catch(error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReportData();
        fetchSpecializationAreas(setAreaSpecilization);
    }, []);

    const getFinanceReportExcelFile = async () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8   ';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = {
            Sheets: {
                'workshop finance': ws
            },
            SheetNames: ['workshop finance']
        };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
        const fileData = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(fileData, "Report" + fileExtension)
    };

    return (
        <Row gutter = {[0, 16]}>
            <Col span = {24}>
                <Card className="card-container">
                    <Title level={2} className="no-margin">
                        Finance Report
                    </Title>
                </Card> 
            </Col>
            <Col span = {24}>
                <Row gutter = {[16, 0]}>
                    <Col span = {18}>
                        <Space size = {12}>
                            <Input placeholder="Max Budget" type = "number" onChange={(event) => setMaxBudget(event.target.value)}
                            allowClear />
                            <DatePicker picker="month" onChange={(date) => setMonth(date.month())} allowClear/>
                            <DatePicker picker="year" onChange={(date) => setYear(date.year())} allowClear/>
                            <Select style = {{width: "200px"}} placeholder = "Area specialization"
                                onChange={(event) => {
                                    setAreaSpecilizationId(event);
                                }}
                                allowClear
                                onClear={() => setAreaSpecilizationId(null)}
                            >
                                {
                                    areaSpecilization.map(specialization => {
                                        return (
                                            <Option value = {specialization.id}>{specialization.specialization}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Space>
                    </Col>
                    <Col span = {6}>
                        <Space size = {10}>
                            <Button onClick={getReportData}>
                                Apply Filters
                            </Button>
                            <Button onClick={getFinanceReportExcelFile} type="primary">
                                Download Report
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Col>
            <Col span = {24}>
                <Table 
                    scroll={{x: '99vw'}}
                    className = "card-container"
                    columns = {columns}
                    pagination = {false}
                    loading = {loading}
                    dataSource={data}
                />
            </Col>
        </Row>
    )
};

export default Finance;