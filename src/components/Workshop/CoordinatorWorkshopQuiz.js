import { Button, Card, Col, Input, Row, Space, Typography, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkshopDetails, selectWorkshopDetails } from "../../redux/slices/workshop-slice";
import { useEffect, useState } from "react";
import { addQuizQuestion, createQuizForWorkshop, deleteQuizQuestion, getQuizDetails } from "../../utils/apiCallHandlers";
import { useParams } from "react-router-dom";
import { getQuizQuestionsForWorkshop } from "../../utils/apiCallHandlers";

const { Title, Text } = Typography;

const Quiz = () => {
    const [ loading, setLoading ] = useState(false);
    const [ addButtonLoading, setAddButtonLoading ] = useState(false);
    const [ quizName, setQuizName ] = useState("");
    const [ quizDetails, setQuizDetails ] = useState({});
    const [ quizQuestions, setQuizQuestions ] = useState([]);
    const [ quizQuestionValue, setQuizQuestionValues] = useState({
        question_statement: "",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        answer:null
    });
    const [addQuestion, setAddQuestion] = useState(false);

    const workshopDetails = useSelector(selectWorkshopDetails);

    const { workshopId } = useParams();
    const dispatch = useDispatch();

    const fetchQuizDetails = async () => {
        try {
            if(!workshopDetails.quiz_generated) {
                return;
            }
            setLoading(true);
            const response = await getQuizDetails(workshopId);
            setQuizDetails(response);
            const questionsResponse = await getQuizQuestionsForWorkshop(workshopId);
            setQuizQuestions(questionsResponse.quiz ?? []);
            setLoading(false);
        }
        catch(error) {
            setLoading(false);
        }
    };

    const createQuizHandler = async () => {
        try {
            setLoading(true);
            const data = {
                quiz_name: quizName,
                workshopId: workshopId
            };
            await createQuizForWorkshop(data);
            await dispatch(fetchWorkshopDetails(workshopId));
            setLoading(false);
        }
        catch(error) {
            setLoading(false);
        }
    };

    const addQuestionToQuiz = async () => {
        try {
            setAddButtonLoading(true);
            const data = {
                workshopId: workshopId,
                ...quizQuestionValue
            };
            await addQuizQuestion(data);
            await dispatch(fetchWorkshopDetails(workshopId));
            setQuizQuestionValues({
                question_statement: "",
                option1:"",
                option2:"",
                option3:"",
                option4:"",
                answer:null
            });
            setAddQuestion(false);
            setAddButtonLoading(false);
        }
        catch(error) {
            setAddButtonLoading(false);
        }
    };

    const deleteQuizQuestionHandler = async (questionId) => {
        try {
            setLoading(true);
            const data = {
                quizId: quizDetails.id,
                workshopId: workshopId,
                question_id: questionId
            };
            await deleteQuizQuestion(data);
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
        fetchQuizDetails();
    }, [workshopDetails]);

    const questionsContent = quizQuestions.map(questionData => (
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
                    <Col span = {12}>
                        <strong>
                            Answer:- 
                        </strong>
                        &nbsp;
                        {questionData[`option${questionData.answer}`]}
                    </Col>
                    <Col span = {12}>
                        <Row justify={"end"}>
                            <Button danger onClick = {() => deleteQuizQuestionHandler(questionData.question_id) }>
                                Delete Question
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Col>
    ));

    const questionDraft = (
        <Col span = {24}>
            <Card className = "card-container">
                <Form.Item label = "Question Statement">
                    <Input 
                        placeholder="Enter the question statement" 
                        value = {quizQuestionValue.question_statement} 
                        onChange={(event) => setQuizQuestionValues((value) => ({...value, question_statement: event.target.value}))}
                    />
                </Form.Item>
                <Row gutter = {[24, 0]}>
                    <Col span = {12}>
                        <Form.Item label = "Option 1">
                            <Input 
                                placeholder="Enter the first option"
                                value = {quizQuestionValue.option1}
                                onChange = {(event) => setQuizQuestionValues((value) => ({...value, option1: event.target.value}))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span = {12}>
                        <Form.Item label = "Option 2">
                            <Input 
                                placeholder="Enter the second option"
                                value = {quizQuestionValue.option2}
                                onChange = {(event) => setQuizQuestionValues((value) => ({...value, option2: event.target.value}))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter = {[24, 0]}>
                    <Col span = {12}>
                        <Form.Item label = "Option 3">
                            <Input 
                                placeholder="Enter the third option"
                                value = {quizQuestionValue.option3}
                                onChange = {(event) => setQuizQuestionValues((value) => ({...value, option3: event.target.value}))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span = {12}>
                        <Form.Item label = "Option 4">
                            <Input 
                                placeholder="Enter the fourth option"
                                value = {quizQuestionValue.option4}
                                onChange = {(event) => setQuizQuestionValues((value) => ({...value, option4: event.target.value}))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span = {12}>
                        <Form.Item label = "Answer Option Number">
                            <Input 
                                placeholder="Enter the correction option number"
                                value = {quizQuestionValue.answer}
                                onChange = {(event) => setQuizQuestionValues((value) => ({...value, answer: Number(event.target.value)}))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"end"}>
                    <Button
                        type = "primary"
                        onClick={addQuestionToQuiz}
                        loading = {addButtonLoading}
                    >
                        Save Question
                    </Button>
                </Row>
            </Card>
        </Col>
    );

    const quizContent = (
        <Row gutter = {[0, 16]}>
            <Col span = {24}>
                <Card className="card-container">
                    <Space>
                        <Title level = {4} className="no-margin">
                            Quiz Name: {quizDetails.quiz_name}
                        </Title>
                        <Text type = "secondary" style = {{fontSize: 12}}>(Total Questions:- {quizDetails.total_questions ?? 0})</Text>
                    </Space>
                </Card>
            </Col>

            <Col span = {24}>
                <Row gutter = {[0, 16]}>
                    {questionsContent}
                </Row>
            </Col>

            {
                addQuestion
                ?
                    questionDraft
                :
                    null
            }
            <Col span = {24}>
                <Row justify={"end"}>
                    <Button
                        type = "primary"
                        onClick = {() => setAddQuestion(true)}
                    >
                        Add Question
                    </Button>
                </Row>
            </Col>
        </Row>
    );

    return (
        <Row>
            <Col span = {24}>
                {
                    workshopDetails.quiz_generated
                    ?
                        <Col span = {24}>
                            {quizContent}
                        </Col>
                    :
                    <Row align={"middle"} justify={"center"} style = {{height: '75vh'}}>
                        <Card style = {{height: '60vh',width: '60%', display: 'flex', alignItems: "center", flexDirection: 'column', justifyContent: "center"}}
                            className = {"card-container"}
                            loading = {loading}
                        >
                            <Space direction="vertical" size = {8} align = "center">
                                <Title level={4} className = "no-margin">Create a Quiz for workshop no: {workshopId}</Title>
                                <Text type="secondary">Create a quiz so that participants can take the quiz to be eligible for a certificate</Text>
                                <Input placeholder="Enter quiz name" value = {quizName} onChange = {(event) => setQuizName(event.target.value)}/>
                                <Button style = {{marginTop: "20px"}}
                                    type = {"primary"}
                                    loading = {loading}
                                    onClick = {createQuizHandler}
                                >
                                    Generate Quiz
                                </Button>
                            </Space>
                        </Card>
                    </Row>
                }
            </Col>
        </Row>
    );
};

export default Quiz;