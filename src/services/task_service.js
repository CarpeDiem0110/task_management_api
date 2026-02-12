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