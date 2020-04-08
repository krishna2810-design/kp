const mongoose = require("mongoose");
const db =
  process.env.NODE_ENV === "production"
    ? "mongodb://kp:krishna28@ds221416.mlab.com:21416/heroku_92hl6fnn"
    : "mongodb://localhost:27017/task-management";
const setUpDb = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = setUpDb;
