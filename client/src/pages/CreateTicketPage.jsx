import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { Save, X, AlertCircle, Loader2 } from 'lucide-react';

const CreateTicketPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        ticketBody: '',
        priority: 'medium',
        catId: 1, // Default category
        userType: JSON.parse(localStorage.getItem('user') || '{}').userType || 'customer'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/tickets', formData);
            navigate('/dashboard/tickets');
        } catch (err) {
            setError(err.message || 'Failed to create ticket. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Create New Ticket</h1>
                    <p className="text-[var(--text-secondary)]">Submit a new support request</p>
                </div>
            </div>

            <div className="card p-8">
                {error && (
                    <div className="bg-[rgba(239,68,68,0.1)] border border-[var(--accent-error)] text-[var(--accent-error)] p-4 rounded-lg mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Subject</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Brief summary of the issue"
                            className="h-12 text-lg"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Category</label>
                            <select
                                name="catId"
                                value={formData.catId}
                                onChange={handleChange}
                                className="h-11 cursor-pointer"
                            >
                                <option value="1">Technical Support</option>
                                <option value="2">Billing Question</option>
                                <option value="3">Feature Request</option>
                                <option value="4">General Inquiry</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="h-11 cursor-pointer"
                            >
                                <option value="low">Low - General Question</option>
                                <option value="medium">Medium - Standard Issue</option>
                                <option value="high">High - Urgent Problem</option>
                                <option value="critical">Critical - System Down</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">Description</label>
                        <textarea
                            name="ticketBody"
                            value={formData.ticketBody}
                            onChange={handleChange}
                            rows="8"
                            placeholder="Please describe the issue in detail..."
                            className="resize-y"
                            required
                        ></textarea>
                        <p className="text-xs text-[var(--text-secondary)] mt-2 text-right">
                            Please include specific details to help us resolve this faster.
                        </p>
                    </div>

                    <div className="pt-6 border-t border-[var(--border-light)] flex items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="btn btn-secondary px-6"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary px-8"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-4 h-4" /> Submit Ticket
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTicketPage;
