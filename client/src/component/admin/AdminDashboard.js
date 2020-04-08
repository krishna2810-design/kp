import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import "../../App.css";
import { startGetTasks } from "../../action/Task";
import { startGetUser } from "../../action/User";
import { Spinner } from "reactstrap";
function AdminDashboard(props) {
  props.dispatch(startGetUser());
  if (props.task.length == 0) {
    props.dispatch(startGetTasks());
  }

  return (
    <div>
      <Header {...props} />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="admin_cards">
              <h3>Total Employees</h3>
              <h5>
                {!isEmpty(props.user) ? (
                  props.user.length
                ) : (
                  <Spinner color="success" />
                )}
              </h5>
            </div>
          </div>
          <div className="col-md-3">
            <div className="admin_cards">
              <h3>Total Tasks</h3>
              <h5>
                {!isEmpty(props.task) ? (
                  props.task.length
                ) : (
                  <Spinner color="success" />
                )}
              </h5>
            </div>
          </div>
          <div className="col-md-3">
            <div className="admin_cards">
              <h3>Active Tasks</h3>
              <h5>
                {!isEmpty(props.task) ? (
                  props.task.filter((task) => task.status == true).length
                ) : (
                  <Spinner color="success" />
                )}
              </h5>
            </div>
          </div>
          <div className="col-md-3">
            <div className="admin_cards">
              <h3>Completed Tasks</h3>
              <h5>
                {!isEmpty(props.task) ? (
                  props.task.filter((task) => task.status == false).length
                ) : (
                  <Spinner color="success" />
                )}
              </h5>
            </div>
          </div>
        </div>
        {/* <div className="col-md-6"> */}
        <div>
          {!isEmpty(props.user) && (
            <div>
              {/* <h1>Total Employees - {props.user.length}</h1> */}
              {props.user.map((user) => {
                return <h3 key={user._id}>{user.username}</h3>;
              })}
            </div>
          )}
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    task: state.task,
  };
};
export default connect(mapStateToProps)(AdminDashboard);
