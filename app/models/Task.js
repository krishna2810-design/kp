const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  employees: [
    {
      employee: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  taskTitle: {
    type: String,
    required: true,
  },
  taskBody: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
taskSchema.statics.ListTask = function (user) {
  const Task = this;
  if (user.role == "admin") {
    return Task.find().populate("employees.employee");
  } else {
    return Task.find({ "employees.employee": user._id }).populate(
      "employees.employee"
    );
  }
};
taskSchema.statics.showTask = function (user, id) {
  const Task = this;
  if (user.role == "admin") {
    return Task.findById(id).populate("employees.employee");
  } else {
    return Task.findOne({
      _id: id,
      "employees.employee": user._id,
    })
      .populate("employees.employee")
      .populate("admin");
  }
};
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
