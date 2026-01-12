import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-[var(--border-light)] rounded-lg bg-[var(--bg-secondary)] overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--bg-tertiary)] transition-colors"
            >
                <span className="font-medium">{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-[var(--text-secondary)]" /> : <ChevronDown className="w-5 h-5 text-[var(--text-secondary)]" />}
            </button>
            {isOpen && (
                <div className="p-4 pt-0 text-[var(--text-secondary)] border-t border-[var(--border-light)] bg-[var(--bg-primary)]/50">
                    <div className="pt-4">{answer}</div>
                </div>
            )}
        </div>
    );
};

const FAQPage = () => {
    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "You can reset your password by going to the Settings page and clicking on 'Change Password'. If you cannot login, please contact support."
        },
        {
            question: "What are the support hours?",
            answer: "Our support team is available Monday through Friday from 9 AM to 6 PM EST. For critical issues, we offer 24/7 emergency support."
        },
        {
            question: "How do I track my ticket status?",
            answer: "You can track your ticket status in real-time from your Dashboard. The 'My Tickets' section lists all your active cases with their current status."
        },
        {
            question: "Can I add attachments to my tickets?",
            answer: "Currently, attachment support is in development. You can, however, provide links to external files (like Google Drive or Dropbox) in the ticket description."
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Simple Navbar for standalone page */}
            <nav className="glass sticky top-0 z-50 px-6 py-4 mb-10">
                <div className="container flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight">DeeTick Guide</span>
                    </Link>
                    <div className="flex gap-4">
                        <Link to="/login" className="btn btn-secondary">Login</Link>
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            <div className="container max-w-4xl pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
                    <p className="text-[var(--text-secondary)] text-lg">Search our knowledge base or browse frequently asked questions.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="card text-center p-8 hover:border-[var(--brand-primary)] cursor-pointer">
                        <FileText className="w-12 h-12 text-[var(--brand-primary)] mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Documentation</h3>
                        <p className="text-sm text-[var(--text-secondary)]">Detailed guides on how to use the platform.</p>
                    </div>
                    <div className="card text-center p-8 hover:border-[var(--brand-primary)] cursor-pointer">
                        <MessageCircle className="w-12 h-12 text-[var(--accent-success)] mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Community Forum</h3>
                        <p className="text-sm text-[var(--text-secondary)]">Connect with other users and share tips.</p>
                    </div>
                    <div className="card text-center p-8 hover:border-[var(--brand-primary)] cursor-pointer">
                        <HelpCircle className="w-12 h-12 text-[var(--accent-warning)] mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Contact Support</h3>
                        <p className="text-sm text-[var(--text-secondary)]">Get direct help from our expert team.</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
