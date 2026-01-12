import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Zap, Globe, BarChart3, Users, Lock } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen hero-bg text-white font-sans selection:bg-indigo-500 selection:text-white">
            {/* Navbar */}
            <nav className="fixed w-full z-50 transition-all duration-300 backdrop-blur-md bg-slate-950/50 border-b border-white/5">
                <div className="container px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <span className="font-bold text-white text-lg">D</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">DeeTick</span>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/login" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Log In</Link>
                        <Link to="/register" className="px-5 py-2 text-sm font-bold bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-all shadow-lg hover:shadow-white/10">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 overflow-hidden grid-pattern">
                <div className="container px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-6">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                Now 50% Faster
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                                Enterprise Support <br />
                                <span className="text-gradient">Reimagined.</span>
                            </h1>
                            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                                Experience the next evolution of ticketing. DeeTick combines AI-driven insights with military-grade security to deliver a frictionless support experience for modern enterprises.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/register" className="btn btn-primary text-lg px-8 py-4 rounded-full flex items-center justify-center gap-2 group">
                                    Start Free Trial
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/faq" className="px-8 py-4 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all flex items-center justify-center font-medium">
                                    View Demo
                                </Link>
                            </div>

                            <div className="mt-12 flex items-center gap-6 text-slate-500 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" /> No credit card required
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" /> 14-day free trial
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative lg:h-[600px] w-full flex items-center justify-center perspective-1000">
                            {/* Glow Effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[100px] -z-10"></div>

                            {/* Dashboard Mockup with Float Animation */}
                            <img
                                src="/hero-dashboard.png"
                                alt="DeeTick Dashboard Interface"
                                className="relative rounded-2xl shadow-2xl shadow-indigo-500/30 border border-indigo-500/20 animate-float w-full max-w-[650px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Trusted By Strip */}
            <div className="border-y border-white/5 bg-slate-900/50 py-10 overflow-hidden">
                <div className="container px-6">
                    <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-wider mb-6">Trusted by innovative teams worldwide</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Mock Logos - Text for now, could be SVGs */}
                        <div className="text-2xl font-bold flex items-center gap-2"><Globe className="w-6 h-6" /> ACME Corp</div>
                        <div className="text-2xl font-bold flex items-center gap-2"><Zap className="w-6 h-6" /> BoltShift</div>
                        <div className="text-2xl font-bold flex items-center gap-2"><Lock className="w-6 h-6" /> SecureNet</div>
                        <div className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="w-6 h-6" /> DataFlow</div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <section className="py-24 relative overflow-hidden">
                <div className="container px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Built for scale, designed for speed.</h2>
                        <p className="text-slate-400 text-lg">Everything you need to manage customer support, wrapped in a beautiful interface.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<Zap className="w-8 h-8 text-amber-400" />}
                            title="Lightning Performance"
                            desc="Optimized microservices architecture ensures your dashboard loads in milliseconds, extensively tested for high concurrency."
                        />
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-emerald-400" />}
                            title="Bank-Grade Security"
                            desc="End-to-end encryption, JWT authentication, and role-based access control to keep your sensitive data protected."
                        />
                        <FeatureCard
                            icon={<BarChart3 className="w-8 h-8 text-purple-400" />}
                            title="Actionable Analytics"
                            desc="Real-time insights into ticket volume, response times, and team performance to help you make data-driven decisions."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10 bg-slate-950 text-slate-400 text-sm">
                <div className="container px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center font-bold text-white text-xs">D</div>
                        <span className="text-white font-semibold">DeeTick</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <p>&copy; 2026 DeeTick Inc.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all duration-300 group hover:-translate-y-1">
        <div className="mb-6 bg-slate-950 w-16 h-16 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/20 group-hover:shadow-lg group-hover:shadow-indigo-500/10 transition-all">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed">
            {desc}
        </p>
    </div>
);

export default LandingPage;
