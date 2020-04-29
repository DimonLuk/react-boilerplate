import React from "react";
import * as Sentry from "@sentry/browser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./assets/styles/overrides.scss";
import { CLIENT_ROUTES } from "./routes";

if (process.env.REACT_APP_SENTRY_URL) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_URL });
}
function App() {
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
}

export default App;
