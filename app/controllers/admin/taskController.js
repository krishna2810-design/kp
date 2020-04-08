const Task = require("../../models/Task");
const pick = require("lodash/pick");
module.exports.list = (req, res) => {
  Task.ListTask(req.user)
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.send(err);
    });
};
module.exports.create = (req, res) => {
  const body = req.body;
  const task = new Task(body);
  task.admin = req.user._id;
  task
    .save()
    .then((task) => {
      res.send({ tasks: task });
    })
    .catch((err) => {
      res.send(err);
    });
};
module.exports.show = (req, res) => {
  const id = req.params.id;
  Task.showTask(req.user, id)
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.send(err);
    });
};
module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Task.findOneAndUpdate(
    {
      _id: id,
      "employees.employee": req.user._id,
    },
    body,
    {
      new: true,
      runValidators: true,
    }
  )
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.send(err);
    });
};
