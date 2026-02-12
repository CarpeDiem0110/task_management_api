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

  clear() {
    tasks = [];
  },
};
