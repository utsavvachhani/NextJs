import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    description: {
      type: String,
      trim: true,
    },

    workoutType: {
      type: String,
      enum: ["strength", "cardio", "yoga", "mobility", "other"],
      default: "other",
    },

    duration: Number,
    caloriesBurned: Number,

    exerciseList: [
      {
        name: String,
        sets: Number,
        reps: Number,
        weight: Number,
      },
    ],

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["pending", "completed", "skipped"],
      default: "pending",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    scheduledFor: Date,
    completedAt: Date,
  },
  { timestamps: true }
);

todoSchema.index({ userId: 1, createdAt: -1 });

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;