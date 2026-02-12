const taskStore = require("../data/task_store");

exports.createTask = ({ title, completed }) => {
  return taskStore.create({
    title,
    completed: completed ?? false,
  });
};

exports.getTasks = () => {
  return taskStore.findAll();
};

exports.getTaskById = (id) => {
  return taskStore.findById(id);
};

exports.updateTask = (id, { title, completed }) => {
  return taskStore.update(id, { title, completed });
};

exports.deleteTask = (id) => {
  return taskStore.remove(id);
};