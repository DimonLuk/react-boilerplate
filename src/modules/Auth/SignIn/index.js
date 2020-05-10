import { Box, Button, TextField, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import ViewWithModal from "../../../common/ViewWithModal";
import { REGISTRATION, QUIZES } from "../../../routes";
import AuthService from "../../../services/Auth.service";
import { ApplicationContext } from "../../../App";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const { userState, loadingState, errorState } = useContext(
    ApplicationContext
  );
  const { setUser } = userState;
  const [password, setPassword] = useState("");
  const { loading, setLoading } = loadingState;
  const { setError } = errorState;

  const history = useHistory();
  return (
    <ViewWithModal>
      <Typography
        variant="h4"
        style={{
          margin: "0px 0px 20px",
        }}
      >
        Sign in to your account
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
          inputProps={{ type: "password" }}
          disabled={loading}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            margin: "30px 0px 30px",
            height: "50px",
            background: "black",
            color: "white",
          }}
          disabled={loading || !password.length || !email.length}
          onClick={() => {
            AuthService.login({ password, email })
              .then((value) => {
                setUser({
                  username: value.user.username,
                  email: value.user.email,
                });
                localStorage.user = JSON.stringify({
                  username: value.user.username,
                  email: value.user.email,
                });

                history.push(QUIZES);
              })
              .catch((value) => {
                setError(value);
              })
              .finally(() => setLoading(false));
            setLoading(true);
          }}
        >
          Sign In
        </Button>
        <Link
          to={REGISTRATION}
          style={{
            margin: "0px 0px 30px",
          }}
          disabled={loading}
        >
          <Typography variant="body2">Create new account</Typography>
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
              color: '#101010',
            }}
          >
            Sign In with Facebook
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{
              margin: "10px 0px",
              height: "50px",
              background: "white",
              color: '#101010',
            }}
          >
            Sign In with Google
          </Button>
        </Box>*/}
      </Box>
    </ViewWithModal>
  );
};

SignIn.propTypes = {
  name: PropTypes.string,
};

export default SignIn;
