import react from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import { Provider } from "react-redux";
import App from "./App";
import "antd/dist/antd.css";
import store from "./app/store";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
