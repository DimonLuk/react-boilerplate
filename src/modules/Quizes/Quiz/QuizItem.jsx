import { Box, Button, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { ApplicationContext } from "../../../App";
import QuizService from "../../../services/Quiz.service";
import { QUIZES } from "../../../routes";

const QuizItem = (props) => {
  const { end_time, start_time, title, id } = props;

  const { userState, loadingState, errorState, currentQuizState } = useContext(
    ApplicationContext
  );
  const { user } = userState;
  const { setLoading } = loadingState;
  const { setError } = errorState;
  const { setCurrentQuiz } = currentQuizState;
  const history = useHistory();
  return (
    <>
      <Paper
        elevation={4}
        style={{ minWidth: "300px", minHeight: "400px", padding: "50px" }}
      >
        <Typography variant="h3">{title}</Typography>

        <Typography variant="body2" style={{ marginTop: "30px" }}>
          Start time: {moment(start_time).format("DD MMM YYYY HH:mm")}
        </Typography>

        <Typography variant="body2" style={{ marginTop: "30px" }}>
          End time: {moment(end_time).format("DD MMM YYYY HH:mm")}
        </Typography>

        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          marginTop="20px"
        >
          <Button
            onClick={() => {
              if (!localStorage.currentQuiz) {
                setLoading(true);
                QuizService.startQuiz(id)
                  .then((response) => {
                    setCurrentQuiz(response.body);
                    localStorage.currentQuiz = JSON.stringify(response.body);
                    history.push(`${QUIZES}/${id}`);
                  })
                  .catch((error) => setError(error))
                  .finally(() => setLoading(false));
                return;
              }
              history.push(`${QUIZES}/${id}`);
            }}
          >
            Open
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default withRouter(QuizItem);
