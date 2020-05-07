import React from "react";
import Feedback from "./Feedback";
import { Box, TextField, Typography } from "@material-ui/core";

const FeedbackSection = (props) => {
  const feedbackArray = props.feedbacks || [];

  return (
    <Box display="flex" flexDirection="column" style={props.style}>
      {props.canAddFeedback && (
        <>
          <Typography variant="h5" style={{ marginBottom: "50px" }}>
            Leave your feedback:
          </Typography>
          <TextField
            variant="filled"
            placeholder="Your feedback"
            multiline
            rows={4}
          />
          <Feedback newMode stars={10} style={{ margin: "25px 0px 50px" }} />
        </>
      )}
    </Box>
  );
};

export default FeedbackSection;
