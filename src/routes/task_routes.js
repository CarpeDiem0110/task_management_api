const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task_controller");
const { validateCreateTask, validateUpdateTask } = require("../validators/task_validator");

router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", validateCreateTask, taskController.createTask);
router.put("/:id", validateUpdateTask, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;