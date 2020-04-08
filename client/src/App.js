import React from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import Header from "./component/Header";
import Count from "./component/Count";
import Home from "./component/Home";
import UserRegister from "./component/user/Register";
import UserLogin from "./component/user/Login";
import AdminDashboard from "./component/admin/AdminDashboard";
import AdminTest from "./component/admin/AdminTest";
import Task from "./component/admin/Task";
import TaskView from "./component/admin/TaskView";
import CreateTask from "./component/admin/TaskCreate";
import EmployeeDashboard from "./component/employee/EmployeeDashboard";
import EmployeeTaskView from "./component/employee/TaskView";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/count" component={Count} />
          <Route path="/register" component={UserRegister} />
          <Route path="/login" component={UserLogin} />

          <PrivateRoute path="/admin" component={AdminDashboard} />
          <PrivateRoute path="/task" component={Task} exact={true} />
          <PrivateRoute path="/task/create" component={CreateTask} />
          <PrivateRoute path="/task/:id" component={TaskView} exact={true} />

          <PrivateRoute
            path="/employee"
            component={EmployeeDashboard}
            exact={true}
          />
          {/* <PrivateRoute path="/task/:id" component={EmployeeTaskView} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}
const PrivateRoute = (props) => {
  const checkAuth = localStorage.getItem("authToken");
  const { component: Component, ...rest } = props;
  return checkAuth ? (
    <Route {...rest} render={(renderProps) => <Component {...renderProps} />} />
  ) : (
    <Redirect to="/login" />
  );
};

export default App;
