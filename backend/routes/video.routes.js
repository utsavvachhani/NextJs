import express from "express";
import upload from "../middleware/upload.middleware.js";
import { uploadVideo, getVideos } from "../controllers/video.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("video"), uploadVideo);

router.get("/", getVideos);

export default router;
