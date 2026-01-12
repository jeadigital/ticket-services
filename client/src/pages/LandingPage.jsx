import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <nav className="glass sticky top-0 z-50 px-6 py-4">
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="w-8 h-8 text-[var(--brand-primary)]" />
                        <span className="text-xl font-bold tracking-tight">DeeTick</span>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/login" className="btn btn-secondary">Login</Link>
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[var(--brand-primary)] rounded-full blur-[120px] opacity-20 -z-10"></div>

                <div className="container text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Support Your Customers <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-primary)] to-[var(--accent-success)]">
                            With Excellence
                        </span>
                    </h1>
                    <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
                        The enterprise-grade ticketing system built for modern teams. Secure, fast, and beautifully designed to streamline your support workflow.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register" className="btn btn-primary text-lg px-8 py-4">
                            Start Free Trial <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/faq" className="btn btn-secondary text-lg px-8 py-4">
                            View Documentation
                        </Link>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section className="py-20 bg-[var(--bg-primary)]">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="card">
                            <Zap className="w-10 h-10 text-[var(--accent-warning)] mb-4" />
                            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                            <p className="text-[var(--text-secondary)]">
                                Built on microservices architecture for uncompromised performance and scalability.
                            </p>
                        </div>
                        <div className="card">
                            <Shield className="w-10 h-10 text-[var(--accent-success)] mb-4" />
                            <h3 className="text-xl font-bold mb-2">Bank-Grade Security</h3>
                            <p className="text-[var(--text-secondary)]">
                                JWT authentication and encrypted data storage to keep your conversations safe.
                            </p>
                        </div>
                        <div className="card">
                            <CheckCircle className="w-10 h-10 text-[var(--brand-primary)] mb-4" />
                            <h3 className="text-xl font-bold mb-2">Easy Management</h3>
                            <p className="text-[var(--text-secondary)]">
                                Intuitive dashboard to track, assign, and resolve tickets efficiently.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-[var(--border-light)] mt-20">
                <div className="container text-center text-[var(--text-secondary)]">
                    <p>&copy; 2026 DeeTick. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
