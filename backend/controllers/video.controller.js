import Video from "../models/Video.js";

export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided" });
    }

    const videoUrl = req.file.path;
    // Simple way to get a thumbnail from Cloudinary video URL: change extension to .jpg
    const thumbnailUrl = videoUrl.replace(/\.[^/.]+$/, ".jpg");

    const video = await Video.create({
      userId: req.user?._id,
      title: req.body.title || "Untitled Video",
      videoUrl,
      thumbnailUrl,
    });

    res.status(201).json({
      success: true,
      video,
    });
  } catch (error) {
    console.error("Upload Error Details:", {
      message: error.message,
      stack: error.stack,
      error,
    });
    res.status(500).json({
      message: "Video upload failed",
      error: error.message,
    });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch videos",
      error: error.message,
    });
  }
};
