exports.validateCreateTask = (req, res, next) => {
  const { title, completed } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      message: "title is required and must be a string",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      message: "completed must be boolean",
    });
  }

  next();
};