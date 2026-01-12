import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Clock, CheckCircle, AlertTriangle, ArrowRight, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, gradient, trend }) => (
    <div className="relative overflow-hidden p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all duration-300 group hover:-translate-y-1">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 rounded-bl-full -mr-10 -mt-10 group-hover:opacity-10 transition-opacity`}></div>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-10`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            {trend && (
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {trend}
                </span>
            )}
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
    </div>
);

const DashboardHome = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div>
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.firstName}! 👋</h1>
                    <p className="text-slate-400">Here's your support overview for today.</p>
                </div>
                <Link
                    to="/dashboard/create-ticket"
                    className="btn bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 border-none rounded-xl px-6 py-3 flex items-center gap-2 font-semibold transition-all hover:scale-105"
                >
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">+</div>
                    Create New Ticket
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    title="Total Tickets"
                    value="24"
                    icon={Ticket}
                    gradient="from-blue-500 to-cyan-500"
                    trend="+12%"
                />
                <StatCard
                    title="Pending Action"
                    value="7"
                    icon={Clock}
                    gradient="from-amber-500 to-orange-500"
                    trend="+5%"
                />
                <StatCard
                    title="Resolved"
                    value="16"
                    icon={CheckCircle}
                    gradient="from-emerald-500 to-teal-500"
                />
                <StatCard
                    title="Urgent Issues"
                    value="1"
                    icon={AlertTriangle}
                    gradient="from-rose-500 to-pink-500"
                    trend="Check now"
                />
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-400" /> Recent Activity
                        </h2>
                        <Link to="/dashboard/tickets" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium hover:underline">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-white/[0.02]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 text-slate-400 font-bold">
                                            {['PM', 'JD', 'AS'][i - 1]}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">Payment Gateway Timeout</h4>
                                            <p className="text-xs text-slate-500 font-medium">#TKT-829{i} • Updated 2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            Resolved
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Card */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white">System Status</h2>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900 border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <span className="text-sm font-semibold text-emerald-400 tracking-wide uppercase">Operational</span>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">API Latency</span>
                                <span className="text-white font-mono">42ms</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-[98%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-white/5">
                                <h4 className="font-bold text-white text-sm mb-1">Support Hours</h4>
                                <p className="text-xs text-slate-400">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
