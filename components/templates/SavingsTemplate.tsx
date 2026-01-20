'use client';
import React from 'react';
import { motion } from 'framer-motion';

const SavingsTemplate = () => {
    return (
        <div className="relative w-[1200px] h-[800px] bg-[#f9fafa] dark:bg-[#21262c] font-display text-[#101818] dark:text-white selection:bg-[#00c7ba]/30 overflow-hidden flex flex-col">
            {/* Scope specific styles */}
            <style jsx global>{`
        .template-3-primary { color: #00c7ba; }
        .radial-glow {
            background: radial-gradient(circle at 50% 50%, rgba(0, 199, 186, 0.08) 0%, rgba(249, 250, 250, 0) 70%);
        }
        .dark .radial-glow {
            background: radial-gradient(circle at 50% 50%, rgba(0, 199, 186, 0.15) 0%, rgba(33, 38, 44, 0) 70%);
        }
        .phone-shadow {
            box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.12), 0 30px 60px -30px rgba(0, 0, 0, 0.15);
        }
      `}</style>

            {/* Top Navigation Removed */}

            {/* Main Hero Section */}
            <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-12 radial-glow">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.2em] uppercase text-[#00c7ba]/60 dark:text-[#00c7ba]/80">
                    Screenshot 02 / 05
                </div>

                <div className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-10 scale-90">
                    {/* Central Phone Mockup */}
                    <div className="relative z-20 group">
                        <div className="w-[300px] h-[610px] bg-[#1a1a1a] rounded-[3rem] p-3 border-[6px] border-[#333] phone-shadow relative overflow-hidden">
                            <div className="w-full h-full bg-white dark:bg-[#0f1115] rounded-[2.2rem] overflow-hidden flex flex-col">
                                {/* Status Bar */}
                                <div className="h-8 w-full flex justify-between px-6 pt-4 items-center">
                                    <span className="text-[10px] font-bold dark:text-white">9:41</span>
                                    <div className="flex gap-1">
                                        <span className="material-symbols-outlined text-[12px] dark:text-white">signal_cellular_alt</span>
                                        <span className="material-symbols-outlined text-[12px] dark:text-white">battery_full</span>
                                    </div>
                                </div>

                                {/* Dashboard UI */}
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
                                            <span contentEditable suppressContentEditableWarning className="text-xs text-[#5e8d8a] outline-none">85% of monthly goal</span>
                                        </div>
                                    </div>

                                    {/* Recent Goals */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-800 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                                                    <span className="material-symbols-outlined text-sm">flight</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold dark:text-white">Tokyo Trip</p>
                                                    <p className="text-[10px] text-[#5e8d8a]">$2,400 / $3,500</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-gray-800 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                    <span className="material-symbols-outlined text-sm">home</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold dark:text-white">House Deposit</p>
                                                    <p className="text-[10px] text-[#5e8d8a]">$8,200 / $50k</p>
                                                </div>
                                            </div>
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

                        <motion.div
                            drag
                            dragMomentum={false}
                            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#f0f5f4] dark:border-gray-700 flex gap-4 cursor-move active:cursor-grabbing lg:translate-x-12"
                        >
                            <div className="size-12 bg-[#00c7ba]/10 rounded-lg flex-shrink-0 flex items-center justify-center text-[#00c7ba] pointer-events-none">
                                <span className="material-symbols-outlined">ads_click</span>
                            </div>
                            <div>
                                <h4 contentEditable suppressContentEditableWarning className="text-lg font-bold dark:text-white outline-none pointer-events-auto cursor-text">Goal Tracking</h4>
                                <p contentEditable suppressContentEditableWarning className="text-[#5e8d8a] text-sm leading-relaxed mt-1 outline-none pointer-events-auto cursor-text">Visual milestones and multi-goal management.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            drag
                            dragMomentum={false}
                            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#f0f5f4] dark:border-gray-700 flex gap-4 cursor-move active:cursor-grabbing"
                        >
                            <div className="size-12 bg-[#00c7ba]/10 rounded-lg flex-shrink-0 flex items-center justify-center text-[#00c7ba] pointer-events-none">
                                <span className="material-symbols-outlined">trending_up</span>
                            </div>
                            <div>
                                <h4 contentEditable suppressContentEditableWarning className="text-lg font-bold dark:text-white outline-none pointer-events-auto cursor-text">Auto-Invest</h4>
                                <p contentEditable suppressContentEditableWarning className="text-[#5e8d8a] text-sm leading-relaxed mt-1 outline-none pointer-events-auto cursor-text">Recurring transfers and long-term wealth building.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Ambient Glow behind phone */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-[#00c7ba]/20 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

            </main>
        </div>
    );
};

export default SavingsTemplate;
