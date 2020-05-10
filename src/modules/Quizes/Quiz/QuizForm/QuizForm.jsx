import React, { useState } from "react";
import { Button, Box, Typography, Dialog } from "@material-ui/core";
import QuizService from "../../../../services/Quiz.service";
import Question from "../Question/Question";
import { useEffect } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../../../../App";
import { QUIZES } from "../../../../routes";
import { useHistory, withRouter } from "react-router-dom";

// end_time: "2020-05-31T08:00:00Z"
// id: "4"
// questions: [{id: "3", answers_type: "checkbox", text: "31312",…}]
// quiz_token: "162d68620486a29e8e022b5790a97513"
// start_time: "2020-05-06T00:00:00Z"
// title: "TEST 1"

// questions*	[QuestionReadonlySwagger{
// answers*	[AnswerReadonlySwagger{

// questions_snapshot*	[QuestionSnapshot{
// answers*	[AnswerSnapshot{
// is_ticked*	boolean

const QuizForm = (props) => {
  const { currentQuizState, loadingState, errorState } = useContext(
    ApplicationContext
  );
  const { currentQuiz } = currentQuizState;
  const history = useHistory();
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [questionsSnapshot, setQuestionsSnapshot] = useState([]);
  if (!currentQuiz) {
    history.push(QUIZES);
    return null;
  }
  const { setLoading } = loadingState;
  const { setError } = errorState;
  const { questions, title, quiz_token, id } = currentQuiz;

  var a = (q) => {
    return q.answers.filter((a) => {
      return a.is_ticked;
    }).length;
  };
  return (
    <Box margin="50px">
      <Typography variant="h3">{title}</Typography>
      <Question
        onChange={(questionId, answerId, isTicked, answers_type) => {
          const changedQuestion = questionsSnapshot.find(
            (question) => question.id === questionId
          );
          changedQuestion.answers.forEach((answer) => {
            if (answers_type === "radio" || !answer.is_ticked) {
              answer.is_ticked = false;
            }

            if (answer.id === answerId) {
              answer.is_ticked = isTicked;
            }
          });
          const newSnapshot = questionsSnapshot.map((question) => {
            if (question.id === questionId) {
              return changedQuestion;
            }
            return question;
          });
          setQuestionsSnapshot(newSnapshot);
        }}
        {...questionsSnapshot[currentQuestion]}
      />

      <Typography variant="h5">Questions state:</Typography>
      <Box display="flex">
        {questionsSnapshot.map((q, index) => {
          return (
            <Box
              width="50px"
              height="50px"
              bgcolor={a(q) ? "rgb(126, 255, 161)" : "white"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="1px 5px 5px #888888"
              margin="10px"
              borderRadius="3px"
              style={{
                transition: "all 0.3s",
                filter:
                  index === currentQuestion
                    ? "brightness(0.9)"
                    : "brightness(1)",
              }}
              onClick={() => {
                setCurrentQuestion(index);
              }}
            >
              <Typography variant="body1">{index}</Typography>
            </Box>
          );
        })}
      </Box>
      <Button
        disabled={currentQuestion === 0}
        onClick={() => {
          setCurrentQuestion(currentQuestion - 1);
        }}
      >
        Previous
      </Button>
      <Button
        disabled={currentQuestion === questionsSnapshot.length - 1}
        onClick={() => setCurrentQuestion(currentQuestion + 1)}
      >
        Next
      </Button>

      <Button
        onClick={() => {
          setLoading(true);
          QuizService.submitQuiz({
            id,
            data: { quiz_token, questions_snapshot: questionsSnapshot },
          })
            .then((response) => {
              debugger;
              setShowResultsModal(response);
            })
            .catch((error) => {
              debugger;
            })
            .finally(() => {
              localStorage.removeItem("currentQuiz");
              setLoading(false);
            });
        }}
        style={{ background: "rgb(126, 255, 161)" }}
      >
        Get results
      </Button>
      {showResultsModal && <Dialog open={showResultsModal}></Dialog>}
    </Box>
  );
};

export default withRouter(QuizForm);
