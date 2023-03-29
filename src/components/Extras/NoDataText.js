import { Typography } from "antd";

const { Text } = Typography;

const NoDataText = () => {
    return (
        <Text type = {"secondary"} className = {"font-size-12"} style = {{paddingTop: "3px"}}>No Data</Text>
    );
};

export default NoDataText;