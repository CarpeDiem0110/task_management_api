const ALLOWED_FIELDS = ["title", "completed"];

exports.validateCreateTask = (req, res, next) => {
  const extraFields = Object.keys(req.body).filter(
    (key) => !ALLOWED_FIELDS.includes(key)
  );

  if (extraFields.length > 0) {
    return res.status(400).json({
      message: `Unknown field(s): ${extraFields.join(", ")}`,
    });
  }

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

exports.validateUpdateTask = (req, res, next) => {
  const extraFields = Object.keys(req.body).filter(
    (key) => !ALLOWED_FIELDS.includes(key)
  );

  if (extraFields.length > 0) {
    return res.status(400).json({
      message: `Unknown field(s): ${extraFields.join(", ")}`,
    });
  }

  const { title, completed } = req.body;

  if (title !== undefined && typeof title !== "string") {
    return res.status(400).json({
      message: "title must be a string",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      message: "completed must be boolean",
    });
  }

  next();
};