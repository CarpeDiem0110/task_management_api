const express = require("express");
const morgan = require("morgan");
const taskRoutes = require("./routes/task_routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;