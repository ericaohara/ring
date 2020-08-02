import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import reducers from "./reducers";
import "semantic-ui-css/semantic.min.css";
import "./style.css";

ReactDOM.render(
  // <Provider store={createStore(reducers)}>
  <App />,
  // </Provider>,
  document.getElementById("root")
);
