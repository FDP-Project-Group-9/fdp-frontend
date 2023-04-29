import { Button, Card, Col, Empty, Form, Input, Result, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchWorkshopDetails, selectWorkshopDetails } from "../../redux/slices/workshop-slice";
import { evaluateQuiz, getParticipantDetails, getQuizDetails, getQuizQuestionsForParticipants } from "../../utils/apiCallHandlers";
import { getUserId } from "../../utils/helper";

const { Title, Text } = Typography;

const ParticipantQuiz = () => {
    const [ loading, setLoading ] = useState(false);
    const [participantDetails, setParticipantDetails] = useState({});
    const [ quizDetails, setQuizDetails ] = useState({});
    const [ quizQuestions, setQuizQuestions ] = useState([]);
    const [ quizEvalutionAnswers, setQuizEvaluationAnswers ] = useState([]);
    const workshopDetails = useSelector(selectWorkshopDetails);

    const { workshopId } = useParams();
    const dispatch = useDispatch();

    const fetchDetails = async () => {
        try {
            setLoading(true);
            const participantDetails = await getParticipantDetails(workshopId, getUserId());
            setParticipantDetails(participantDetails);
            if(!workshopDetails.quiz_generated) {
                return;
            }
            const response = await getQuizDetails(workshopId);
            setQuizDetails(response);
            const questionResponse = await getQuizQuestionsForParticipants(workshopId, getUserId());
            setQuizQuestions(questionResponse.quiz ?? []);
            const evaluationArray = questionResponse.quiz?.map(detail => {
                return {
                    questionId: detail.question_id,
                    answer: null
                };
            });
            setQuizEvaluationAnswers(evaluationArray);
            setLoading(false);

        }
        catch(error) {
            setLoading(false);
        }
    };

const evaluateQuizHandler = async () => {
    try {
        setLoading(true);
        const data = {
            workshopId: workshopId,
            participantId: getUserId(),
            participant_answers: quizEvalutionAnswers
        };
        await evaluateQuiz(data);
        await dispatch(fetchWorkshopDetails(workshopId));
        setLoading(false);
    }
    catch(error) {
        setLoading(false);
    }
};

    useEffect(() => {
        dispatch(fetchWorkshopDetails(workshopId));
    }, []);

    useEffect(() => {
        fetchDetails();
    }, [workshopDetails]);

    const questionContent = quizQuestions.map(questionData => (
        <Col span = {24} key = {questionData.question_id}>
            <Card className="card-container" hoverable>
                <strong>
                    Question:- 
                </strong>&nbsp;
                {questionData.question_statement}
                <Row>
                    <Col span = {12}>
                        <strong>Option 1:- </strong>
                        {questionData.option1}
                    </Col>
                    <Col span = {12}>
                        <strong>Option 2:- </strong>
                        {questionData.option2}
                    </Col>
                </Row>
                <Row>
                    <Col span = {12}>
                        <strong>Option 3:- </strong>
                        {questionData.option3}
                    </Col>
                    <Col span = {12}>
                        <strong>Option 4:- </strong>
                        {questionData.option4}
                    </Col>
                </Row>
                <Row>
                    <Form.Item label = "Answer">
                        <Input placeholder="Enter the option number" onChange={(event) => {
                            const newQuizEvaluation = quizEvalutionAnswers.map(data => {
                                if(data.questionId == questionData.question_id) {
                                    return {
                                        questionId: questionData.question_id,
                                        answer: Number(event.target.value)
                                    };
                                }
                                return data;
                            });
                            setQuizEvaluationAnswers(newQuizEvaluation);
                        }}/>
                    </Form.Item>
                </Row>
            </Card>
        </Col>
    ));

    const quizContent = (
        <Row gutter = {[0, 16]}>
            <Col span = {24}>
                <Card className="card-container">
                    <Space>
                        <Title level = {4} className="no-margin">
                            Quiz Name:- {quizDetails.quiz_name}
                        </Title>
                        <Text type = "secondary">
                            ( Total Questions:- {quizDetails.total_questions ?? 0} )
                        </Text>
                    </Space>
                </Card>
            </Col>
            <Col span = {24}>
                <Row gutter = {[0, 16]}>
                    {questionContent}
                </Row>
            </Col>
            <Col span = {24}>
                <Row justify={"end"}>
                    <Button type = "primary" 
                        disabled = {quizEvalutionAnswers.filter((data) => !!data.answer).length < quizQuestions.length}
                        onClick = {evaluateQuizHandler}
                        loading = {loading}
                    >
                        Submit
                    </Button>
                </Row>
            </Col>
        </Row>
    );

    return (
        <Row>
            <Col span = {24}>
                {
                    participantDetails.quiz_attempted
                    ?
                        <>
                            <Card>
                                <Title level={4} className="no-margin">
                                    Quiz score: {participantDetails.quiz_score ?? 0}
                                </Title>
                            </Card>
                            <Result
                                subTitle = "You have already taken the quiz!"
                                status={403}
                            />
                        </>
                    :
                        workshopDetails.quiz_generated
                        ?
                            quizContent
                        :
                            <Empty
                                description = "Quiz has not been generated by the coordinator yet"
                            />
                }
            </Col>
        </Row>
    );
};

export default ParticipantQuiz;