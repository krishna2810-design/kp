import axios from "../config/Axios";
export const setAccount = (data) => {
  return {
    type: "SET_ACCOUNT",
    payload: data,
  };
};
export const startGetAccount = () => {
  return (dispatch) => {
    axios
      .get("/users/account", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const account = response.data;
        dispatch(setAccount(account));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
