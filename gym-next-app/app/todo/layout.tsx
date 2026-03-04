"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import DeleteIcon from '@mui/icons-material/Delete'
import SpeedIcon from '@mui/icons-material/Speed'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import WidgetsIcon from '@mui/icons-material/Widgets'
import AddTodoModal from '@/components/todo/AddTodoModal'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { useEffect } from 'react'
import { fetchTodoStats } from '@/action/todoSlice'
import { useRouter, useSearchParams } from 'next/navigation'

const SIDEBAR_LINKS = [
    { name: "My Todos", icon: ListAltIcon, color: "var(--brand-red)", slug: "" },
    { name: "In Progress", icon: PendingActionsIcon, color: "var(--brand-yellow)", slug: "pending" },
    { name: "Completed", icon: CheckCircleOutlineIcon, color: "#22C55E", slug: "completed" },
    { name: "Trash", icon: DeleteIcon, color: "#9CA3AF", slug: "trash" },
]

export default function TodoLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get('status') || '';
    const isTrash = searchParams.get('trash') === 'true';

    const { stats } = useSelector((state: RootState) => state.todo);
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [fabOpen, setFabOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTodoStats());
    }, [dispatch]);

    const handleFilterChange = (slug: string) => {
        if (slug === 'trash') {
            router.push('/todo?trash=true');
        } else if (slug) {
            router.push(`/todo?status=${slug}`);
        } else {
            router.push('/todo');
        }
        setSidebarOpen(false);
    };

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[var(--bg-page)] relative">

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-[280px] bg-[var(--bg-card)] border-r border-[var(--border-color)] px-6 py-10">
                <div className="flex items-center gap-3 px-2 mb-12">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--brand-red)]/10 flex items-center justify-center text-[var(--brand-red)] shadow-sm">
                        <ListAltIcon sx={{ fontSize: 28 }} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tight">TASKS</h2>
                    </div>
                </div>

                <nav className="flex flex-col gap-3">
                    {SIDEBAR_LINKS.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleFilterChange(item.slug)}
                            className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 hover:bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-none bg-transparent cursor-pointer text-left ${(item.slug === 'trash' && isTrash) || (item.slug === currentStatus && !isTrash) ? 'bg-[var(--bg-page)] !text-[var(--brand-red)] shadow-sm border border-[var(--brand-red)]/10' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-xl transition-colors ${(item.slug === 'trash' && isTrash) || (item.slug === currentStatus && !isTrash)
                                    ? 'bg-[var(--brand-red)]/10'
                                    : 'bg-transparent group-hover:bg-[var(--bg-page)]'
                                    }`}>
                                    <item.icon sx={{ fontSize: 22, color: item.color }} />
                                </div>
                                <span className="font-semibold text-[15px]">{item.name}</span>
                            </div>
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all duration-300 ${(item.slug === 'trash' && isTrash) || (item.slug === currentStatus && !isTrash)
                                ? 'bg-[var(--brand-red)] text-white'
                                : 'bg-[var(--border-color)] text-[var(--text-muted)] group-hover:bg-[var(--brand-red)]/10 group-hover:text-[var(--brand-red)]'
                                }`}>
                                {item.slug === 'trash' ? '?' :
                                    item.slug === 'completed' ? stats.completed :
                                        item.slug === 'pending' ? stats.pending : stats.total}
                            </span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto p-6 bg-[var(--bg-page)] rounded-[32px] border border-[var(--border-color)] shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-wider">Efficiency</p>
                        <p className="text-[11px] font-black text-[var(--brand-red)]">{stats.efficiency}%</p>
                    </div>
                    <div className="h-2 w-full bg-[var(--border-color)] rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--brand-red)] transition-all duration-1000 ease-out" style={{ width: `${stats.efficiency}%` }}></div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto px-4 py-8 md:px-12 relative pb-24 md:pb-8">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>

                {/* Desktop FAB - Only visible on MD up */}
                <div className="hidden md:block fixed bottom-10 right-10 z-[50]">
                    <div className={`flex flex-col gap-4 mb-6 transition-all duration-300 transform origin-bottom ${fabOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}`}>
                        <button
                            className="flex items-center justify-end gap-3 border-none bg-transparent cursor-pointer group"
                            onClick={() => { setIsModalOpen(true); setFabOpen(false); }}
                        >
                            <span className="bg-[var(--bg-card)] text-[var(--text-primary)] px-4 py-2 rounded-xl shadow-xl text-sm font-bold border border-[var(--border-color)] opacity-0 group-hover:opacity-100 transition-opacity">Add New Task</span>
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-[var(--brand-red)] hover:bg-[var(--bg-page)] transition-all hover:scale-110 active:scale-95 border border-[var(--border-color)]">
                                <AddIcon sx={{ fontSize: 28 }} />
                            </div>
                        </button>
                    </div>

                    <button
                        onClick={() => setFabOpen(!fabOpen)}
                        className={`w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center border-none cursor-pointer transition-all duration-500 scale-100 hover:scale-105 active:scale-95 ${fabOpen ? 'bg-[var(--text-primary)] text-white rotate-45' : 'bg-[var(--brand-red)] text-white shadow-[var(--brand-red)]/30 shadow-lg'}`}
                    >
                        {fabOpen ? <CloseIcon sx={{ fontSize: 28 }} /> : <AddIcon sx={{ fontSize: 32 }} />}
                    </button>
                </div>
            </main>

            {/* Mobile Sidebar (Drawer) */}
            {sidebarOpen && (
                <>
                    <div
                        className="md:hidden fixed inset-0 z-[1010] bg-black/40 backdrop-blur-md transition-all duration-500"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div
                        className="md:hidden fixed top-0 left-0 z-[1020] w-[85%] max-w-[320px] h-full bg-[var(--bg-card)] shadow-2xl p-8 transition-all duration-300 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-12">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-[var(--brand-red)] flex items-center justify-center text-white shadow-xl shadow-[var(--brand-red)]/20">
                                    <ListAltIcon sx={{ fontSize: 24 }} />
                                </div>
                                <h2 className="font-black text-2xl text-[var(--text-primary)] tracking-tighter uppercase">Todo <span className="text-[var(--brand-red)]">Lab</span></h2>
                            </div>
                            <button onClick={() => setSidebarOpen(false)} className="w-10 h-10 rounded-xl hover:bg-[var(--bg-page)] border-none bg-transparent cursor-pointer transition-colors text-[var(--text-primary)] flex items-center justify-center">
                                <CloseIcon sx={{ fontSize: 24 }} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4">
                            {SIDEBAR_LINKS.map(item => (
                                <button
                                    key={item.name}
                                    onClick={() => handleFilterChange(item.slug)}
                                    className={`flex items-center justify-between px-6 py-5 rounded-[24px] border-none bg-transparent cursor-pointer w-full text-left transition-all duration-300 ${(item.slug === 'trash' && isTrash) || (item.slug === currentStatus && !isTrash)
                                        ? 'bg-[var(--brand-red)] text-white shadow-xl shadow-[var(--brand-red)]/30 scale-[1.02]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-page)]'
                                        }`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`p-2 rounded-xl ${(item.slug === 'trash' && isTrash) || (item.slug === currentStatus && !isTrash) ? 'bg-white/20' : 'bg-[var(--bg-page)]'}`}>
                                            <item.icon sx={{ fontSize: 22, color: (item.slug === 'trash' && isTrash) || (item.slug === currentStatus && !isTrash) ? 'white' : item.color }} />
                                        </div>
                                        <span className="font-bold text-lg">{item.name}</span>
                                    </div>
                                    <span className={`text-xs font-black px-3 py-1 rounded-full ${(item.slug === 'trash' && isTrash) || (item.slug === currentStatus && !isTrash)
                                        ? 'bg-white/30 text-white'
                                        : 'bg-[var(--bg-page)] text-[var(--text-muted)]'
                                        }`}>
                                        {item.slug === 'trash' ? '?' :
                                            item.slug === 'completed' ? stats.completed :
                                                item.slug === 'pending' ? stats.pending : stats.total}
                                    </span>
                                </button>
                            ))}
                        </nav>

                        <div className="mt-auto p-8 rounded-[40px] bg-[var(--bg-page)] border border-[var(--border-color)]">
                            <div className="w-12 h-1 w-1/3 bg-[var(--brand-red)]/20 rounded-full mb-6 mx-auto"></div>
                            <p className="text-center text-[13px] font-bold text-[var(--text-secondary)] leading-relaxed">
                                Organize your day, achieve your goals.
                            </p>
                        </div>
                    </div>
                </>
            )}

            {/* Premium Mobile Navigation Bar */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-sm">
                <div className="bg-[#1A1A1C]/90 backdrop-blur-xl rounded-[32px] p-3 flex items-center justify-between shadow-2xl border border-white/10">
                    {/* Menu Button */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white/70 hover:text-white transition-colors border-none bg-transparent cursor-pointer active:scale-90"
                    >
                        <MenuIcon sx={{ fontSize: 28 }} />
                    </button>

                    {/* Quick Filter - Home/Summary */}
                    <button
                        onClick={() => handleFilterChange('')}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-none cursor-pointer active:scale-90 ${currentStatus === '' && !isTrash ? 'bg-white/10 text-[var(--brand-red)]' : 'bg-transparent text-white/70'}`}
                    >
                        <WidgetsIcon sx={{ fontSize: 28 }} />
                    </button>

                    {/* Main Action - Center Add Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-16 h-16 -translate-y-8 rounded-[24px] bg-[var(--brand-red)] text-white shadow-[0_12px_24px_-8px_rgba(255,46,46,0.5)] flex items-center justify-center border-none cursor-pointer hover:scale-105 active:scale-90 transition-all"
                    >
                        <AddIcon sx={{ fontSize: 36 }} />
                    </button>

                    {/* Pending Filter */}
                    <button
                        onClick={() => handleFilterChange('pending')}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-none cursor-pointer active:scale-90 ${currentStatus === 'pending' ? 'bg-white/10 text-[var(--brand-yellow)]' : 'bg-transparent text-white/70'}`}
                    >
                        <PendingActionsIcon sx={{ fontSize: 28 }} />
                    </button>

                    {/* Trash Filter */}
                    <button
                        onClick={() => handleFilterChange('trash')}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border-none cursor-pointer active:scale-90 ${isTrash ? 'bg-white/10 text-white' : 'bg-transparent text-white/70'}`}
                    >
                        <DeleteIcon sx={{ fontSize: 26 }} />
                    </button>
                </div>
            </div>

            {/* Modals */}
            <AddTodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </div>

    )
}
