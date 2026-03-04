import Todo from "../models/Todo.js";

/* ================= CREATE ================= */
export const createTodo = async (req, res) => {
  console.log("Creating todo for user:", req.user._id);
  try {
    const todo = await Todo.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      todo,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create todo",
    });
  }
};

/* ================= GET ALL (Pagination + Filters) ================= */
export const getTodos = async (req, res) => {
  console.log("Fetching todos for user:", req.user._id);
  try {
    const {
      page = 1,
      status,
      search,
      priority,
      trash,
    } = req.query;

    const limit = 10;
    const skip = (page - 1) * limit;

    const filter = { userId: req.user._id };

    filter.isDeleted = trash === "true";

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const todos = await Todo.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Todo.countDocuments(filter);

    res.status(200).json({
      success: true,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total,
      todos,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch todos",
    });
  }
};

/* ================= GET SINGLE ================= */
export const getSingleTodo = (req, res) => {
  res.json({
    success: true,
    todo: req.todo,
  });
};

/* ================= UPDATE ================= */
export const updateTodo = async (req, res) => {
  console.log("Updating todo:", req.todo._id);
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.todo._id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      todo: updated,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

/* ================= SOFT DELETE ================= */
export const deleteTodo = async (req, res) => {
  console.log("Soft deleting todo:", req.todo._id);
  try {
    req.todo.isDeleted = true;
    await req.todo.save();

    res.json({
      success: true,
      message: "Moved to trash",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

/* ================= UPDATE STATUS ================= */
export const updateStatus = async (req, res) => {
  console.log("Updating status for todo:", req.todo._id);
  try {
    const { status } = req.body;

    req.todo.status = status;

    if (status === "completed") {
      req.todo.completedAt = new Date();
    }

    await req.todo.save();

    res.json({
      success: true,
      todo: req.todo,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Status update failed",
    });
  }
};

/* ================= DASHBOARD STATS ================= */
export const getTodoStats = async (req, res) => {
  console.log("Calculating stats for user:", req.user._id);
  try {
    const userId = req.user._id;

    const total = await Todo.countDocuments({
      userId,
      isDeleted: false,
    });

    const completed = await Todo.countDocuments({
      userId,
      status: "completed",
      isDeleted: false,
    });

    const pending = await Todo.countDocuments({
      userId,
      status: "pending",
      isDeleted: false,
    });

    const efficiency =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    res.json({
      success: true,
      total,
      completed,
      pending,
      efficiency,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Stats failed",
    });
  }
};