import Axios from "axios";
const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://kp-app.herokuapp.com"
      : "http://localhost:4000",
});
export default axios;
