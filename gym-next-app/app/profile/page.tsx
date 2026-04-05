"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    changePassword, 
    fetchUserProfile, 
    updateUserProfile 
} from "@/action/authSlice";
import { AppDispatch, RootState } from "@/store";
import {
    Person,
    Email,
    Phone,
    Lock,
    Security,
    Visibility,
    VisibilityOff,
    Edit,
    LocationOn,
    Info,
    CalendarToday,
    PhotoCamera,
    Save,
    Close
} from "@mui/icons-material";
import Image from "next/image";

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, profile, loading } = useSelector((state: RootState) => state.auth);

    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        bio: "",
        address: "",
        dateOfBirth: "",
        mobile: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [pwData, setPwData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPw, setShowPw] = useState({
        old: false,
        new: false,
        confirm: false,
    });
    const [pwError, setPwError] = useState("");

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            setProfileData({
                bio: profile.bio || "",
                address: profile.address || "",
                dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split('T')[0] : "",
                mobile: profile.userId?.mobile || user?.mobile || "",
            });
            setPreviewUrl(profile.photo || null);
        }
    }, [profile, user]);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bio", profileData.bio);
        formData.append("address", profileData.address);
        formData.append("dateOfBirth", profileData.dateOfBirth);
        formData.append("mobile", profileData.mobile);
        if (selectedFile) {
            formData.append("photo", selectedFile);
        }

        const result = await dispatch(updateUserProfile(formData));
        if (updateUserProfile.fulfilled.match(result)) {
            setIsEditing(false);
        }
    };

    const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwData({ ...pwData, [e.target.name]: e.target.value });
    };

    const handleSubmitPw = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pwData.newPassword !== pwData.confirmPassword) {
            setPwError("New passwords do not match.");
            return;
        }
        if (pwData.newPassword.length < 8) {
            setPwError("New password must be at least 8 characters.");
            return;
        }
        setPwError("");

        const result = await dispatch(changePassword(pwData));
        if (changePassword.fulfilled.match(result)) {
            setPwData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-(--bg-page)">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-(--bg-card) border border-(--border-color) rounded-full flex items-center justify-center mx-auto">
                        <Person className="text-(--text-secondary) text-3xl" />
                    </div>
                    <p className="text-(--text-secondary) text-lg font-medium">Please sign in to view your profile.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 bg-(--bg-page) transition-colors duration-300">
            <div className="max-w-5xl mx-auto space-y-10">
                
                {/* Profile Header Card */}
                <div className="relative overflow-hidden bg-(--bg-card) border border-(--border-color) rounded-3xl shadow-xl">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-(--brand-red) to-orange-500 opacity-20"></div>
                    
                    <div className="relative pt-16 pb-8 px-8 flex flex-col md:flex-row items-center md:items-end gap-8">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <div className="h-32 w-32 rounded-3xl bg-(--bg-page) border-4 border-(--bg-card) overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
                                {previewUrl ? (
                                    <img 
                                        src={previewUrl} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-(--brand-red) text-white text-5xl font-bold">
                                        {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                                    </div>
                                )}
                            </div>
                            
                            {isEditing && (
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-2 -right-2 p-2.5 bg-(--brand-red) text-white rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all"
                                >
                                    <PhotoCamera sx={{ fontSize: 20 }} />
                                </button>
                            )}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept="image/*"
                            />
                        </div>

                        {/* Name & Basic Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-extrabold text-(--text-primary) tracking-tight">
                                {user.firstName} {user.lastName}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                                <span className="flex items-center gap-1.5 text-(--text-secondary) bg-(--bg-page) px-3 py-1.5 rounded-full text-sm font-medium border border-(--border-color)">
                                    <Email sx={{ fontSize: 16 }} className="text-(--brand-red)" /> {user.email}
                                </span>
                                {user.mobile && (
                                    <span className="flex items-center gap-1.5 text-(--text-secondary) bg-(--bg-page) px-3 py-1.5 rounded-full text-sm font-medium border border-(--border-color)">
                                        <Phone sx={{ fontSize: 16 }} className="text-(--brand-red)" /> {user.mobile}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Edit Toggle */}
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                                isEditing 
                                ? "bg-(--bg-page) text-(--text-primary) border border-(--border-color) hover:bg-(--border-color)" 
                                : "bg-(--brand-red) text-white shadow-lg hover:shadow-(--brand-red)/30 hover:-translate-y-0.5"
                            }`}
                        >
                            {isEditing ? <><Close /> Cancel</> : <><Edit /> Edit Profile</>}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Details Selection */}
                        <div className="bg-(--bg-card) border border-(--border-color) rounded-3xl p-8 shadow-sm space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-(--text-primary) flex items-center gap-3">
                                    <div className="p-2 bg-(--brand-red)/10 rounded-xl">
                                        <Person className="text-(--brand-red)" /> 
                                    </div>
                                    Personal Information
                                </h2>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-(--text-secondary) ml-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" sx={{ fontSize: 20 }} />
                                            <input
                                                type="text"
                                                name="mobile"
                                                placeholder="Mobile Number"
                                                value={profileData.mobile}
                                                onChange={handleProfileChange}
                                                disabled={!isEditing || loading}
                                                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-(--border-color) bg-(--bg-page) text-(--text-primary) outline-none focus:ring-2 focus:ring-(--brand-red)/20 focus:border-(--brand-red) transition-all disabled:opacity-60"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-(--text-secondary) ml-1">Date of Birth</label>
                                        <div className="relative">
                                            <CalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" sx={{ fontSize: 20 }} />
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={profileData.dateOfBirth}
                                                onChange={handleProfileChange}
                                                disabled={!isEditing || loading}
                                                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-(--border-color) bg-(--bg-page) text-(--text-primary) outline-none focus:ring-2 focus:ring-(--brand-red)/20 focus:border-(--brand-red) transition-all disabled:opacity-60"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-semibold text-(--text-secondary) ml-1">Address</label>
                                        <div className="relative">
                                            <LocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" sx={{ fontSize: 20 }} />
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="Where do you live?"
                                                value={profileData.address}
                                                onChange={handleProfileChange}
                                                disabled={!isEditing || loading}
                                                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-(--border-color) bg-(--bg-page) text-(--text-primary) outline-none focus:ring-2 focus:ring-(--brand-red)/20 focus:border-(--brand-red) transition-all disabled:opacity-60"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-(--text-secondary) ml-1">Bio</label>
                                    <div className="relative">
                                        <Info className="absolute left-4 top-4 text-(--text-secondary) pointer-events-none" sx={{ fontSize: 20 }} />
                                        <textarea
                                            name="bio"
                                            placeholder="Tell us about yourself..."
                                            value={profileData.bio}
                                            onChange={handleProfileChange}
                                            disabled={!isEditing || loading}
                                            rows={4}
                                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-(--border-color) bg-(--bg-page) text-(--text-primary) outline-none focus:ring-2 focus:ring-(--brand-red)/20 focus:border-(--brand-red) transition-all disabled:opacity-60 resize-none"
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full md:w-auto px-8 py-4 bg-(--brand-red) text-white rounded-2xl font-bold shadow-lg shadow-(--brand-red)/20 hover:shadow-(--brand-red)/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        {loading ? "Saving..." : <><Save /> Save Changes</>}
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        {/* Change Password Card */}
                        <div className="bg-(--bg-card) border border-(--border-color) rounded-3xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-(--text-primary) mb-6 flex items-center gap-2">
                                <Lock className="text-(--brand-red)" /> Security
                            </h2>

                            {pwError && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{pwError}</div>}

                            <form onSubmit={handleSubmitPw} className="space-y-4">
                                <PasswordField 
                                    name="oldPassword" 
                                    placeholder="Current Password" 
                                    value={pwData.oldPassword} 
                                    onChange={handlePwChange}
                                    show={showPw.old}
                                    toggleShow={() => setShowPw({...showPw, old: !showPw.old})}
                                    loading={loading}
                                />
                                <PasswordField 
                                    name="newPassword" 
                                    placeholder="New Password" 
                                    value={pwData.newPassword} 
                                    onChange={handlePwChange}
                                    show={showPw.new}
                                    toggleShow={() => setShowPw({...showPw, new: !showPw.new})}
                                    loading={loading}
                                />
                                <PasswordField 
                                    name="confirmPassword" 
                                    placeholder="Confirm New Password" 
                                    value={pwData.confirmPassword} 
                                    onChange={handlePwChange}
                                    show={showPw.confirm}
                                    toggleShow={() => setShowPw({...showPw, confirm: !showPw.confirm})}
                                    loading={loading}
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-(--text-primary) text-(--bg-page) rounded-2xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
                                >
                                    {loading ? "Updating..." : "Update Password"}
                                </button>
                            </form>
                        </div>

                        {/* Account Stats or Info */}
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl">
                            <h3 className="text-xl font-bold mb-4">Gym Member</h3>
                            <p className="opacity-80 text-sm leading-relaxed">
                                You have been a member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'recently'}. 
                                Keep pushing your limits!
                            </p>
                            <div className="mt-6 flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                    <Security sx={{ fontSize: 24 }} />
                                </div>
                                <div>
                                    <p className="text-xs opacity-70 uppercase font-bold tracking-wider">Status</p>
                                    <p className="font-semibold text-lg">Verified Account</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface PasswordFieldProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    show: boolean;
    toggleShow: () => void;
    loading: boolean;
}

const PasswordField = ({ name, placeholder, value, onChange, show, toggleShow, loading }: PasswordFieldProps) => (
    <div className="relative group">
        <input
            type={show ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={loading}
            className="w-full rounded-2xl border border-(--border-color) px-4 py-3.5 text-(--text-primary) bg-(--bg-page) outline-none focus:ring-2 focus:ring-(--brand-red)/20 focus:border-(--brand-red) transition-all disabled:opacity-50"
        />
        <button
            type="button"
            onClick={toggleShow}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-secondary) hover:text-(--text-primary) transition-colors"
        >
            {show ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
        </button>
    </div>
);

export default ProfilePage;
