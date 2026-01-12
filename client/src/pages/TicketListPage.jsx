import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import { Plus, Search, Filter, Loader2, AlertCircle } from 'lucide-react';

const TicketListPage = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const data = await api.get('/tickets');
            // Ensure data is an array
            setTickets(Array.isArray(data) ? data : []);
        } catch (err) {
            setError('Failed to load tickets. ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'open': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'closed': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
            case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        }
    };

    const filteredTickets = tickets.filter(ticket =>
        filter === 'all' ? true : ticket.status?.toLowerCase() === filter
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1">My Tickets</h1>
                    <p className="text-[var(--text-secondary)]">Manage and track your support requests</p>
                </div>
                <Link to="/dashboard/create-ticket" className="btn btn-primary">
                    <Plus className="w-5 h-5" /> New Ticket
                </Link>
            </div>

            <div className="card p-0 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-[var(--border-light)] flex flex-col md:flex-row gap-4 justify-between bg-[var(--bg-secondary)]">
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--text-secondary)]" />
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            className="h-9 pl-9 text-sm bg-[var(--bg-primary)]"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-[var(--text-secondary)]" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="h-9 w-auto text-sm bg-[var(--bg-primary)] py-1 pr-8"
                        >
                            <option value="all">All Status</option>
                            <option value="open">Open</option>
                            <option value="pending">Pending</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-primary)] mb-4" />
                        <p className="text-[var(--text-secondary)]">Loading your tickets...</p>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center text-[var(--accent-error)] bg-red-500/5 m-4 rounded-lg flex flex-col items-center">
                        <AlertCircle className="w-8 h-8 mb-2" />
                        <p>{error}</p>
                        <button onClick={fetchTickets} className="mt-4 btn btn-secondary text-sm">Retry</button>
                    </div>
                ) : filteredTickets.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-[var(--text-secondary)]" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">No tickets found</h3>
                        <p className="text-[var(--text-secondary)] mb-6">You haven't created any support tickets yet.</p>
                        <Link to="/dashboard/create-ticket" className="btn btn-primary">
                            Create First Ticket
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm uppercase tracking-wider">
                                    <th className="p-4 font-medium">Tracking ID</th>
                                    <th className="p-4 font-medium">Subject</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Priority</th>
                                    <th className="p-4 font-medium text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-light)] text-sm">
                                {filteredTickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-[var(--bg-tertiary)]/50 transition-colors">
                                        <td className="p-4 font-mono text-[var(--brand-primary)]">
                                            <Link to={`/dashboard/tickets/${ticket.id}`}>
                                                {ticket.ticketTrackId || `#${ticket.id}`}
                                            </Link>
                                        </td>
                                        <td className="p-4 font-medium text-[var(--text-primary)]">
                                            <Link to={`/dashboard/tickets/${ticket.id}`} className="hover:underline">
                                                {ticket.title}
                                            </Link>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)} capitalize`}>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="p-4 capitalize text-[var(--text-secondary)]">
                                            {ticket.priority || 'Normal'}
                                        </td>
                                        <td className="p-4 text-right text-[var(--text-secondary)]">
                                            {ticket.openedTime ? new Date(ticket.openedTime).toLocaleDateString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketListPage;
