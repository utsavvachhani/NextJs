import Todo from "../models/Todo.js";

export const checkTodoOwnership = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    req.todo = todo;
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ownership check failed",
    });
  }
};