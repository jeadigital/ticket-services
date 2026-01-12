import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Ticket, PlusCircle, Settings, LogOut, Bell, Search, User, Menu } from 'lucide-react';
import { api } from '../utils/api';

const DashboardLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

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
        <div className="min-h-screen flex bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500 selection:text-white">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/80 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static`}>
                <div className="h-16 flex items-center gap-3 px-6 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="font-bold text-white text-lg">D</span>
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">DeeTick</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-gradient-to-r from-indigo-600/20 to-indigo-600/5 text-indigo-400 font-medium border border-indigo-500/10'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                                <span>{item.label}</span>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all border border-transparent hover:border-red-500/10"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-black/20">
                {/* Topbar */}
                <header className="h-16 px-6 md:px-8 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-slate-400 hover:text-white">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="relative max-w-sm w-full md:block hidden">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="h-9 w-64 pl-10 rounded-full bg-white/5 border border-white/5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white/10 transition-all placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-slate-900"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
                        <div className="flex items-center gap-3 pl-2 md:pl-0">
                            <div className="text-right hidden md:block">
                                <div className="text-sm font-medium text-white">{user.firstName} {user.lastName}</div>
                                <div className="text-xs text-slate-500 capitalize">{user.userType || 'Admin'}</div>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1px]">
                                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                                    <span className="text-xs font-bold text-indigo-400">{user.firstName?.charAt(0)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-2">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Background Gradient Mesh */}
            <div className="fixed inset-0 pointer-events-none -z-10 bg-slate-950">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]"></div>
            </div>
        </div>
    );
};

export default DashboardLayout;
