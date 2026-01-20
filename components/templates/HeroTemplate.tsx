'use client';
import React from 'react';
import { motion } from 'framer-motion';

const HeroTemplate = () => {
    return (
        <div className="relative w-full h-full bg-[#16181d] font-display text-white selection:bg-[#0bc9da] selection:text-[#16181d] overflow-hidden flex flex-col items-center justify-center">
            {/* Scope specific styles for this template that might conflict/differ */}
            <style jsx global>{`
        .template-1-primary { color: #0bc9da; }
        .bg-template-1-primary { background-color: #0bc9da; }
        .border-template-1-primary { border-color: #0bc9da; }
      `}</style>

            {/* Holographic Background Elements */}
            <div className="absolute inset-0 hero-grid pointer-events-none"></div>
            <div className="absolute top-1/4 -left-20 size-96 bg-[#0bc9da]/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 -right-20 size-96 bg-[#0bc9da]/5 blur-[120px] rounded-full"></div>

            {/* Navbar Removed */}

            <div className="max-w-[1200px] w-full px-6 py-12 flex flex-row items-center gap-16 relative z-10">
                {/* Hero Content Left */}
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0bc9da]/10 border border-[#0bc9da]/20 text-[#0bc9da] text-xs font-bold uppercase tracking-widest w-fit">
                            Preview: Screenshot 1 of 5
                        </span>
                        <h1 contentEditable suppressContentEditableWarning className="text-6xl font-bold leading-[1.1] tracking-tight text-white outline-none focus:bg-white/5 rounded px-2 -ml-2 transition-colors">
                            Security <br />
                            <span className="text-[#0bc9da]">& Speed.</span>
                        </h1>
                        <p contentEditable suppressContentEditableWarning className="text-lg text-white/60 max-w-md leading-relaxed outline-none focus:bg-white/5 rounded px-2 -ml-2 transition-colors">
                            Experience the next generation of financial autonomy with our encrypted architecture and lightning-fast settlements.
                        </p>
                    </div>

                    {/* Bento-style Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-panel p-6 rounded-xl flex flex-col gap-2 border-l-4 border-l-[#0bc9da]">
                            <span className="text-xs uppercase tracking-tighter text-white/40 font-bold">Uptime</span>
                            <div contentEditable suppressContentEditableWarning className="text-2xl font-bold tracking-tight outline-none">99.99%</div>
                            <span className="text-[#0bc9da] text-xs font-medium">Enterprise Grade</span>
                        </div>
                        <div className="glass-panel p-6 rounded-xl flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-tighter text-white/40 font-bold">Latency</span>
                            <div contentEditable suppressContentEditableWarning className="text-2xl font-bold tracking-tight outline-none">~14ms</div>
                            <span className="text-[#0bc9da] text-xs font-medium">Global Relay</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button className="bg-[#0bc9da] text-[#16181d] h-14 px-8 rounded-xl font-bold text-lg flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                            <span contentEditable suppressContentEditableWarning className="outline-none">Get Started</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                        <button className="glass-panel h-14 px-8 rounded-xl font-bold text-lg hover:bg-white/5 transition-all">
                            <span contentEditable suppressContentEditableWarning className="outline-none">Read Docs</span>
                        </button>
                    </div>
                </div>

                {/* Hero Visual Right: Device Mockup & Bubbles */}
                <div className="flex-1 relative flex items-center justify-center">
                    {/* Phone Mockup Container */}
                    <div className="relative phone-mockup-tilt">
                        <div className="w-[300px] h-[600px] bg-[#000] rounded-[3rem] border-[8px] border-[#222] relative overflow-hidden ring-4 ring-white/5">
                            {/* Simulated App Screen */}
                            <div className="absolute inset-0 bg-[#16181d] flex flex-col p-6 gap-6">
                                <div className="flex justify-between items-center opacity-40">
                                    <span className="material-symbols-outlined text-sm">signal_cellular_4_bar</span>
                                    <div className="w-16 h-5 bg-white/20 rounded-full"></div>
                                    <span className="material-symbols-outlined text-sm">battery_full</span>
                                </div>
                                <div className="mt-4 flex flex-col gap-4">
                                    <div className="h-4 w-24 bg-[#0bc9da]/20 rounded-full"></div>
                                    <div className="h-10 w-full bg-white/5 rounded-lg"></div>
                                    <div className="h-32 w-full bg-[#0bc9da]/10 border border-[#0bc9da]/20 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#0bc9da] text-4xl">fingerprint</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-20 flex-1 bg-white/5 rounded-xl"></div>
                                        <div className="h-20 flex-1 bg-white/5 rounded-xl"></div>
                                    </div>
                                    <div className="h-24 w-full bg-white/5 rounded-xl mt-auto"></div>
                                </div>
                            </div>
                        </div>

                        {/* Info Bubble: Security */}
                        <motion.div
                            drag
                            dragMomentum={false}
                            className="absolute -left-16 top-20 glass-panel p-4 rounded-xl glow-border flex items-center gap-4 w-[280px] scale-90 md:scale-100 cursor-grab active:cursor-grabbing z-20"
                        >
                            <div className="size-12 rounded-lg bg-[#0bc9da]/20 flex items-center justify-center text-[#0bc9da] pointer-events-none select-none">
                                <span className="material-symbols-outlined">shield_lock</span>
                            </div>
                            <div className="flex flex-col">
                                <span contentEditable suppressContentEditableWarning className="text-sm font-bold outline-none pointer-events-auto cursor-text">Security</span>
                                <span contentEditable suppressContentEditableWarning className="text-xs text-white/60 leading-tight outline-none pointer-events-auto cursor-text">Bank-grade encryption & biometric vault.</span>
                            </div>
                        </motion.div>

                        {/* Info Bubble: Speed */}
                        <motion.div
                            drag
                            dragMomentum={false}
                            className="absolute -right-20 bottom-24 glass-panel p-4 rounded-xl glow-border flex items-center gap-4 w-[280px] scale-90 md:scale-100 cursor-grab active:cursor-grabbing z-20"
                        >
                            <div className="size-12 rounded-lg bg-[#0bc9da]/20 flex items-center justify-center text-[#0bc9da] pointer-events-none select-none">
                                <span className="material-symbols-outlined">bolt</span>
                            </div>
                            <div className="flex flex-col">
                                <span contentEditable suppressContentEditableWarning className="text-sm font-bold outline-none pointer-events-auto cursor-text">Speed</span>
                                <span contentEditable suppressContentEditableWarning className="text-xs text-white/60 leading-tight outline-none pointer-events-auto cursor-text">Instant cross-border settlements.</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Abstract Chart Background behind phone */}
                    <div className="absolute -z-10 w-[500px] h-[300px] opacity-20">
                        <svg className="w-full h-full text-[#0bc9da]" viewBox="0 0 400 200">
                            <path d="M0 150 Q 50 120 100 140 T 200 80 T 300 110 T 400 40" fill="none" stroke="currentColor" strokeWidth="2"></path>
                            <path d="M0 180 Q 70 140 120 160 T 220 100 T 320 130 T 400 70" fill="none" opacity="0.5" stroke="currentColor" strokeWidth="2"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0bc9da]/5 to-transparent pointer-events-none -z-10"></div>
        </div>
    );
};

export default HeroTemplate;
