import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

function TaskList(props) {
  console.log("table - ", props);
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>View</th>
            <th>Total Employess</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((data, i) => {
            return (
              <tr key={data._id}>
                <td>{i + 1}</td>
                <td>{data.taskTitle}</td>
                <td>
                  <Link to={`/task/${data._id}`}>View</Link>
                </td>
                <td>{data.employees.length}</td>
                <td>{data.status ? "In Progess" : "Completed"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default TaskList;
