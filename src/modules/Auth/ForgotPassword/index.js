import React from "react";
import PropTypes from "prop-types";

import { Grid, Paper, Typography } from "@material-ui/core";
const ForgotPassword = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "red",
        minHeight: "100vh",
      }}
    >
      <Grid container justify="center" alignItems="center">
        <Grid item xs={8}>
          <Paper
            style={{ minHeight: "600px", textAlign: "center", padding: "50px" }}
          >
            <Typography variant="h3">Restore password</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

ForgotPassword.propTypes = {
  name: PropTypes.string,
};

export default ForgotPassword;
