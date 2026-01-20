'use client';
import React from 'react';
import { motion } from 'framer-motion';

const GlobalTemplate = () => {
    return (
        <div className="relative w-[1200px] h-[800px] bg-[#f9fafa] dark:bg-[#111317] font-display text-slate-900 dark:text-white selection:bg-[#00c7ba]/30 overflow-hidden flex flex-col">
            {/* Scope specific styles */}
            <style jsx global>{`
        .template-2-primary { color: #00c7ba; }
        .dots-pattern {
            background-image: radial-gradient(#1e2928 1px, transparent 1px);
            background-size: 24px 24px;
        }
        .glow-soft {
            box-shadow: 0 0 20px rgba(0, 199, 186, 0.2);
        }
      `}</style>

            {/* Top Navigation Removed */}

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

                        {/* Map Connection Arc */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 800 500">
                            <path d="M 200 250 Q 400 50 650 300" fill="none" opacity="0.6" stroke="#00c7ba" strokeDasharray="8 4" strokeWidth="2"></path>
                            <circle cx="200" cy="250" fill="#00c7ba" r="4"></circle>
                            <circle cx="650" cy="300" fill="#00c7ba" r="6">
                                <animate attributeName="r" dur="2s" repeatCount="indefinite" values="4;8;4"></animate>
                            </circle>
                        </svg>

                        {/* Map Controls */}
                        <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                            <div className="size-10 bg-white dark:bg-[#1b2827] rounded-lg shadow-lg flex items-center justify-center hover:bg-[#00c7ba]/20 transition-colors cursor-pointer">
                                <span className="material-symbols-outlined">add</span>
                            </div>
                            <div className="size-10 bg-white dark:bg-[#1b2827] rounded-lg shadow-lg flex items-center justify-center hover:bg-[#00c7ba]/20 transition-colors cursor-pointer">
                                <span className="material-symbols-outlined">remove</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Currency Converter */}
                <aside className="w-full lg:w-96 flex flex-col gap-6">
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#00c7ba]">currency_exchange</span>
                            Quick Convert
                        </h3>
                        <div className="space-y-4">
                            {/* From */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">You Send</label>
                                <div className="flex items-center bg-slate-50 dark:bg-white/5 p-4 rounded-lg border border-transparent focus-within:border-[#00c7ba] transition-all">
                                    <input className="bg-transparent border-none focus:ring-0 text-2xl font-bold w-full p-0 outline-none" type="number" defaultValue="1000" />
                                    <div className="flex items-center gap-2 bg-white dark:bg-white/10 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 cursor-pointer">
                                        <span className="font-bold">USD</span>
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                            </div>
                            {/* Mid Swap */}
                            <div className="flex justify-center -my-3 relative z-10">
                                <div className="size-10 bg-[#00c7ba] rounded-full shadow-lg flex items-center justify-center text-[#111317] hover:scale-110 transition-transform cursor-pointer">
                                    <span className="material-symbols-outlined font-bold">swap_vert</span>
                                </div>
                            </div>
                            {/* To */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recipient Gets</label>
                                <div className="flex items-center bg-slate-50 dark:bg-white/5 p-4 rounded-lg border border-transparent focus-within:border-[#00c7ba] transition-all">
                                    <input className="bg-transparent border-none focus:ring-0 text-2xl font-bold w-full p-0 text-[#00c7ba] outline-none" type="number" defaultValue="924.50" />
                                    <div className="flex items-center gap-2 bg-white dark:bg-white/10 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 cursor-pointer">
                                        <span className="font-bold">EUR</span>
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Exchange Rate</span>
                                <span className="font-medium">1 USD = 0.9245 EUR</span>
                            </div>
                            <button className="w-full bg-[#00c7ba] hover:bg-[#00c7ba]/90 text-[#111317] font-black py-4 rounded-lg transition-all mt-4 tracking-tight">
                                CONTINUE TRANSFER
                            </button>
                        </div>
                    </div>

                    {/* Secondary Card: Live Stats */}
                    <div className="bg-[#00c7ba]/10 border border-[#00c7ba]/20 rounded-xl p-5 overflow-hidden relative">
                        <div className="flex flex-col gap-1 relative z-10">
                            <p className="text-xs font-bold text-[#00c7ba] uppercase">Market Alert</p>
                            <p contentEditable suppressContentEditableWarning className="text-lg font-bold leading-tight outline-none">GBP/USD is up 1.2% this morning.</p>
                        </div>
                        <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl opacity-10 rotate-12">trending_up</span>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default GlobalTemplate;
