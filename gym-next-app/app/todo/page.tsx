"use client"

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchTodos, updateTodoStatus, deleteTodo } from '@/action/todoSlice'
import { useSearchParams } from 'next/navigation'

import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CircularProgress from '@mui/material/CircularProgress'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TimerIcon from '@mui/icons-material/Timer'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CloseIcon from '@mui/icons-material/Close'
import BlockIcon from '@mui/icons-material/Block'

export default function TodoPage() {
    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();

    const status = searchParams.get('status') || '';
    const trash = searchParams.get('trash') || 'false';
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedTodo, setExpandedTodo] = useState<string | null>(null);

    const { todos, loading, stats, totalPages, page } = useSelector((state: RootState) => state.todo);

    useEffect(() => {
        const params: any = { page };
        if (status) params.status = status;
        if (trash === 'true') params.trash = 'true';
        if (searchTerm) params.search = searchTerm;

        dispatch(fetchTodos(params));
    }, [dispatch, status, trash, searchTerm, page]);

    const handleToggleStatus = (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        dispatch(updateTodoStatus({ id, status: newStatus }));
    };

    const handleSkip = (id: string) => {
        dispatch(updateTodoStatus({ id, status: 'skipped' }));
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Move this workout to trash?")) {
            dispatch(deleteTodo(id));
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedTodo(expandedTodo === id ? null : id);
    };

    return (
        <div className="flex flex-col gap-8 pb-32">

            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
                        {trash === 'true' ? 'Trash' : status === 'completed' ? 'Finished' : status === 'pending' ? 'Active' : 'Daily'}
                        <span className="text-[var(--brand-red)] ml-2">{trash === 'true' ? 'Bin' : 'Workouts'}</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search workouts..."
                            className="bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] px-12 py-4 rounded-3xl w-full md:w-[320px] focus:outline-none focus:ring-4 focus:ring-[var(--brand-red)]/10 focus:border-[var(--brand-red)] transition-all shadow-sm font-semibold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--brand-red)] transition-colors" />
                    </div>
                </div>
            </header>

            {/* Stats Cards */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Logged', value: stats.total, color: 'var(--text-primary)' },
                    { label: 'Crushed', value: stats.completed, color: '#22C55E' },
                    { label: 'Pending', value: stats.pending, color: 'var(--brand-yellow)' },
                    { label: 'Score', value: `${stats.efficiency}%`, color: 'var(--brand-red)' }
                ].map((stat, i) => (
                    <div key={i} className="bg-[var(--bg-card)] p-6 rounded-[40px] border border-[var(--border-color)] shadow-sm hover:translate-y-[-6px] transition-all duration-300">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">{stat.label}</p>
                        <p className="text-4xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                    </div>
                ))}
            </section>

            {/* Todo List Content */}
            <section className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[var(--brand-red)]/10 flex items-center justify-center text-[var(--brand-red)]">
                            <FitnessCenterIcon sx={{ fontSize: 20 }} />
                        </div>
                        {trash === 'true' ? 'Recycle Bin' : 'Workout Journal'}
                    </h3>
                    {loading && <CircularProgress size={24} thickness={5} className="text-[var(--brand-red)]" />}
                </div>

                <div className="flex flex-col gap-4">
                    {todos.length === 0 && !loading ? (
                        <div className="py-24 text-center bg-[var(--bg-card)] rounded-[50px] border-3 border-dashed border-[var(--border-color)] flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-[var(--bg-page)] flex items-center justify-center mb-6">
                                <PriorityHighIcon className="text-[var(--text-muted)] scale-[1.5]" />
                            </div>
                            <p className="text-xl font-black text-[var(--text-primary)]">Your journal is empty</p>
                            <p className="text-[var(--text-secondary)] mt-1 font-medium max-w-xs">No workouts match your current filter. Click the plus button to start logging!</p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo._id}
                                className={`group bg-[var(--bg-card)] border-2 ${todo.status === 'completed' ? 'border-green-500/20' : todo.status === 'skipped' ? 'border-yellow-500/20' : 'border-transparent shadow-[var(--shadow-sm)]'} p-6 md:p-8 rounded-[40px] flex flex-col transition-all duration-500 hover:border-[var(--brand-red)]/30 hover:shadow-2xl`}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => handleToggleStatus(todo._id, todo.status)}
                                            disabled={trash === 'true'}
                                            className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all cursor-pointer ${todo.status === 'completed' ? 'bg-[#22C55E] border-[#22C55E] text-white' : 'bg-transparent border-[var(--border-color)] text-transparent hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]'
                                                }`}
                                        >
                                            <DoneAllIcon sx={{ fontSize: 20 }} />
                                        </button>

                                        <div className="flex flex-col cursor-pointer" onClick={() => toggleExpand(todo._id)}>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xl font-black text-[var(--text-primary)] transition-all ${todo.status === 'completed' ? 'line-through text-green-600/60' : todo.status === 'skipped' ? 'text-yellow-600/60 font-bold italic' : ''}`}>
                                                    {todo.title}
                                                </span>
                                                {todo.workoutType && (
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-page)] border border-[var(--border-color)] text-[var(--text-muted)] font-black uppercase tracking-tighter">
                                                        {todo.workoutType}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
                                                <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[var(--text-muted)]">
                                                    <AccessTimeIcon sx={{ fontSize: 14 }} className="text-[var(--brand-red)]" />
                                                    {todo.scheduledFor ? new Date(todo.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Asap'}
                                                </span>
                                                {todo.duration && (
                                                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[var(--text-muted)]">
                                                        <TimerIcon sx={{ fontSize: 14 }} className="text-[#3B82F6]" />
                                                        {todo.duration} min
                                                    </span>
                                                )}
                                                {todo.caloriesBurned && (
                                                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[var(--text-muted)]">
                                                        <LocalFireDepartmentIcon sx={{ fontSize: 14 }} className="text-[#F59E0B]" />
                                                        {todo.caloriesBurned} kcal
                                                    </span>
                                                )}
                                                <span className={`text-[10px] px-3 py-1 rounded-xl font-black uppercase tracking-widest ${todo.priority === 'high' ? 'bg-red-500/10 text-red-600' :
                                                    todo.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-blue-500/10 text-blue-600'
                                                    }`}>
                                                    {todo.priority} Prio
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 md:gap-3">
                                        {trash !== 'true' && todo.status === 'pending' && (
                                            <button
                                                onClick={() => handleSkip(todo._id)}
                                                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-yellow-600 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all border-none cursor-pointer font-bold text-xs"
                                                title="Skip today"
                                            >
                                                <BlockIcon sx={{ fontSize: 16 }} /> Skip
                                            </button>
                                        )}
                                        {trash !== 'true' && (
                                            <button
                                                onClick={() => handleDelete(todo._id)}
                                                className="p-3 rounded-2xl text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-500 transition-all border-none bg-transparent cursor-pointer"
                                            >
                                                <DeleteOutlineIcon sx={{ fontSize: 24 }} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => toggleExpand(todo._id)}
                                            className="p-3 rounded-2xl text-[var(--text-primary)] hover:bg-[var(--bg-page)] transition-all border-none bg-transparent cursor-pointer"
                                        >
                                            {expandedTodo === todo._id ? <KeyboardArrowUpIcon sx={{ fontSize: 24 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 24 }} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedTodo === todo._id && (
                                    <div className="mt-8 pt-6 border-t border-[var(--border-color)] animate-in slide-in-from-top-4 duration-300">
                                        {todo.description && (
                                            <div className="mb-6">
                                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">Notes</h4>
                                                <p className="text-[var(--text-primary)] font-medium leading-relaxed bg-[var(--bg-page)] p-5 rounded-2xl border border-[var(--border-color)]">
                                                    {todo.description}
                                                </p>
                                            </div>
                                        )}

                                        {todo.exerciseList && todo.exerciseList.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">Exercises ({todo.exerciseList.length})</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {todo.exerciseList.map((ex, idx) => (
                                                        <div key={idx} className="flex items-center justify-between p-4 bg-[var(--bg-page)] rounded-2xl border border-[var(--border-color)] hover:border-[var(--brand-red)]/20 transition-colors">
                                                            <span className="font-bold text-[var(--text-primary)]">{ex.name}</span>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-xs bg-[var(--brand-red)]/10 text-[var(--brand-red)] px-2 py-0.5 rounded-lg font-bold">{ex.sets}s</span>
                                                                <span className="text-xs bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded-lg font-bold">{ex.reps}r</span>
                                                                <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded-lg font-bold">{ex.weight}kg</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Pagination (Simplified) */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {/* Pagination mapping could go here */}
                </div>
            )}



        </div>
    )
}
