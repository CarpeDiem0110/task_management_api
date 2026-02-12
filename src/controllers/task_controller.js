const taskService = require("../services/task_service");

exports.createTask = (req, res) => {
  const task = taskService.createTask(req.body);
  res.status(201).json(task);
};

exports.getTasks = (req, res) => {
  const tasks = taskService.getTasks();
  res.status(200).json(tasks);
};

exports.getTaskById = (req, res) => {
  const task = taskService.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json(task);
};

exports.updateTask = (req, res) => {
  const task = taskService.updateTask(req.params.id, req.body);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json(task);
};

exports.deleteTask = (req, res) => {
  const task = taskService.deleteTask(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json({ message: "Task deleted successfully" });
};
