import React from "react";
import logo from "./logo.svg";
import "./App.css";

import * as Sentry from "@sentry/browser";
if (process.env.REACT_APP_SENTRY_URL) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_URL });
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
