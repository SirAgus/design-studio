'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';

type CanvasElementProps = {
    id: string;
    type: 'phone' | 'bubble' | 'stat' | 'text' | 'sticker' | 'icon' | 'graphics' | 'group' | 'message-stack' | 'avatar-group' | 'grid-menu' | 'chart' | 'progress-circle';
    data: { x: number; y: number; scale: number; rotation?: number; content?: string };
    isSelected: boolean;
    onSelect: (id: string, e?: React.MouseEvent | React.PointerEvent) => void;
    onUpdate: (id: string, updates: Partial<{ x: number; y: number; scale: number; rotation: number; content: string }>) => void;
    onDelete: (id: string) => void;
    onDragSelected?: (dx: number, dy: number) => void;
    children: React.ReactNode;
};

const CanvasElement = ({ id, type, data, isSelected, onSelect, onUpdate, onDelete, onDragSelected, children }: CanvasElementProps) => {
    // Refs for drag logic
    const isResizing = useRef(false);
    const lastClientX = useRef(0);

    const handleResizeStart = (e: React.PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();
        isResizing.current = true;
        lastClientX.current = e.clientX;

        window.addEventListener('pointermove', handleResizeMove);
        window.addEventListener('pointerup', handleResizeEnd);
    };

    const handleResizeMove = (e: PointerEvent) => {
        if (!isResizing.current) return;
        const delta = e.clientX - lastClientX.current;
        const newScale = Math.max(0.2, Math.min(3, data.scale + delta * 0.005));
        onUpdate(id, { scale: newScale });
        lastClientX.current = e.clientX;
    };

    const handleResizeEnd = () => {
        isResizing.current = false;
        window.removeEventListener('pointermove', handleResizeMove);
        window.removeEventListener('pointerup', handleResizeEnd);
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            // Sync drag end to parent state
            onDrag={(e, info) => {
                // info.delta is perfect for multi-move
                if (onDragSelected) {
                    onDragSelected(info.delta.x, info.delta.y);
                }
            }}
            onPointerDown={(e) => {
                e.stopPropagation();
                onSelect(id, e);
            }}
            // Use simple x/y transform from parent state
            // Note: framer-motion 'style' x/y applies transform
            style={{
                x: data.x,
                y: data.y,
                scale: data.scale,
                rotate: data.rotation || 0,
                position: 'absolute',
                top: 0,
                left: 0,
                touchAction: 'none'
            }}
            className="group absolute"
        >
            <div className={`relative transition-all duration-200 ${isSelected ? 'ring-1 ring-primary/50' : 'hover:ring-1 hover:ring-white/30'}`}>
                {/* Pointer events wrapper for children */}
                <div className="relative">
                    {children}
                </div>

                {isSelected && (
                    <>
                        <button
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                onDelete(id);
                            }}
                            className="absolute -top-4 -right-4 size-6 bg-red-500 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-[110]"
                            title="Delete"
                        >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>

                        <div
                            className="absolute -bottom-3 -right-3 size-6 bg-white border-2 border-primary rounded-full shadow-lg flex items-center justify-center cursor-nwse-resize z-[110] hover:scale-110 transition-transform"
                            onPointerDown={handleResizeStart}
                        >
                            <span className="material-symbols-outlined text-black text-[10px]">open_in_full</span>
                        </div>

                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white rounded px-2 py-1 text-[9px] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                            X: {Math.round(data.x)} Y: {Math.round(data.y)} | {(data.scale * 100).toFixed(0)}%
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default CanvasElement;
