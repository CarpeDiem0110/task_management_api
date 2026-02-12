const express = require("express");
const taskRoutes = require("./routes/task_routes");

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);


module.exports = app;