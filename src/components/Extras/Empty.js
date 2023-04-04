import { Card, Empty } from "antd";

const EmptyCard = () => {
    return (
        <Card className="card-container">
            <Empty description = {"Could not load data, Please try again later!"}/>
        </Card>
    );
};

export default EmptyCard;