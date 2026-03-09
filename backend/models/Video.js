import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  title: String,

  videoUrl: String,
  thumbnailUrl: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Video", videoSchema);
