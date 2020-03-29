import React from "react";
import * as Sentry from "@sentry/browser";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./App.css";
import { CLIENT_ROUTES } from "./routes";

if (process.env.REACT_APP_SENTRY_URL) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_URL });
}
function App() {
  return (
    <>
      <Router>
        <Switch>
          {CLIENT_ROUTES.map(({ path, component, exact }) => (
            <Route exact={exact} path={path} component={component} key={path} />
          ))}
        </Switch>
      </Router>
      <div className="App">
        <header className="App-header">
          <p>{process.env.REACT_APP_SWAGGER_URL}</p>
        </header>
      </div>
    </>
  );
}

export default App;
