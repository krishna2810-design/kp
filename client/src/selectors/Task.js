export const findTask = (tasks, id) => {
  return tasks.filter((task) => task._id == id);
};
