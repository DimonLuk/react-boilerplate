import React, { useState, useEffect } from "react";
import * as Sentry from "@sentry/browser";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import "./assets/styles/overrides.scss";
import { CLIENT_ROUTES } from "./routes";
import {
  Typography,
  Box,
  createMuiTheme,
  Paper,
  Popover,
  LinearProgress,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/core/styles";
import ApiService from "./services/Api.service";
import AuthService from "./services/Auth.service";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

if (process.env.REACT_APP_SENTRY_URL) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_URL });
}
const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: {
      main: "#fdde00",
    },
  },
});
export const ApplicationContext = React.createContext({});

const App = () => {
  const [user, setUser] = useState("");
  const [currentItem, setCurrentItem] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [loadingClient, setLoadingClient] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (loading) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const usr = user || (localStorage.user && JSON.parse(localStorage.user));
  const itm =
    currentItem ||
    (localStorage.currentItem && JSON.parse(localStorage.currentItem));
  const getErrorAlertValues = () => {
    return !error.response.body.detail ? (
      Object.values(error.response.body).map((errorsArr) =>
        errorsArr.map((error) => (
          <Typography variant="body1" key={Math.random() * 100000}>
            {error}
          </Typography>
        ))
      )
    ) : (
      <Typography variant="body1">{error.response.body.detail}</Typography>
    );
  };
  const er = error && getErrorAlertValues();

  useEffect(() => {
    new ApiService().init().then(() => {
      if (window.client) {
        setLoadingClient(false);
      }
    });
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        userState: {
          user: usr,
          setUser,
        },
        currentItemState: {
          currentItem: itm,
          setCurrentItem,
        },
        loadingState: {
          loading,
          setLoading,
        },
        errorState: {
          error,
          setError,
        },
      }}
    >
      <ThemeProvider theme={theme}>
        {loadingClient ? (
          <>
            <LinearProgress
              variant="query"
              style={{ height: "7px", position: "fixed", width: "100%" }}
            />
            <Typography
              variant="h2"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                color: "#d0d0d0",
              }}
            >
              Please wait, API is loading...
            </Typography>
          </>
        ) : (
          <Router>
            {loading && (
              <LinearProgress
                variant="query"
                style={{ height: "7px", position: "fixed", width: "100%" }}
              />
            )}

            <Box
              display="flex"
              boxShadow="0 5px 10px #f1f1f1"
              style={{ padding: "20px 50px" }}
              justifyContent="space-between"
            >
              <Typography variant="h5">
                {process.env.REACT_APP_PROJECT_NAME || "Project Name"}
              </Typography>
              {usr && (
                <>
                  <Box display="flex">
                    {usr.wallet && (
                      <Typography
                        variant="body1"
                        className="slim-h5"
                        style={{ marginRight: "30px" }}
                      >
                        Wallet: ${usr.wallet}
                      </Typography>
                    )}

                    <Typography variant="h5" onClick={handleClick}>
                      {usr.username}
                    </Typography>
                  </Box>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Paper style={{ width: "100px", padding: "10px" }}>
                      <Link
                        to="/"
                        onClick={() => {
                          AuthService.logout()
                            .then(() => {
                              handleClose();

                              setUser(false);
                            })
                            .catch((value) => {
                              setError(value);
                            })
                            .finally(() => setLoading(false));
                          setLoading(true);
                        }}
                      >
                        <Typography variant="body1">Log out</Typography>
                      </Link>
                    </Paper>
                  </Popover>
                </>
              )}
            </Box>
            <Switch>
              {CLIENT_ROUTES.map(({ route, component, exact }) => (
                <Route
                  exact={exact}
                  path={route}
                  component={component}
                  key={route}
                />
              ))}
            </Switch>
            {error && (
              <Alert
                variant="filled"
                severity="error"
                onClose={() => {
                  setError(false);
                }}
                style={{
                  position: "fixed",
                  bottom: "10px",
                  width: "50%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <AlertTitle>{error.message}</AlertTitle>
                {er}
              </Alert>
            )}
          </Router>
        )}
      </ThemeProvider>
    </ApplicationContext.Provider>
  );
};

export default App;
