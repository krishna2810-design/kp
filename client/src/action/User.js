import axios from "../config/Axios";
export const getUser = (data) => {
  return {
    type: "GET_USER",
    payload: data,
  };
};
export const startGetUser = () => {
  return (dispatch) => {
    axios
      .get("/users/list", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const users = response.data;
        dispatch(getUser(users));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
