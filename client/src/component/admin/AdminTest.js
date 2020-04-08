import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import "../../App.css";
import { startGetTasks } from "../../action/Task";
import { startGetUser } from "../../action/User";
import { Spinner } from "reactstrap";
class AdminTest extends React.Component {
  constructor(props) {
    super();
    this.state = {
      total: [],
      active: [],
      completed: [],
    };
  }
  componentDidMount() {
    this.props.dispatch(startGetUser());
    // this.props.dispatch(startGetTasks());
    if (this.props.task.length == 0) {
      this.props.dispatch(startGetTasks());
    }
    console.log("task props - ", this.props.task);
    // this.setState({
    //   total: this.props.task && this.props.task,
    //   active:
    //     this.props.task &&
    //     this.props.task.filter((task) => task.status == true),
    //   completed:
    //     this.props.task &&
    //     this.props.task.filter((task) => task.status == false),
    // });
  }
  render() {
    // console.log("state - ", this.state);
    return (
      <div>
        <Header {...this.props} />
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="admin_cards">
                <h3>Total Employees</h3>
                <h5>
                  {" "}
                  {!isEmpty(this.props.user) ? (
                    this.props.user.length
                  ) : (
                    <Spinner color="success" />
                  )}
                </h5>
              </div>
            </div>
            <div className="col-md-3">
              <div className="admin_cards">
                <h3>Total Employees</h3>
                <h5>
                  {" "}
                  {!isEmpty(this.state.task) ? (
                    this.state.task.length
                  ) : (
                    <Spinner color="success" />
                  )}
                </h5>
              </div>
            </div>
            <div className="col-md-6">
              {!isEmpty(this.props.user) && (
                <div>
                  {/* <h1>Total Employees - {this.props.user.length}</h1> */}
                  {this.props.user.map((user) => {
                    return <h3 key={user._id}>{user.username}</h3>;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    task: state.task,
  };
};
export default connect(mapStateToProps)(AdminTest);
