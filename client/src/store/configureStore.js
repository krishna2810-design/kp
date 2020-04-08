import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import countReducer from "../reducer/Count";
import accountReducer from "../reducer/Account";
import taskReducer from "../reducer/Task";
import userReducer from "../reducer/User";
const configureStore = () => {
  const store = createStore(
    combineReducers({
      count: countReducer,
      account: accountReducer,
      task: taskReducer,
      user: userReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};
export default configureStore;
