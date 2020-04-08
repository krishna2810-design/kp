import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "../../config/Axios";
import { addTask } from "../../action/Task";
import Header from "./Header";
class TaskCreate extends React.Component {
  constructor(props) {
    super();
    this.state = {
      taskTitle: "",
      taskBody: "",
      employees: "",
      priorityArr: ["High", "Medium", "Low"],
      priority: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { taskTitle, taskBody, employees, priority } = this.state;
    const formData = {
      taskTitle,
      taskBody,
      employees:
        employees && employees.map((empl) => ({ employee: empl.value })),
      priority,
    };
    axios
      .post("/tasks/create", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const { errors, tasks } = response.data;
        if (tasks) {
          this.props.dispatch(addTask(tasks));
          this.props.history.push("/task");
        } else if (errors) {
          alert("fill all the details");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleSelect = (employees) => {
    this.setState({ employees });
  };

  render() {
    return (
      <div>
        <Header {...this.props} />
        <h1 className="text-center">Create Task</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="form-background">
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="taskTitle">Task Title</Label>
                    <Input
                      type="text"
                      name="taskTitle"
                      id="taskTitle"
                      value={this.state.taskTitle}
                      placeholder="Task Title"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="taskBody">Task Description</Label>
                    <Input
                      type="textarea"
                      name="taskBody"
                      id="taskBody"
                      value={this.state.taskBody}
                      placeholder="Task Description"
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="employees">Assign Task</Label>
                    <Select
                      // options={this.props.employees1.map(employee => ({ value: employee._id, label: employee.name }))}
                      options={this.props.user.map((user) => ({
                        value: user._id,
                        label: user.username,
                      }))}
                      onChange={this.handleSelect}
                      isMulti
                      closeMenuOnSelect={false}
                      placeholder="Choose Categories"
                    />
                  </FormGroup>
                  <FormGroup check>
                    <Label htmlFor="employees">Task Priority</Label>
                    {this.state.priorityArr.map((val, i) => {
                      return (
                        <div key={i}>
                          <Input
                            type="radio"
                            name="priority"
                            value={val}
                            onChange={this.handleChange}
                            checked={this.state.priority == val}
                          />
                          {val}
                        </div>
                      );
                    })}
                  </FormGroup>
                  <FormGroup>
                    <Input type="submit" value="Submit" />
                  </FormGroup>
                </Form>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(TaskCreate);
