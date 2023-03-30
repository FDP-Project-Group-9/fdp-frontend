import { Card, Empty } from "antd";

const EmptyCard = () => {
    return (
        <Card>
            <Empty description = {"Could not load data, Please try again later!"}/>
        </Card>
    );
};

export default EmptyCard;