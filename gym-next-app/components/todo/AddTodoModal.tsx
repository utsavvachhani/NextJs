"use client"

import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useDispatch } from 'react-redux'
import { createTodo } from '@/action/todoSlice'
import { AppDispatch } from '@/store'

interface AddTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddTodoModal({ isOpen, onClose }: AddTodoModalProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        workoutType: 'strength',
        priority: 'medium',
        duration: '',
        caloriesBurned: '',
        scheduledFor: '',
        exerciseList: [{ name: '', sets: 0, reps: 0, weight: 0 }]
    });

    if (!isOpen) return null;

    const handleAddExercise = () => {
        setFormData({
            ...formData,
            exerciseList: [...formData.exerciseList, { name: '', sets: 0, reps: 0, weight: 0 }]
        });
    };

    const handleExerciseChange = (index: number, field: string, value: any) => {
        const updatedList = [...formData.exerciseList];
        updatedList[index] = { ...updatedList[index], [field]: value };
        setFormData({ ...formData, exerciseList: updatedList });
    };

    const handleRemoveExercise = (index: number) => {
        const updatedList = formData.exerciseList.filter((_, i) => i !== index);
        setFormData({ ...formData, exerciseList: updatedList });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title.length < 3) return;

        // Clean up data before sending
        const dataToSend = {
            ...formData,
            duration: formData.duration ? Number(formData.duration) : undefined,
            caloriesBurned: formData.caloriesBurned ? Number(formData.caloriesBurned) : undefined,
            scheduledFor: formData.scheduledFor ? new Date(formData.scheduledFor) : undefined,
            exerciseList: formData.exerciseList.filter(ex => ex.name.trim() !== '')
        };

        dispatch(createTodo(dataToSend));
        onClose();
        // Reset form
        setFormData({
            title: '',
            description: '',
            workoutType: 'strength',
            priority: 'medium',
            duration: '',
            caloriesBurned: '',
            scheduledFor: '',
            exerciseList: [{ name: '', sets: 0, reps: 0, weight: 0 }]
        });
    };

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-hidden">
            <div className="bg-[var(--bg-card)] w-full max-w-2xl max-h-[90vh] rounded-[40px] border border-[var(--border-color)] shadow-2xl overflow-y-auto animate-in fade-in zoom-in duration-300">
                <div className="p-10">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-[var(--text-primary)]">Log <span className="text-[var(--brand-red)]">Workout</span></h2>
                        </div>
                        <button onClick={onClose} className="p-3 rounded-full hover:bg-[var(--bg-page)] border-none bg-transparent cursor-pointer transition-colors">
                            <CloseIcon />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Title & Workout Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Workout Title *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Heavy Leg Day"
                                    className="bg-[var(--bg-page)] border border-[var(--border-color)] text-[var(--text-primary)] px-5 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]/20 focus:border-[var(--brand-red)] transition-all font-semibold"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    minLength={3}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Type</label>
                                <select
                                    className="bg-[var(--bg-page)] border border-[var(--border-color)] text-[var(--text-primary)] px-5 py-3.5 rounded-2xl focus:outline-none focus:border-[var(--brand-red)] transition-all font-semibold"
                                    value={formData.workoutType}
                                    onChange={(e) => setFormData({ ...formData, workoutType: e.target.value })}
                                >
                                    <option value="strength">Strength</option>
                                    <option value="cardio">Cardio</option>
                                    <option value="yoga">Yoga</option>
                                    <option value="mobility">Mobility</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Description / Notes</label>
                            <textarea
                                placeholder="What's the focus for today?"
                                className="bg-[var(--bg-page)] border border-[var(--border-color)] text-[var(--text-primary)] px-5 py-3.5 rounded-2xl focus:outline-none focus:border-[var(--brand-red)] transition-all font-medium min-h-[100px] resize-none"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        {/* Duration, Calories, Date */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Duration (min)</label>
                                <input
                                    type="number"
                                    placeholder="45"
                                    className="bg-[var(--bg-page)] border border-[var(--border-color)] text-[var(--text-primary)] px-5 py-3.5 rounded-2xl focus:outline-none"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Calories</label>
                                <input
                                    type="number"
                                    placeholder="300"
                                    className="bg-[var(--bg-page)] border border-[var(--border-color)] text-[var(--text-primary)] px-5 py-3.5 rounded-2xl focus:outline-none"
                                    value={formData.caloriesBurned}
                                    onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">Schedule</label>
                                <input
                                    type="datetime-local"
                                    className="bg-[var(--bg-page)] border border-[var(--border-color)] text-[var(--text-primary)] px-5 py-3.5 rounded-2xl focus:outline-none"
                                    value={formData.scheduledFor}
                                    onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Exercise List */}
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-black text-[var(--text-primary)]">Exercises</label>
                                <button type="button" onClick={handleAddExercise} className="text-[var(--brand-red)] text-xs font-bold border-none bg-transparent cursor-pointer flex items-center gap-1">
                                    <AddIcon sx={{ fontSize: 16 }} /> Add Exercise
                                </button>
                            </div>

                            <div className="flex flex-col gap-3">
                                {formData.exerciseList.map((exercise, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-2 items-center bg-[var(--bg-page)] p-3 rounded-2xl border border-[var(--border-color)]">
                                        <div className="col-span-4">
                                            <input
                                                type="text"
                                                placeholder="Exercise Name"
                                                className="w-full bg-transparent border-none text-[var(--text-primary)] text-sm font-semibold focus:outline-none"
                                                value={exercise.name}
                                                onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <input
                                                type="number"
                                                placeholder="Sets"
                                                className="w-full bg-transparent border-none text-[var(--text-primary)] text-sm focus:outline-none text-center"
                                                value={exercise.sets || ''}
                                                onChange={(e) => handleExerciseChange(index, 'sets', Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <input
                                                type="number"
                                                placeholder="Reps"
                                                className="w-full bg-transparent border-none text-[var(--text-primary)] text-sm focus:outline-none text-center"
                                                value={exercise.reps || ''}
                                                onChange={(e) => handleExerciseChange(index, 'reps', Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <input
                                                type="number"
                                                placeholder="Weight (kg)"
                                                className="w-full bg-transparent border-none text-[var(--text-primary)] text-sm focus:outline-none text-center"
                                                value={exercise.weight || ''}
                                                onChange={(e) => handleExerciseChange(index, 'weight', Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="col-span-1 flex justify-center">
                                            <button type="button" onClick={() => handleRemoveExercise(index)} className="text-[var(--text-muted)] hover:text-red-500 border-none bg-transparent cursor-pointer">
                                                <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full mt-6 py-5 rounded-[24px] shadow-xl text-lg font-black tracking-wide">
                            SAVE WORKOUT PLAN
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
