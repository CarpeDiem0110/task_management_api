const taskService = require("../services/task_service");

exports.createTask = (req, res) => {
  const task = taskService.createTask(req.body);
  res.status(201).json(task);
};

exports.getTasks = (req, res) => {
  const tasks = taskService.getTasks();
  res.status(200).json(tasks);
};
