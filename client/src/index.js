import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { startGetAccount } from "./action/Account";
import { startGetTasks } from "./action/Task";
import { startGetUser } from "./action/User";
const store = configureStore();
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(startGetAccount());
store.dispatch(startGetTasks());
store.dispatch(startGetUser());
const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("root"));
