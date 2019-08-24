import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/app.css";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { firebase } from "./firebase";

const App = props => {
  return (
    <BrowserRouter>
      {/* passes props(user) to routes */}
      <Routes {...props} />
    </BrowserRouter>
  );
};

firebase.auth().onAuthStateChanged(user => {
  ReactDOM.render(<App user={user} />, document.getElementById("root"));
});
