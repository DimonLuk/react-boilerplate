import { Box, Grid, TextField, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import QuizItem from "./Quiz/QuizItem";
import { useEffect } from "react";
import { useState } from "react";
import { ApplicationContext } from "../../App";
import { useContext } from "react";
import QuizService from "../../services/Quiz.service";

const Quizes = (props) => {
  const [quizes, setQuizes] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const { userState, loadingState, errorState } = useContext(
    ApplicationContext
  );
  const { setLoading, loading } = loadingState;
  const { setError } = errorState;

  const { user } = userState;

  const [itemChanged, setItemChanged] = useState(false);

  const renderItems = (items) => {
    if (!items.length) {
      return "No items found.";
    }
    return items.map((item) => {
      return (
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          key={Math.random() * 100000}
        >
          {!item.id ? (
            <Skeleton variant="rect" width={"100%"} height={400} />
          ) : (
            <QuizItem
              onChange={() => {
                setItemChanged((prevstate) => !prevstate);
              }}
              key={item.id}
              {...item}
            />
          )}
        </Grid>
      );
    });
  };
  useEffect(() => {
    var a = async () => {
      try {
        setLoading(true);
        const response = await QuizService.getQuizes();
        if (!response.body.items.length && localStorage.currentQuiz) {
          response.body.items.push(JSON.parse(localStorage.currentQuiz));
        }
        setQuizes(response.body.items || []);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    a();
  }, [itemChanged, setError, setLoading]);

  const history = useHistory();

  if (!user) {
    history.push("/registration");
    return null;
  }
  return (
    <>
      <Grid container>
        <Box display="flex" style={{ margin: "60px" }} width="100%">
          <Box
            display="flex"
            justifyContent="space-between"
            width="90%"
            margin="auto"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Typography variant="h3">Quizes</Typography>

              <TextField
                variant="filled"
                placeholder="Search"
                style={{ marginTop: "40px" }}
                disabled={loading}
              />
            </Box>
          </Box>
        </Box>
        <Grid
          style={{ width: "calc(100vw - 100px)", margin: "auto" }}
          container
          spacing={10}
        >
          {renderItems(quizes)}
        </Grid>
      </Grid>
    </>
  );
};
export default withRouter(Quizes);
