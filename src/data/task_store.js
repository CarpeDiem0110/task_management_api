const { randomUUID } = require("crypto");

let tasks = [];

function getLocalDate() {
  const now = new Date();
  const offset = -now.getTimezoneOffset();
  const localTime = new Date(now.getTime() + offset * 60000);
  const sign = offset >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
  return localTime.toISOString().replace("Z", `${sign}${hours}:${minutes}`);
}

module.exports = {
  create(task) {
    const newTask = {
      id: randomUUID(),
      ...task,
      createdAt: getLocalDate(),
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
    tasks[index] = { ...tasks[index], ...data, updatedAt: getLocalDate() };
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
