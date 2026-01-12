import React from 'react';
import { User, Mail, Shield, Bell } from 'lucide-react';

const SettingsPage = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-1">Account Settings</h1>
            <p className="text-[var(--text-secondary)] mb-8">Manage your profile and preferences</p>

            <div className="grid gap-8">
                {/* Profile Card */}
                <div className="card">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-[var(--brand-primary)]" /> Profile Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-[var(--text-secondary)]">First Name</label>
                            <div className="p-3 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-md">
                                {user.firstName || 'N/A'}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-[var(--text-secondary)]">Last Name</label>
                            <div className="p-3 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-md">
                                {user.lastName || 'N/A'}
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1 text-[var(--text-secondary)]">Email Address</label>
                            <div className="p-3 bg-[var(--bg-primary)] border border-[var(--border-light)] rounded-md flex items-center justify-between">
                                <span>{user.email || 'N/A'}</span>
                                <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20">Verified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="card">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-[var(--brand-primary)]" /> Security
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border-light)]">
                            <div>
                                <h4 className="font-medium">Password</h4>
                                <p className="text-sm text-[var(--text-secondary)]">Last changed 3 months ago</p>
                            </div>
                            <button className="btn btn-secondary text-sm">Change Password</button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border-light)]">
                            <div>
                                <h4 className="font-medium">Two-Factor Authentication</h4>
                                <p className="text-sm text-[var(--text-secondary)]">Add an extra layer of security</p>
                            </div>
                            <button className="btn btn-secondary text-sm">Enable 2FA</button>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="card">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-[var(--brand-primary)]" /> Notifications
                    </h2>
                    <div className="space-y-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-[var(--border-light)] bg-[var(--bg-primary)] text-[var(--brand-primary)] focus:ring-[var(--brand-glow)]" />
                            <div>
                                <span className="block font-medium">Email Notifications</span>
                                <span className="block text-sm text-[var(--text-secondary)]">Receive updates about your tickets</span>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 rounded border-[var(--border-light)] bg-[var(--bg-primary)] text-[var(--brand-primary)] focus:ring-[var(--brand-glow)]" />
                            <div>
                                <span className="block font-medium">Marketing Emails</span>
                                <span className="block text-sm text-[var(--text-secondary)]">Receive news and special offers</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
