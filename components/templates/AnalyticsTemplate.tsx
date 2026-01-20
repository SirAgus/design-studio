'use client';
import React from 'react';
import { motion } from 'framer-motion';

const AnalyticsTemplate = () => {
    return (
        <div className="relative w-full h-full bg-[#f9fafa] dark:bg-[#16191d] font-display text-slate-900 dark:text-slate-100 overflow-hidden flex">
            {/* Scope specific styles */}
            <style jsx global>{`
        .template-4-primary { color: #00c7ba; }
        .template-4-coral { color: #F56D4D; }
        .chart-bg {
            background-image: radial-gradient(circle at 2px 2px, rgba(0, 199, 186, 0.05) 1px, transparent 0);
            background-size: 24px 24px;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .dark .glass-card {
            background: rgba(22, 25, 29, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

            {/* Sidebar Removed */}

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden chart-bg items-center justify-center">
                {/* Background Decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-5 flex items-center justify-center overflow-hidden">
                    <svg fill="none" height="100%" viewBox="0 0 1000 1000" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 800C200 700 300 900 500 800C700 700 800 600 1000 500" stroke="#00c7ba" strokeLinecap="round" strokeWidth="40"></path>
                        <path d="M0 600C200 500 400 750 600 600C800 450 900 400 1000 300" stroke="#F56D4D" strokeLinecap="round" strokeWidth="20"></path>
                    </svg>
                </div>

                {/* Top Header Removed */}
                <div className="absolute top-8 text-center z-20">
                    <h2 contentEditable suppressContentEditableWarning className="text-3xl font-black tracking-tight text-slate-900 dark:text-white outline-none">Detailed Insights</h2>
                    <p contentEditable suppressContentEditableWarning className="text-sm text-slate-500 font-medium outline-none mt-1">Screen 3 of 5: Deep dive into your performance</p>
                </div>

                {/* Workspace Section */}
                <div className="flex-1 flex items-center justify-center px-12 py-8 relative w-full">
                    <div className="max-w-6xl w-full grid grid-cols-12 gap-8 items-center justify-center">
                        {/* Left Column: Info Bubbles */}
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

                            <motion.div drag dragMomentum={false} className="glass-card p-5 rounded-xl shadow-sm cursor-move active:cursor-grabbing">
                                <div className="flex items-center gap-3 mb-3 pointer-events-none select-none">
                                    <div className="size-8 rounded-lg bg-[#F56D4D]/20 flex items-center justify-center text-[#F56D4D]">
                                        <span className="material-symbols-outlined text-lg">trending_up</span>
                                    </div>
                                    <h3 className="text-sm font-bold">Revenue Growth</h3>
                                </div>
                                <p className="text-xs text-slate-500 leading-normal pointer-events-none select-none">Track passive income streams.</p>
                            </motion.div>
                        </div>

                        {/* Center: Visual Stage (Phone Overlap) */}
                        <div className="col-span-6 relative flex justify-center items-center h-[500px]">
                            {/* Back Phone */}
                            <div className="w-64 h-[480px] bg-slate-900 rounded-[40px] border-[8px] border-slate-800 shadow-2xl transform -rotate-6 translate-x-12 translate-y-4 overflow-hidden absolute">
                                <div className="w-full h-full bg-white dark:bg-[#16191d] p-6">
                                    <div className="h-4 w-12 bg-slate-100 dark:bg-slate-800 mx-auto rounded-full mb-8"></div>
                                    {/* Abstract bars */}
                                    <div className="h-32 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-end p-2 gap-1 mt-10">
                                        <div className="bg-[#F56D4D]/30 h-1/2 flex-1 rounded-sm"></div>
                                        <div className="bg-[#F56D4D] h-full flex-1 rounded-sm"></div>
                                        <div className="bg-[#F56D4D]/30 h-3/4 flex-1 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Front Phone */}
                            <div className="w-64 h-[480px] bg-slate-900 rounded-[40px] border-[8px] border-slate-800 shadow-2xl transform rotate-2 -translate-x-12 z-20 overflow-hidden absolute">
                                <div className="w-full h-full bg-white dark:bg-[#16191d] flex flex-col p-6">
                                    <div className="h-4 w-12 bg-slate-100 dark:bg-slate-800 mx-auto rounded-full mb-8"></div>
                                    <h4 className="text-lg font-bold">Analytics</h4>
                                    <p className="text-[10px] text-slate-400 font-semibold mb-6">SEPTEMBER 2024</p>

                                    <div className="relative h-40 w-full bg-[#00c7ba]/5 rounded-2xl overflow-hidden mb-6 flex items-center justify-center p-4">
                                        <svg className="overflow-visible" height="100%" viewBox="0 0 200 100" width="100%">
                                            <path d="M0 80 Q 25 20, 50 60 T 100 30 T 150 70 T 200 40" fill="none" stroke="#00c7ba" strokeLinecap="round" strokeWidth="4"></path>
                                            <circle cx="100" cy="30" fill="#00c7ba" r="4"></circle>
                                        </svg>
                                        <div className="absolute top-4 right-4 bg-white dark:bg-[#16191d] shadow-sm px-2 py-1 rounded text-[8px] font-bold border border-slate-100 dark:border-slate-800">Peak: $12.4k</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                                            <p className="text-[8px] text-slate-400 uppercase font-bold">Inflow</p>
                                            <p className="text-sm font-black text-[#00c7ba]">$4,200</p>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                                            <p className="text-[8px] text-slate-400 uppercase font-bold">Outflow</p>
                                            <p className="text-sm font-black text-[#F56D4D]">$1,850</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Widget */}
                            <motion.div
                                drag
                                dragMomentum={false}
                                className="absolute top-20 right-10 z-30 glass-card p-4 rounded-xl shadow-xl w-32 border-l-4 border-[#00c7ba] cursor-move active:cursor-grabbing"
                            >
                                <p className="text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-tighter">Velocity</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-black">+14%</span>
                                    <span className="material-symbols-outlined text-[#00c7ba] text-base">trending_up</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column: Info Bubbles */}
                        <div className="col-span-3 flex flex-col gap-6 relative z-30">
                            <motion.div drag dragMomentum={false} className="glass-card p-5 rounded-xl shadow-sm cursor-move active:cursor-grabbing">
                                <div className="flex items-center gap-3 mb-3 pointer-events-none select-none">
                                    <div className="size-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                                        <span className="material-symbols-outlined text-lg">compare_arrows</span>
                                    </div>
                                    <h3 className="text-sm font-bold">Market Comparison</h3>
                                </div>
                                <p className="text-xs text-slate-500 leading-normal pointer-events-none select-none">Benchmark your portfolio.</p>
                            </motion.div>

                            <motion.div drag dragMomentum={false} className="glass-card p-5 rounded-xl shadow-sm cursor-move active:cursor-grabbing">
                                <div className="flex items-center gap-3 mb-3 pointer-events-none select-none">
                                    <div className="size-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500">
                                        <span className="material-symbols-outlined text-lg">auto_graph</span>
                                    </div>
                                    <h3 className="text-sm font-bold">Predictive Forecasts</h3>
                                </div>
                                <p className="text-xs text-slate-500 leading-normal pointer-events-none select-none">AI-driven projections.</p>
                            </motion.div>
                        </div>

                    </div>
                </div>

                {/* Footer Stats */}
                <footer className="px-10 py-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-[#16191d]/50 backdrop-blur-sm z-10 w-full mt-auto">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex gap-12">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Assets</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white">$248,500.00</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Growth Rate</p>
                                <p className="text-xl font-black text-[#00c7ba]">+8.4%</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default AnalyticsTemplate;
