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
    const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {videos.map((video) => (
                                    <div
                                        key={video._id}
                                        onMouseEnter={() => setHoveredVideo(video._id)}
                                        onMouseLeave={() => setHoveredVideo(null)}
                                        className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--brand-red)] transition-all shadow-sm hover:shadow-2xl hover:-translate-y-1"
                                    >
                                        <div
                                            className="relative aspect-video bg-black cursor-pointer"
                                            onClick={() => setSelectedVideo(video)}
                                        >
                                            <video
                                                src={video.videoUrl}
                                                className="w-full h-full object-cover"
                                                poster={video.thumbnailUrl || ""}
                                                muted
                                                loop
                                                playsInline
                                                ref={(el) => {
                                                    if (el) {
                                                        if (hoveredVideo === video._id) {
                                                            el.play().catch(() => { });
                                                        } else {
                                                            el.pause();
                                                            el.currentTime = 0;
                                                        }
                                                    }
                                                }}
                                            />
                                            {/* Play Overlay */}
                                            <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${hoveredVideo === video._id ? 'opacity-0' : 'opacity-100'}`}>
                                                <div className="w-12 h-12 bg-[var(--brand-red)] rounded-full flex items-center justify-center text-white shadow-xl transform transition-transform group-hover:scale-110">
                                                    <PlayCircleOutlineIcon fontSize="large" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white">
                                                LIVE PREVIEW
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-4">
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--brand-red)] to-red-700 flex flex-shrink-0 items-center justify-center text-white font-bold shadow-lg">
                                                    {video.userId?.name?.[0] || 'U'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-base leading-tight line-clamp-2 group-hover:text-[var(--brand-red)] transition-colors">
                                                        {video.title}
                                                    </h3>
                                                    <div className="mt-1 flex flex-col text-xs text-[var(--text-muted)]">
                                                        <span className="font-medium hover:text-[var(--text-primary)] cursor-pointer">
                                                            {video.userId?.name || 'Coach Global'}
                                                        </span>
                                                        <span>{videos.length * 123} views • {new Date(video.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedVideo(video)}
                                                className="w-full py-2.5 bg-white/5 border border-[var(--border-color)] rounded-xl text-sm font-bold hover:bg-[var(--brand-red)] hover:text-white hover:border-[var(--brand-red)] transition-all"
                                            >
                                                Watch in Theater
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Premium Theater Player (YouTube Style) */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex flex-col md:flex-row animate-in fade-in duration-500 overflow-y-auto"
                >
                    {/* Main Content Areas */}
                    <div className="flex-1 flex flex-col h-full min-h-screen lg:min-h-0">
                        {/* Player Header */}
                        <div className="p-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedVideo(null)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                >
                                    ✕
                                </button>
                                <h2 className="text-white font-bold hidden sm:block">Playing: {selectedVideo.title}</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[var(--brand-red)] text-xs font-bold bg-[var(--brand-red)]/10 px-3 py-1 rounded-full border border-[var(--brand-red)]/20 animate-pulse">
                                    THEATER MODE
                                </span>
                            </div>
                        </div>

                        {/* Large Video Player */}
                        <div className="relative w-full bg-black group flex-grow flex items-center">
                            <video
                                src={selectedVideo.videoUrl}
                                controls
                                autoPlay
                                className="w-full max-h-full aspect-video shadow-2xl"
                            />
                        </div>

                        {/* Video Info Section */}
                        <div className="bg-[#0f0f0f] border-t border-white/5 p-6 space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                                    {selectedVideo.title}
                                </h1>
                                <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-red)] to-red-700 flex items-center justify-center text-white font-bold text-lg shadow-xl ring-2 ring-white/10">
                                            {selectedVideo.userId?.name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-lg">{selectedVideo.userId?.name || 'Gym Master'}</h3>
                                            <p className="text-[var(--text-muted)] text-sm">2.4M subscribers</p>
                                        </div>
                                        <button className="ml-4 px-6 py-2.5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                                            Subscribe
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-white/10 rounded-full overflow-hidden border border-white/5">
                                            <button className="px-5 py-2 hover:bg-white/10 flex items-center gap-2 border-r border-white/10">
                                                <span>👍</span> 12K
                                            </button>
                                            <button className="px-5 py-2 hover:bg-white/10">
                                                <span>👎</span>
                                            </button>
                                        </div>
                                        <button className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-all">
                                            Share
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-4 text-sm text-gray-300 leading-relaxed">
                                    <div className="font-bold mb-1">123,456 views • {new Date(selectedVideo.createdAt).toLocaleDateString()}</div>
                                    <p>This is a professionally recorded workout video uploaded to the Fitness Platform.
                                        Make sure to follow the techniques correctly for the best results! #Fitness #Workout #GymProgress</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Suggestions (YouTube Style) */}
                    <div className="w-full md:w-80 lg:w-96 bg-[#0f0f0f] border-l border-white/5 p-4 space-y-4 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-bold">Related Videos</h3>
                            <button className="text-xs text-[var(--brand-red)] font-bold">Autoplay ON</button>
                        </div>
                        {videos.filter(v => v._id !== selectedVideo._id).concat(videos).slice(0, 10).map((v, i) => (
                            <div
                                key={`${v._id}-${i}`}
                                className="flex gap-3 cursor-pointer group hover:bg-white/5 p-2 rounded-xl transition-all"
                                onClick={() => {
                                    setSelectedVideo(v);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                            >
                                <div className="relative w-32 h-20 flex-shrink-0 bg-black rounded-lg overflow-hidden border border-white/5">
                                    <video src={v.videoUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                                    <div className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[8px] text-white">4:20</div>
                                </div>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <h4 className="text-white text-sm font-bold line-clamp-2 leading-tight group-hover:text-[var(--brand-red)] transition-colors">
                                        {v.title}
                                    </h4>
                                    <p className="text-[var(--text-muted)] text-[10px] mt-1">{v.userId?.name || 'Coach'} • 1.2M views</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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
