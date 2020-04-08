import React from "react";
import EmployeeHeader from "./Header";
import { connect } from "react-redux";
import { findTask } from "../../selectors/Task";
import { updateTask } from "../../action/Task";
import isEmpty from "lodash/isEmpty";
import axios from "../../config/Axios";
function EmployeeTaskView(props) {
  console.log("task - ", props);
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
      <EmployeeHeader />
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
          {props.taskView[0].status && (
            <button
              onClick={() => {
                updateStatus(props.taskView[0]._id);
              }}
            >
              Finish
            </button>
          )}
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    taskView: findTask(state.task, id),
    account : state.account
  };
};
export default connect(mapStateToProps)(EmployeeTaskView);
