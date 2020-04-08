import axios from "../config/Axios";
export const getTasks = (data) => {
  return {
    type: "GET_TASKS",
    payload: data,
  };
};
export const addTask = (data) => {
  return {
    type: "ADD_TASK",
    payload: data,
  };
};
export const updateTask = (data) => {
  return {
    type: "UPDATE_TASK",
    payload: data,
  };
};
export const startGetTasks = () => {
  return (dispatch) => {
    axios
      .get("/tasks/list", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const tasks = response.data;
        dispatch(getTasks(tasks));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
