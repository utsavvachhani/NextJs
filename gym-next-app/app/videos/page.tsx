"use strict";
"use client";

import React, { useState, useEffect } from "react";
import { uploadVideoAPI, getAllVideosAPI } from "../../api/videoApi";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";

export default function VideoManagementPage() {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [uploading, setUploading] = useState(false);
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const data = await getAllVideosAPI();
            setVideos(data.videos || []);
        } catch (error) {
            console.error("Failed to fetch videos", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("video", file);
        formData.append("title", title || "Workout Video");

        try {
            await uploadVideoAPI(formData);
            setMessage({ type: "success", text: "Video uploaded successfully! 🚀" });
            setFile(null);
            setTitle("");
            // Refresh list
            fetchVideos();
        } catch (error: any) {
            setMessage({ type: "error", text: error.response?.data?.message || "Upload failed. Please try again." });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Video <span className="text-[var(--brand-red)]">Management</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                        Upload and manage your workout videos. Share your progress with the community.
                    </p>
                </div>

                {/* Upload Container */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 shadow-[var(--shadow-md)] sticky top-8">
                        <div className="flex items-center gap-3 mb-6">
                            <CloudUploadIcon className="text-[var(--brand-red)]" />
                            <h2 className="text-xl font-bold">New Upload</h2>
                        </div>

                        <form onSubmit={handleUpload} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--text-secondary)] ml-1">Video Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter a descriptive title..."
                                    className="w-full bg-[var(--bg-page)] border border-[var(--border-color)] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)] transition-all"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--text-secondary)] ml-1">Select Video</label>
                                <div
                                    className={`
                    relative group border-2 border-dashed border-[var(--border-color)] rounded-2xl p-8 text-center cursor-pointer transition-all
                    hover:border-[var(--brand-red)] hover:bg-[var(--brand-red)]/5
                    ${file ? 'border-[var(--brand-red)] bg-[var(--brand-red)]/5' : ''}
                  `}
                                >
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    />
                                    <div className="space-y-2">
                                        <div className="w-12 h-12 bg-[var(--bg-page)] rounded-full flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                                            <CloudUploadIcon className={`${file ? 'text-[var(--brand-red)]' : 'text-[var(--text-muted)]'}`} />
                                        </div>
                                        <div className="text-sm font-medium">
                                            {file ? file.name : "Drag & drop or click to browse"}
                                        </div>
                                        <div className="text-xs text-[var(--text-muted)]">MP4, WebM up to 50MB</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={!file || uploading}
                                className={`
                  w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2
                  ${!file || uploading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[var(--brand-red)] hover:bg-[var(--brand-red-hover)] shadow-lg hover:shadow-[var(--shadow-hover)] hover:-translate-y-1'}
                `}
                            >
                                {uploading ? (
                                    <>
                                        <CircularProgress size={20} color="inherit" />
                                        <span>Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Upload Video</span>
                                    </>
                                )}
                            </button>

                            {message && (
                                <div className={`p-4 rounded-xl text-sm font-medium border ${message.type === 'success'
                                        ? 'bg-green-500/10 border-green-500/20 text-green-500'
                                        : 'bg-red-500/10 border-red-500/20 text-red-500'
                                    }`}>
                                    {message.text}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Videos Grid Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <VideoLibraryIcon className="text-[var(--brand-red)]" />
                                <h2 className="text-2xl font-bold">Your Gallery</h2>
                            </div>
                            <span className="bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-1.5 rounded-full text-sm font-medium">
                                {videos.length} Videos
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)]">
                                <CircularProgress color="inherit" sx={{ opacity: 0.2 }} />
                                <p className="mt-4 text-[var(--text-muted)]">Loading videos...</p>
                            </div>
                        ) : videos.length === 0 ? (
                            <div className="text-center py-24 bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] space-y-4">
                                <div className="w-20 h-20 bg-[var(--bg-page)] rounded-full flex items-center justify-center mx-auto opacity-50">
                                    <VideoLibraryIcon fontSize="large" className="text-[var(--text-muted)]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">No videos yet</h3>
                                    <p className="text-[var(--text-secondary)]">Your uploaded workouts will appear here.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {videos.map((video) => (
                                    <div
                                        key={video._id}
                                        className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--brand-red)] transition-all shadow-sm hover:shadow-xl hover:-translate-y-1"
                                    >
                                        <div className="relative aspect-video bg-black/50 group-hover:bg-black/40 transition-colors">
                                            <video
                                                src={video.videoUrl}
                                                className="w-full h-full object-cover"
                                                poster={video.thumbnailUrl || ""}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-14 h-14 bg-[var(--brand-red)] rounded-full flex items-center justify-center text-white shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                                                    <PlayCircleOutlineIcon fontSize="large" />
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                                                NEW
                                            </div>
                                        </div>
                                        <div className="p-5 space-y-3">
                                            <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-[var(--brand-red)] transition-colors">
                                                {video.title}
                                            </h3>
                                            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-[var(--brand-red)]/10 flex items-center justify-center text-[var(--brand-red)] font-bold">
                                                        {video.userId?.name?.[0] || 'U'}
                                                    </div>
                                                    <span>{video.userId?.name || 'User'}</span>
                                                </div>
                                                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <a
                                                href={video.videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full text-center py-2.5 bg-[var(--bg-page)] border border-[var(--border-color)] rounded-xl text-sm font-bold hover:bg-[var(--brand-red)] hover:text-white hover:border-[var(--brand-red)] transition-all"
                                            >
                                                Watch Video
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
}
