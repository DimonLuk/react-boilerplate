import React from "react";
import PropTypes from "prop-types";

import { Grid, Paper, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
const ViewWithModal = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh-72px)",
        maxWidth: "calc(100vw - 72px)",
      }}
    >
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: "72px" }}
      >
        <Grid item xs={4}>
          <Paper
            elevation={0}
            style={{
              minHeight: "500px",
              textAlign: "left",
              padding: "50px",
            }}
          >
            <Typography variant="h4">Inspiring header.</Typography>
            <Typography variant="body1" style={{ marginTop: "30px" }}>
              This text is made to sound profeccional and descriptive of your
              application.
            </Typography>
            <Typography variant="body1" style={{ marginTop: "30px" }}>
              Join us.
            </Typography>
            <Typography variant="body1" style={{ marginTop: "30px" }}>
              Make your life easier.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            elevation={8}
            style={{
              // minHeight: "500px",
              minWidth: "400px",
              textAlign: "left",
              padding: "50px",
              background: "#fdde00",
            }}
          >
            {props.children}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

ViewWithModal.propTypes = {
  name: PropTypes.string,
};

export default withRouter(ViewWithModal);
