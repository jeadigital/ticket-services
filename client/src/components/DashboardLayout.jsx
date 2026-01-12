import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Ticket, PlusCircle, Settings, LogOut, Bell, Search, User } from 'lucide-react';
import { api } from '../utils/api';

const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        api.logout();
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Ticket, label: 'My Tickets', path: '/dashboard/tickets' },
        { icon: PlusCircle, label: 'New Ticket', path: '/dashboard/create-ticket' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen flex bg-[var(--bg-primary)]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-[var(--border-light)] bg-[var(--bg-secondary)] sticky top-0 h-screen hidden md:flex flex-col">
                <div className="p-6 border-b border-[var(--border-light)]">
                    <Link to="/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)] flex items-center justify-center text-white font-bold">
                            DT
                        </div>
                        <span className="font-bold text-lg tracking-tight">DeeTick</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                    ? 'bg-[var(--brand-primary)] text-white shadow-[var(--shadow-glow)]'
                                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[var(--border-light)]">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-[var(--text-secondary)] hover:bg-[rgba(239,68,68,0.1)] hover:text-[var(--accent-error)] transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 border-b border-[var(--border-light)] bg-[var(--bg-secondary)]/50 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative max-w-md w-full md:block hidden">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                className="h-9 pl-9 text-sm bg-[var(--bg-primary)] border-transparent focus:bg-[var(--bg-secondary)]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--accent-error)] rounded-full border-2 border-[var(--bg-secondary)]"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-[var(--border-light)]"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden md:block">
                                <div className="text-sm font-medium">{user.firstName} {user.lastName}</div>
                                <div className="text-xs text-[var(--text-secondary)] capitalize">{user.userType || 'User'}</div>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center border border-[var(--border-light)]">
                                <User className="w-5 h-5 text-[var(--text-secondary)]" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
