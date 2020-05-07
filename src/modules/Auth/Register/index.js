import { Box, Button, TextField, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { ApplicationContext } from "../../../App";
import ViewWithModal from "../../../common/ViewWithModal";
import { LOGIN } from "../../../routes";
import AuthService from "../../../services/Auth.service";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { userState, loadingState, errorState } = useContext(
    ApplicationContext
  );
  const { setUser } = userState;
  const { setError } = errorState;
  const { setLoading, loading } = loadingState;
  return (
    <ViewWithModal>
      <Typography
        variant="h4"
        style={{
          margin: "0px 0px 20px",
        }}
      >
        Get Started with a Free Account!
      </Typography>
      <Box display="flex" flexDirection="column" textAlign="center">
        <TextField
          variant="filled"
          placeholder="Email"
          style={{ margin: "10px" }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          disabled={loading}
        />

        <TextField
          variant="filled"
          placeholder="Password"
          style={{ margin: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          disabled={loading}
          inputProps={{ type: "password" }}
        />

        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "30px 0px 0px",
            height: "50px",
            background: "black",
            color: "white",
          }}
          onClick={() => {
            AuthService.register({
              email: email,
              password1: password,
              password2: password,
            })
              .then((value) => {
                setUser({
                  username: value.user.username,
                  email: value.user.email,
                  wallet: value.balance,
                });
                localStorage.user = JSON.stringify({
                  username: value.user.username,
                  email: value.user.email,
                  wallet: value.balance,
                });
                history.push("/catalog");
              })
              .catch((value) => {
                setError(value);
              })
              .finally(() => setLoading(false));
            setLoading(true);
          }}
          disabled={loading || !password.length || !email.length}
        >
          Let's go
        </Button>
        <Link
          to={LOGIN}
          style={{
            margin: "20px 0px 30px",
          }}
          disabled={loading}
        >
          <Typography variant="body2">
            If you already have an account, sign in
          </Typography>
        </Link>
        {/* <Typography variant="body1">or</Typography>
        <Box
          display="flex"
          flexDirection="column"
          style={{ margin: "30px 0px 0px" }}
        >
          <Button
            variant="contained"
            color="secondary"
            style={{
              margin: "0px 0px 10px",
              height: "50px",
              background: "white",
              color: "black",
            }}
            disabled={loading}
          >
            Sign Up with Facebook
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{
              margin: "10px 0px",
              height: "50px",
              background: "white",
              color: "black",
            }}
            disabled={loading}
          >
            Sign Up with Google
          </Button>
        </Box> */}
      </Box>
    </ViewWithModal>
  );
};

Register.propTypes = {
  name: PropTypes.string,
};

export default withRouter(Register);
