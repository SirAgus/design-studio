'use client';
import React from 'react';
import { motion } from 'framer-motion';

const BlankTemplate = () => {
    return (
        <div className="relative w-[1200px] h-[800px] bg-transparent font-display text-slate-900 dark:text-white flex flex-col items-center justify-center overflow-hidden">
            {/* Empty State / Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }}></div>

        </div>
    );
};

export default BlankTemplate;
