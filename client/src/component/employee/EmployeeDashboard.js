import React from "react";
import { connect } from "react-redux";
import TaskList from "./TaskList";
import EmployeeHeader from "./Header";
import { startGetTasks } from "../../action/Task";
function EmployeeDashboard(props) {
  console.log("employee - ", props);
  if (props.task.length == 0) {
    props.dispatch(startGetTasks());
  }
  return (
    <div>
      <EmployeeHeader {...props} />
      {props.task && (
        <div className="container">
          <div className="row">
            <div className="offset-2 col-md-8">
              <TaskList data={props.task} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    task: state.task,
  };
};
export default connect(mapStateToProps)(EmployeeDashboard);
