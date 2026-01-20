export const HERO_CODE = `'use client';
import React from 'react';
import { motion } from 'framer-motion';

const HeroTemplate = () => {
    return (
        <div id="capture-target" className="relative w-[1200px] h-[800px] bg-[#16181d] font-display text-white selection:bg-[#0bc9da] selection:text-[#16181d] overflow-hidden flex flex-col items-center justify-center">
            {/* Scope specific styles for this template that might conflict/differ */}
            <style jsx global>{\`
        .template-1-primary { color: #0bc9da; }
        .bg-template-1-primary { background-color: #0bc9da; }
        .border-template-1-primary { border-color: #0bc9da; }
      \`}</style>

            {/* Holographic Background Elements */}
            <div className="absolute inset-0 hero-grid pointer-events-none"></div>
            <div className="absolute top-1/4 -left-20 size-96 bg-[#0bc9da]/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-1/4 -right-20 size-96 bg-[#0bc9da]/5 blur-[120px] rounded-full"></div>

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

export default HeroTemplate;`;

export const GLOBAL_CODE = `'use client';
import React from 'react';
import { motion } from 'framer-motion';

const GlobalTemplate = () => {
    return (
        <div id="capture-target" className="relative w-[1200px] h-[800px] bg-[#f9fafa] dark:bg-[#111317] font-display text-slate-900 dark:text-white selection:bg-[#00c7ba]/30 overflow-hidden flex flex-col">
            {/* Scope specific styles */}
            <style jsx global>{\`
        .template-2-primary { color: #00c7ba; }
        .dots-pattern {
            background-image: radial-gradient(#1e2928 1px, transparent 1px);
            background-size: 24px 24px;
        }
        .glow-soft {
            box-shadow: 0 0 20px rgba(0, 199, 186, 0.2);
        }
      \`}</style>

            <main className="flex-1 flex flex-col lg:flex-row px-6 py-8 lg:px-20 gap-8 relative overflow-hidden">
                {/* Left Content: Map View */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 contentEditable suppressContentEditableWarning className="text-4xl lg:text-5xl font-black tracking-tight outline-none focus:bg-black/5 rounded px-2 -ml-2">Global Access</h1>
                        <p contentEditable suppressContentEditableWarning className="text-slate-500 dark:text-slate-400 text-lg outline-none focus:bg-black/5 rounded px-2 -ml-2">Move money across borders in seconds with real-time routing.</p>
                    </div>

                    {/* Interactive Map Area */}
                    <div className="relative flex-1 min-h-[500px] rounded-xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 overflow-hidden dots-pattern">
                        {/* Search Overlay */}
                        <div className="absolute top-6 left-6 z-10 w-full max-w-sm">
                            <div className="flex items-center bg-white dark:bg-[#1b2827] rounded-lg shadow-xl border border-white/10 p-1">
                                <span className="material-symbols-outlined ml-3 text-slate-400">search</span>
                                <input className="bg-transparent border-none focus:ring-0 text-sm w-full py-2 px-3 text-slate-700 dark:text-white outline-none" placeholder="Search destination country..." type="text" />
                            </div>
                        </div>

                        {/* Floating Bubbles */}
                        <motion.div
                            drag
                            dragMomentum={false}
                            className="absolute top-24 left-10 z-20 flex flex-col items-start gap-2 bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 glow-soft cursor-move active:cursor-grabbing"
                        >
                            <div className="flex items-center gap-3 pointer-events-none select-none">
                                <div className="size-10 bg-[#00c7ba] rounded-full flex items-center justify-center text-[#111317] shadow-lg">
                                    <span className="material-symbols-outlined">public</span>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-[#00c7ba] font-bold">Feature</p>
                                    <p className="text-lg font-bold text-white">Global Transfer</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            drag
                            dragMomentum={false}
                            className="absolute bottom-20 right-10 z-20 flex flex-col items-start gap-2 bg-[#111317]/80 backdrop-blur-xl p-4 rounded-xl border border-[#00c7ba]/30 shadow-2xl cursor-move active:cursor-grabbing"
                        >
                            <div className="flex items-center gap-3 pointer-events-none select-none">
                                <div className="size-10 bg-white/10 rounded-full flex items-center justify-center text-[#00c7ba]">
                                    <span className="material-symbols-outlined">account_balance_wallet</span>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Best Value</p>
                                    <p className="text-lg font-bold text-white leading-none">Low Fees <span className="text-[#00c7ba] ml-1">0.5%</span></p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Sidebar: Currency Converter */}
                <aside className="w-full lg:w-96 flex flex-col gap-6">
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm">
                        <div className="space-y-4">
                            {/* Converter UI */}
                            <div className="flex items-center bg-slate-50 dark:bg-white/5 p-4 rounded-lg">
                                <input className="bg-transparent border-none focus:ring-0 text-2xl font-bold w-full p-0 outline-none" type="number" defaultValue="1000" />
                                <span className="font-bold">USD</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default GlobalTemplate;`;

export const SAVINGS_CODE = `'use client';
import React from 'react';
import { motion } from 'framer-motion';

const SavingsTemplate = () => {
    return (
        <div id="capture-target" className="relative w-[1200px] h-[800px] bg-[#f9fafa] dark:bg-[#21262c] font-display text-[#101818] dark:text-white selection:bg-[#00c7ba]/30 overflow-hidden flex flex-col">
            <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-12 radial-glow">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.2em] uppercase text-[#00c7ba]/60 dark:text-[#00c7ba]/80">
                    Screenshot 02 / 05
                </div>

                <div className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-10 scale-90">
                    {/* Central Phone Mockup */}
                    <div className="relative z-20 group">
                        <div className="w-[300px] h-[610px] bg-[#1a1a1a] rounded-[3rem] p-3 border-[6px] border-[#333] phone-shadow relative overflow-hidden">
                            <div className="w-full h-full bg-white dark:bg-[#0f1115] rounded-[2.2rem] overflow-hidden flex flex-col">
                                <div className="px-6 pt-6 flex-1">
                                    <p className="text-[#5e8d8a] text-xs font-medium uppercase tracking-wider">Savings Dashboard</p>
                                    <h3 contentEditable suppressContentEditableWarning className="text-2xl font-bold mt-1 dark:text-white outline-none">Total Savings</h3>

                                    {/* Progress Ring */}
                                    <div className="relative w-full aspect-square flex items-center justify-center my-8">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle className="dark:stroke-gray-800" cx="50%" cy="50%" fill="transparent" r="45%" stroke="#f0f5f4" strokeWidth="12"></circle>
                                            <circle cx="50%" cy="50%" fill="transparent" r="45%" stroke="#00c7ba" strokeDasharray="283" strokeDashoffset="42" strokeLinecap="round" strokeWidth="12"></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span contentEditable suppressContentEditableWarning className="text-3xl font-bold dark:text-white outline-none">$12,450</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature Bubbles (Floating Info Cards) */}
                    <div className="flex flex-col gap-6 w-full max-w-sm lg:max-w-md relative z-30">
                        <motion.div
                            drag
                            dragMomentum={false}
                            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#f0f5f4] dark:border-gray-700 flex gap-4 cursor-move active:cursor-grabbing"
                        >
                            <div className="size-12 bg-[#00c7ba]/10 rounded-lg flex-shrink-0 flex items-center justify-center text-[#00c7ba] pointer-events-none">
                                <span className="material-symbols-outlined">auto_awesome</span>
                            </div>
                            <div>
                                <h4 contentEditable suppressContentEditableWarning className="text-lg font-bold dark:text-white outline-none pointer-events-auto cursor-text">Smart Savings</h4>
                                <p contentEditable suppressContentEditableWarning className="text-[#5e8d8a] text-sm leading-relaxed mt-1 outline-none pointer-events-auto cursor-text">AI-driven rounding and spare change collection. Save effortlessly.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SavingsTemplate;`;

export const ANALYTICS_CODE = `'use client';
import React from 'react';
import { motion } from 'framer-motion';

const AnalyticsTemplate = () => {
    return (
        <div id="capture-target" className="relative w-[1200px] h-[800px] bg-[#f9fafa] dark:bg-[#16191d] font-display text-slate-900 dark:text-slate-100 overflow-hidden flex">
            <main className="flex-1 flex flex-col relative overflow-hidden chart-bg items-center justify-center">
                <div className="absolute top-8 text-center z-20">
                    <h2 contentEditable suppressContentEditableWarning className="text-3xl font-black tracking-tight text-slate-900 dark:text-white outline-none">Detailed Insights</h2>
                    <p contentEditable suppressContentEditableWarning className="text-sm text-slate-500 font-medium outline-none mt-1">Screen 3 of 5: Deep dive into your performance</p>
                </div>

                <div className="flex-1 flex items-center justify-center px-12 py-8 relative w-full">
                    <div className="max-w-6xl w-full grid grid-cols-12 gap-8 items-center justify-center">
                        <div className="col-span-3 flex flex-col gap-6 relative z-30">
                            <motion.div drag dragMomentum={false} className="glass-card p-5 rounded-xl shadow-sm cursor-move active:cursor-grabbing">
                                <div className="flex items-center gap-3 mb-3 pointer-events-none select-none">
                                    <div className="size-8 rounded-lg bg-[#00c7ba]/20 flex items-center justify-center text-[#00c7ba]">
                                        <span className="material-symbols-outlined text-lg">payments</span>
                                    </div>
                                    <h3 className="text-sm font-bold">Spending Trends</h3>
                                </div>
                                <p className="text-xs text-slate-500 leading-normal pointer-events-none select-none">Automated categorization of weekly outgoings.</p>
                            </motion.div>
                        </div>
                        
                        <div className="col-span-6 relative flex justify-center items-center h-[500px]">
                            {/* Center Visuals */}
                        </div>

                        <div className="col-span-3 flex flex-col gap-6 relative z-30">
                            {/* Right Info Bubbles */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AnalyticsTemplate;`;

export const BLANK_CODE = `'use client';
import React from 'react';
import { motion } from 'framer-motion';

const BlankTemplate = () => {
    return (
        <div id="capture-target" className="relative w-[1200px] h-[800px] bg-white dark:bg-[#16181d] font-display text-slate-900 dark:text-white flex flex-col items-center justify-center overflow-hidden">
             {/* Empty State / Grid Pattern */}
             <div className="absolute inset-0 opacity-[0.03]" style={{ 
                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                backgroundSize: '32px 32px' 
             }}></div>
             
             <div className="z-10 text-center opacity-40 hover:opacity-100 transition-opacity">
                 <span className="material-symbols-outlined text-6xl mb-4">design_services</span>
                 <p className="text-xl font-bold">Start Creating</p>
                 <p className="text-sm">Click text to edit or drag elements (future feature)</p>
             </div>

             <motion.div 
                drag
                dragMomentum={false}
                className="absolute top-1/3 left-1/3 p-6 bg-white dark:bg-[#222] shadow-xl rounded-xl border border-slate-200 dark:border-white/10 cursor-move active:cursor-grabbing max-w-sm"
             >
                 <h2 contentEditable suppressContentEditableWarning className="text-2xl font-bold mb-2 outline-none">Editable Title</h2>
                 <p contentEditable suppressContentEditableWarning className="text-slate-500 text-sm outline-none">This is a blank canvas. You can edit this text and drag this card around.</p>
             </motion.div>
        </div>
    );
};

export default BlankTemplate;`;
