const pick = require("lodash/pick");
const User = require("../models/User");
module.exports.list = (req, res) => {
  User.find()
    .then((user) => {
      const users = user.filter((user) => user.role != "admin");
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
};
module.exports.register = (req, res) => {
  const body = pick(req.body, ["_id", "username", "email", "password"]);
  const user = new User(body);
  user
    .save()
    .then((user) => {
      res.send({ user: pick(user, ["_id", "username", "email"]) });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.login = (req, res) => {
  const body = req.body;
  User.findByCredential(body.email, body.password)
    .then((user) => {
      return user.generateToken();
    })
    .then((data) => {
      const { token, user } = data;
      res.setHeader("x-auth", token);
      res.send({ token, user });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.account = (req, res) => {
  const { user } = req;
  res.send(pick(user, ["_id", "username", "email", "role"]));
};

module.exports.logout = (req, res) => {
  const { user, token } = req;
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(() => {
      res.send({ notice: "Successfully loged out" });
    })
    .catch((err) => {
      res.send(err);
    });
};
