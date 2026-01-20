import React from 'react';

type ModernDeviceProps = {
    model: 'iPhone 16 Pro' | 'iPhone 15 Pro' | 'Galaxy S24 Ultra' | 'Pixel 9 Pro' | string;
    width?: number;
    children?: React.ReactNode;
};

const ModernDevice: React.FC<ModernDeviceProps> = ({ model, width = 300, children }) => {
    // Aspect ratios (Height / Width)
    const aspectRatio = 19.5 / 9; // Approx for modern phones
    const height = width * aspectRatio;

    // Common styles
    const baseStyle: React.CSSProperties = {
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.4), 0 18px 36px -18px rgba(0, 0, 0, 0.4)',
        userSelect: 'none',
        overflow: 'hidden', // Ensure content stays inside
        backgroundColor: '#000', // Screen off color
    };

    // --- Configurations ---
    const isIphone = model.includes('iPhone');
    const isUltra = model.includes('Ultra');
    const isPixel = model.includes('Pixel');

    // 1. iPhone 15/16 Pro Style
    if (isIphone) {
        return (
            <div
                className="relative bg-black box-border hover:scale-[1.01] transition-transform duration-500 ease-out"
                style={{
                    ...baseStyle,
                    borderRadius: `${width * 0.14}px`, // ~42px for 300w
                    border: `${width * 0.025}px solid #363638`, // Titanium Grey Border
                    boxShadow: `
                        inset 0 0 0 2px #5f5f61, 
                        0 30px 60px -12px rgba(0, 0, 0, 0.4)
                    `
                }}
            >
                {/* Screen Content Wrapper */}
                <div
                    className="w-full h-full overflow-hidden bg-black relative"
                    style={{ borderRadius: `${width * 0.11}px` }} // Slightly less than outer
                >
                    {children}
                </div>

                {/* Dynamic Island */}
                <div
                    className="absolute z-20 top-[3%] left-1/2 -translate-x-1/2 bg-black rounded-full flex items-center justify-between px-3"
                    style={{
                        width: '30%',
                        height: '3.5%',
                        boxShadow: '0 0 2px rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Camera Lens simulation */}
                    <div className="size-[40%] rounded-full bg-[#1a1a1a] shadow-inner ml-auto"></div>
                </div>

                {/* Reflection/Active Shine */}
                <div className="absolute inset-0 rounded-[inherit] pointer-events-none border border-white/10 z-30"></div>
            </div>
        );
    }

    // 2. Galaxy S24 Ultra Style (Sharp Corners)
    if (isUltra) {
        return (
            <div
                className="relative bg-black box-border"
                style={{
                    ...baseStyle,
                    borderRadius: `${width * 0.02}px`, // ~6px for 300w (Very sharp)
                    border: `${width * 0.01}px solid #1c1c1c`, // Thin distinct bezel
                    borderTop: `${width * 0.015}px solid #1c1c1c`,
                    borderBottom: `${width * 0.015}px solid #1c1c1c`,
                }}
            >
                <div className="w-full h-full overflow-hidden bg-black relative rounded-[2px]">
                    {children}
                </div>

                {/* Punch Hole Camera */}
                <div
                    className="absolute z-20 top-[2%] left-1/2 -translate-x-1/2 bg-black rounded-full"
                    style={{
                        width: '3.5%',
                        aspectRatio: '1/1',
                        border: '1px solid #222'
                    }}
                >
                    <div className="w-[40%] h-[40%] bg-[#101010] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
                </div>
            </div>
        );
    }

    // 3. Pixel 9 Pro (Very rounded but symmetrical)
    if (isPixel) {
        return (
            <div
                className="relative bg-black box-border"
                style={{
                    ...baseStyle,
                    borderRadius: `${width * 0.1}px`, // ~30px for 300w
                    border: `${width * 0.03}px solid #e3e3e3`, // Polished Aluminum
                    boxShadow: `
                        inset 0 0 0 1px #999,
                        0 30px 60px -12px rgba(0, 0, 0, 0.4)
                    `
                }}
            >
                <div
                    className="w-full h-full overflow-hidden bg-black relative"
                    style={{ borderRadius: `${width * 0.07}px` }}
                >
                    {children}
                </div>

                {/* Punch Hole Camera */}
                <div
                    className="absolute z-20 top-[3%] left-1/2 -translate-x-1/2 bg-black rounded-full"
                    style={{
                        width: '3.5%',
                        aspectRatio: '1/1',
                    }}
                >
                    <div className="w-[50%] h-[50%] bg-[#0a0a0a] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
        );
    }

    // Fallback Generic Modern
    return (
        <div
            className="relative bg-black box-border"
            style={{
                ...baseStyle,
                borderRadius: `${width * 0.08}px`,
                border: `${width * 0.02}px solid #222`,
            }}
        >
            <div className="w-full h-full overflow-hidden bg-black relative rounded-lg">
                {children}
            </div>
        </div>
    );
};

export default ModernDevice;
