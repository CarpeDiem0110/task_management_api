const { randomUUID } = require("crypto");

let tasks = [];

module.exports = {
  create(task) {
    const newTask = {
      id: randomUUID(),
      ...task,
      createdAt: new Date(),
    };
    tasks.push(newTask);
    return newTask;
  },

  findAll() {
    return tasks;
  },

  findById(id) {
    return tasks.find((task) => task.id === id);
  },

  update(id, data) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...data, updatedAt: new Date() };
    return tasks[index];
  },

  remove(id) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;
    const [removed] = tasks.splice(index, 1);
    return removed;
  },

  clear() {
    tasks = [];
  },
};
