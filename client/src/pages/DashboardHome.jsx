import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="card p-6 flex items-start justify-between">
        <div>
            <p className="text-[var(--text-secondary)] text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold">{value}</h3>
            {trend && <p className="text-xs text-[var(--accent-success)] mt-2">{trend}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
    </div>
);

const DashboardHome = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Welcome back, {user.firstName}!</h1>
                    <p className="text-[var(--text-secondary)]">Here's what's happening with your support tickets today.</p>
                </div>
                <Link to="/dashboard/create-ticket" className="btn btn-primary">
                    + New Ticket
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Tickets"
                    value="12"
                    icon={Ticket}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Pending"
                    value="4"
                    icon={Clock}
                    color="bg-yellow-500"
                />
                <StatCard
                    title="Resolved"
                    value="8"
                    icon={CheckCircle}
                    color="bg-green-500"
                />
                <StatCard
                    title="Urgent"
                    value="1"
                    icon={AlertTriangle}
                    color="bg-red-500"
                />
            </div>

            {/* Recent Activity Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold">Recent Tickets</h2>
                        <Link to="/dashboard/tickets" className="text-sm text-[var(--brand-primary)] hover:underline">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border-light)] hover:border-[var(--brand-primary)] transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div>
                                        <h4 className="font-medium">Unable to access payment gateway</h4>
                                        <p className="text-xs text-[var(--text-secondary)]">#TKT-2026-00{i} • Updated 2 hours ago</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[rgba(16,185,129,0.1)] text-[var(--accent-success)]">
                                    Resolved
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h2 className="text-lg font-bold mb-6">Support Status</h2>
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-[var(--accent-success)]"></div>
                            <span className="text-sm font-medium">All Systems Operational</span>
                        </div>
                        <div className="p-4 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-light)]">
                            <h4 className="font-bold text-sm mb-1">Support Hours</h4>
                            <p className="text-xs text-[var(--text-secondary)]">Mon-Fri: 9AM - 6PM EST</p>
                            <p className="text-xs text-[var(--text-secondary)]">Weekends: Emergency Only</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
