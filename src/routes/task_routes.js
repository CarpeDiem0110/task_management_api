const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task_controller");
const { validateCreateTask } = require("../validators/task_validator");


router.get("/", taskController.getTasks);
router.post("/", validateCreateTask, taskController.createTask);


module.exports = router;