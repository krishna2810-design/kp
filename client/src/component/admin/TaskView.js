import React from "react";
import Header from "./Header";
import EmployeeHeader from "../employee/Header";
import { connect } from "react-redux";
import { findTask } from "../../selectors/Task";
import isEmpty from "lodash/isEmpty";
import axios from "../../config/Axios";
import { updateTask } from "../../action/Task";
import { startGetAccount } from "../../action/Account";
import { startGetTasks } from "../../action/Task";
function TaskView(props) {
  console.log("task - ", props);
  props.dispatch(startGetTasks());
  if (Object.keys(props.account).length == 0) {
    props.dispatch(startGetAccount());
  }
  const updateStatus = (id) => {
    axios
      .put(
        `/tasks/${id}`,
        { status: false },
        {
          headers: {
            "x-auth": localStorage.getItem("authToken"),
          },
        }
      )
      .then((response) => {
        props.dispatch(updateTask(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {props.account.role == "admin" ? (
        <Header {...props} />
      ) : (
        <EmployeeHeader {...props} />
      )}
      {!isEmpty(props.taskView) && (
        <div>
          <h1>Title : {props.taskView[0].taskTitle}</h1>
          <p>
            <b>Description : </b>
            {props.taskView[0].taskBody}
          </p>
          <h4>{props.taskView[0].status ? "In Progress" : "Completed"}</h4>
          <h3>Employess Working this project</h3>
          <ul>
            {props.taskView[0].employees.map((emp) => {
              return <li key={emp.employee._id}>{emp.employee.username}</li>;
            })}
          </ul>
          <p>{props.taskView[0].priority}</p>
          {props.account.role == "employee"
            ? props.taskView[0].status && (
                <button
                  onClick={() => {
                    updateStatus(props.taskView[0]._id);
                  }}
                >
                  Finish
                </button>
              )
            : ""}
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    taskView: findTask(state.task, id),
    account: state.account,
  };
};
export default connect(mapStateToProps)(TaskView);
