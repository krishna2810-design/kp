import React from "react";
import { connect } from "react-redux";
import TaskList from "./TaskList";
import Header from "./Header";
import { Link } from "react-router-dom";
function Task(props) {
  console.log("task - ", props);
  return (
    <div>
      <Header {...props} />
      <div className="container">
        <div className="row">
          <div className="offset-2 col-md-8">
            <TaskList data={props.task} />
            <Link to="/task/create">Create Task</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    task: state.task,
  };
};
export default connect(mapStateToProps)(Task);
