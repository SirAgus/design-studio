'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DeviceFrameset } from 'react-device-frameset'; // 1. Import DeviceFrameset
import 'react-device-frameset/styles/marvel-devices.min.css'; // Import styles for DeviceFrameset
import ModernDevice from './ModernDevice';
import HeroTemplate from './templates/HeroTemplate';
import GlobalTemplate from './templates/GlobalTemplate';
import SavingsTemplate from './templates/SavingsTemplate';
import AnalyticsTemplate from './templates/AnalyticsTemplate';
import BlankTemplate from './templates/BlankTemplate';
import CanvasElement from './CanvasElement';
import html2canvas from 'html2canvas';

// Google Fonts
if (typeof document !== 'undefined') {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Outfit:wght@400;600;800&family=Montserrat:wght@400;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

type TemplateId = 'Hero' | 'Global' | 'Savings' | 'Analytics' | 'CTA' | 'Blank';
type Tab = 'components' | 'code';
type DeviceModel =
    // Modern 2024-2026
    | 'iPhone 16 Pro'
    | 'iPhone 15 Pro'
    | 'Galaxy S24 Ultra'
    | 'Pixel 9 Pro'
    // Legacy (via library)
    | 'iPhone X'
    | 'iPhone 8'
    | 'iPhone 8 Plus'
    | 'iPhone 5s'
    | 'iPhone 5c'
    | 'iPhone 4s'
    | 'Galaxy Note 8'
    | 'Nexus 5'
    | 'Lumia 920'
    | 'Samsung Galaxy S5'
    | 'HTC One'
    | 'iPad Mini'
    | 'MacBook Pro';

type BackgroundConfig = {
    type: 'solid' | 'gradient' | 'grid' | 'pattern';
    value: string; // solid: hex, gradient: 'hex1,hex2', grid: hex, pattern: 'ThemeName'
    opacity?: number;
};

type CustomElement = {
    id: string;
    type: 'phone' | 'bubble' | 'stat' | 'text' | 'sticker' | 'icon' | 'graphics' | 'group' | 'message-stack' | 'avatar-group' | 'grid-menu' | 'chart' | 'progress-circle';
    x: number;
    y: number;
    scale: number;
    rotation: number;
    props: {
        image?: string;
        model?: DeviceModel | string;
        color?: string;
        bgColor?: string;
        bgOpacity?: number;
        textColor?: string;
        iconColor?: string;
        text?: string;
        label?: string;
        icon?: string;
        showIcon?: boolean;
        shadow?: boolean;
        font?: string;
        variant?: string;
        children?: CustomElement[];
        parentId?: string;
    };
};

const COMMON_ICONS = [
    'home', 'person', 'settings', 'favorite', 'notifications', 'search', 'mail', 'send',
    'check_circle', 'cancel', 'info', 'help', 'arrow_back', 'arrow_forward', 'menu', 'more_vert',
    'star', 'cloud', 'bolt', 'local_fire_department', 'rocket_launch', 'auto_awesome', 'palette', 'image',
    'add', 'remove', 'close', 'edit', 'delete', 'share', 'download', 'upload',
    'play_arrow', 'pause', 'stop', 'volume_up', 'mic', 'videocam', 'camera_alt', 'explore',
    'shopping_cart', 'credit_card', 'payments', 'account_balance', 'trending_up', 'analytics', 'dashboard', 'public',
    'wallet', 'receipt_long', 'savings', 'account_balance_wallet', 'monetization_on', 'paid', 'euro', 'attach_money',
    'qr_code_2', 'contactless', 'shield', 'lock', 'key', 'fingerprint', 'face', 'visibility',
    'light_mode', 'dark_mode', 'contrast', 'water_drop', 'eco', 'pet_supplies', 'restaurant', 'directions_car'
];

type ProjectVersion = {
    id: string;
    name: string;
    timestamp: string;
    data: {
        activeTemplate: TemplateId | null;
        customElements: CustomElement[];
        backgroundConfig: BackgroundConfig;
    };
};

type SavedProject = {
    id: string;
    name: string;
    createdAt: string;
    versions: ProjectVersion[]; // HEAD is versions[0]
};

const STORAGE_KEY = 'design-studio-v2-state';

const Studio = () => {
    const [activeTemplate, setActiveTemplate] = useState<TemplateId | null>(null);
    const [backgroundConfig, setBackgroundConfig] = useState<BackgroundConfig>({ type: 'grid', value: '#16181d', opacity: 0.1 });
    const [isExporting, setIsExporting] = useState(false);
    const [customElements, setCustomElements] = useState<CustomElement[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // New: Saved Projects System
    const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
    const [sidebarTab, setSidebarTab] = useState<'templates' | 'projects'>('templates');
    const [iconSearch, setIconSearch] = useState('');
    const PROJECTS_KEY = 'design-studio-projects';

    // File Input Ref for Phone Image
    const fileInputRef = useRef<HTMLInputElement>(null);
    const projectInputRef = useRef<HTMLInputElement>(null); // Ref for loading project

    // Persistence: Load
    useEffect(() => {
        // Load Current State
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.activeTemplate) setActiveTemplate(parsed.activeTemplate);
                if (parsed.customElements) setCustomElements(parsed.customElements);
                if (parsed.backgroundConfig) setBackgroundConfig(parsed.backgroundConfig);
            } catch (e) {
                console.error("Failed to load state", e);
            }
        }

        // Load Saved Projects
        const projects = localStorage.getItem(PROJECTS_KEY);
        if (projects) {
            try {
                setSavedProjects(JSON.parse(projects));
            } catch (e) { console.error(e); }
        }

        setIsLoaded(true);
    }, []);

    // Persistence: Save
    useEffect(() => {
        if (!isLoaded) return;
        const state = {
            activeTemplate,
            customElements,
            backgroundConfig
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [activeTemplate, customElements, backgroundConfig, isLoaded]);

    // Layer Management
    const moveToFront = (id: string) => {
        setCustomElements(prev => {
            const index = prev.findIndex(el => el.id === id);
            if (index === -1) return prev;
            const newArr = [...prev];
            const [item] = newArr.splice(index, 1);
            newArr.push(item);
            return newArr;
        });
    };

    const moveToBack = (id: string) => {
        setCustomElements(prev => {
            const index = prev.findIndex(el => el.id === id);
            if (index === -1) return prev;
            const newArr = [...prev];
            const [item] = newArr.splice(index, 1);
            newArr.unshift(item);
            return newArr;
        });
    };

    // System Save/Load
    const saveToLibrary = () => {
        // If working on existing project, add new version (Commit)
        if (currentProjectId) {
            const projectIndex = savedProjects.findIndex(p => p.id === currentProjectId);
            if (projectIndex !== -1) {
                const message = prompt("Describe your changes (Commit Message):", `Update ${new Date().toLocaleTimeString()}`);
                if (!message) return;

                const newVersion: ProjectVersion = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: message,
                    timestamp: new Date().toISOString(),
                    data: { activeTemplate, customElements, backgroundConfig }
                };

                const updatedProjects = [...savedProjects];
                updatedProjects[projectIndex].versions.unshift(newVersion); // Add to top (HEAD)

                setSavedProjects(updatedProjects);
                localStorage.setItem(PROJECTS_KEY, JSON.stringify(updatedProjects));
                alert(`Saved version: "${message}"`);
                return;
            }
        }

        // Create New Project
        const name = prompt("Name your new project:", `Project ${savedProjects.length + 1}`);
        if (!name) return;

        const initialVersion: ProjectVersion = {
            id: Math.random().toString(36).substr(2, 9),
            name: 'Initial Commit',
            timestamp: new Date().toISOString(),
            data: { activeTemplate, customElements, backgroundConfig }
        };

        const newProject: SavedProject = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            createdAt: new Date().toISOString(),
            versions: [initialVersion]
        };

        const updated = [newProject, ...savedProjects];
        setSavedProjects(updated);
        setCurrentProjectId(newProject.id); // Set active
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
        alert('Project Created & Saved to Library!');
    };

    const loadVersion = (project: SavedProject, version: ProjectVersion) => {
        if (confirm(`Load "${project.name} - ${version.name}"? Unsaved changes will be lost.`)) {
            setActiveTemplate(version.data.activeTemplate);
            setCustomElements(version.data.customElements);
            setBackgroundConfig(version.data.backgroundConfig);
            setCurrentProjectId(project.id);
            // alert(`Loaded: ${version.name}`);
        }
    };

    const deleteProject = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Delete this project?")) {
            const updated = savedProjects.filter(p => p.id !== id);
            setSavedProjects(updated);
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
            if (currentProjectId === id) setCurrentProjectId(null);
        }
    };

    // Project Saving/Loading
    const handleSaveProject = () => {
        const projectState = {
            version: '2.0',
            timestamp: new Date().toISOString(),
            activeTemplate,
            customElements,
            backgroundConfig
        };
        const blob = new Blob([JSON.stringify(projectState, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `design-project-${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleLoadProject = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const result = ev.target?.result as string;
                const parsed = JSON.parse(result);

                // Basic validation
                if (parsed.customElements && Array.isArray(parsed.customElements)) {
                    setCustomElements(parsed.customElements);
                    if (parsed.activeTemplate) setActiveTemplate(parsed.activeTemplate);
                    if (parsed.backgroundConfig) setBackgroundConfig(parsed.backgroundConfig);
                    alert('Project loaded successfully!');
                } else {
                    alert('Invalid project file.');
                }
            } catch (err) {
                console.error('Failed to parse project file', err);
                alert('Failed to load project.');
            }
        };
        reader.readAsText(file);
        // Reset input
        if (projectInputRef.current) projectInputRef.current.value = '';
    };

    const handleDownload = async () => {
        const element = document.getElementById('capture-target');
        if (!element) return;

        // Deselect everything for capture
        setSelectedIds([]);

        setIsExporting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for render and selection UI to hide

            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                allowTaint: false,
                backgroundColor: null,
                logging: true,
                width: element.scrollWidth,
                height: element.scrollHeight,
                x: 0,
                y: 0,
                scrollX: 0,
                scrollY: 0,
                windowWidth: document.documentElement.offsetWidth,
                windowHeight: document.documentElement.offsetHeight,
                onclone: (doc) => {
                    const el = doc.getElementById('capture-target');
                    if (el) {
                        el.style.transform = 'none';
                        el.style.boxShadow = 'none';
                        el.style.filter = 'none';
                        el.style.margin = '0';
                        el.style.padding = '0';
                        el.style.left = '0';
                        el.style.top = '0';
                    }

                    // Robust nested paren regex for complex CSS functions
                    const nestedRegex = (fn: string) => new RegExp(`${fn}\\s*\\((?:[^)(]|\\((?:[^)(]|\\([^)(]*\\))*\\))*\\)`, 'gi');

                    const nuclearSanitize = (text: string) => {
                        if (!text) return text;
                        return text
                            .replace(nestedRegex('oklch'), '#ffffff')
                            .replace(nestedRegex('oklab'), '#ffffff')
                            .replace(nestedRegex('color-mix'), '#333333')
                            .replace(nestedRegex('light-dark'), '#ffffff')
                            .replace(nestedRegex('lab'), '#ffffff')
                            .replace(nestedRegex('lch'), '#ffffff')
                            .replace(nestedRegex('hwb'), '#ffffff');
                    };

                    // 1. Sanitize all style tags
                    const styles = doc.getElementsByTagName('style');
                    for (let i = 0; i < styles.length; i++) {
                        try {
                            if (styles[i].innerHTML) {
                                styles[i].innerHTML = nuclearSanitize(styles[i].innerHTML);
                            }
                        } catch (e) { }
                    }

                    // 2. Sanitize all inline styles and SVG attributes
                    const all = doc.getElementsByTagName('*');
                    for (let i = 0; i < all.length; i++) {
                        const node = all[i] as HTMLElement;
                        try {
                            if (node.style && node.style.cssText) {
                                node.style.cssText = nuclearSanitize(node.style.cssText);
                            }
                            ['fill', 'stroke', 'style'].forEach(attr => {
                                if (node.hasAttribute(attr)) {
                                    node.setAttribute(attr, nuclearSanitize(node.getAttribute(attr) || ''));
                                }
                            });
                        } catch (e) { }
                    }

                    // 3. DO NOT remove links, instead inject a global override for oklab variables
                    // that often crash html2canvas when parsed from the stylesheet context
                    const override = doc.createElement('style');
                    override.innerHTML = `
                        * { 
                            --tw-ring-color: transparent !important;
                            --tw-shadow-color: transparent !important;
                            --tw-outline-color: transparent !important;
                            --tw-ring-offset-color: transparent !important;
                        }
                    `;
                    doc.head.appendChild(override);
                }
            });

            const link = document.createElement('a');
            link.download = `${activeTemplate || 'design'}-${new Date().getTime()}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        } catch (err: any) {
            console.error('Export failed:', err);
            alert(`Failed to export image: ${err.message || 'Check console for details'}. Please try again.`);
        } finally {
            setIsExporting(false);
        }
    };

    const addElement = (type: CustomElement['type']) => {
        const newId = Math.random().toString(36).substr(2, 9);
        const offset = customElements.length * 20;

        let defaultProps: CustomElement['props'] = {
            color: '#0bc9da',
            bgColor: '#0bc9da',
            textColor: '#ffffff',
            iconColor: '#ffffff',
            showIcon: true
        };

        if (type === 'phone') defaultProps = { ...defaultProps, model: 'iPhone 16 Pro', image: '' };
        if (type === 'bubble') defaultProps = { ...defaultProps, text: 'New Alert', label: 'Touch to modify', bgColor: '#0bc9da', bgOpacity: 0.2, iconColor: '#ffffff', variant: 'glass' };
        if (type === 'message-stack') defaultProps = { ...defaultProps, text: 'You have new messages', bgColor: '#0bc9da', bgOpacity: 0.2, variant: 'glass' };
        if (type === 'avatar-group') defaultProps = { ...defaultProps, color: '#0bc9da' };
        if (type === 'grid-menu') defaultProps = { ...defaultProps, bgColor: '#161920', bgOpacity: 0.8 };
        if (type === 'chart') defaultProps = { ...defaultProps, bgColor: '#161920', bgOpacity: 0.8, color: '#0bc9da' };
        if (type === 'progress-circle') defaultProps = { ...defaultProps, text: '85%', label: 'Savings Goal', color: '#0bc9da' };
        if (type === 'stat') defaultProps = { ...defaultProps, text: '$500', label: 'Revenue', bgColor: '#161920', bgOpacity: 0.8, color: '#0bc9da' };
        if (type === 'text') defaultProps = { ...defaultProps, text: 'Headline', label: 'Design Studio', variant: 'solid', textColor: '#ffffff' };
        if (type === 'sticker') defaultProps = { ...defaultProps, text: 'NEW', bgColor: '#0bc9da', bgOpacity: 1.0 };
        if (type === 'icon') defaultProps = { ...defaultProps, text: 'star', iconColor: '#ffffff' };
        if (type === 'graphics') defaultProps = { ...defaultProps, text: '' };

        setCustomElements([...customElements, {
            id: newId,
            type,
            x: 500 + offset,
            y: 350 + offset,
            scale: 1,
            rotation: 0,
            props: defaultProps
        }]);
        setSelectedIds([newId]);
    };

    const groupSelected = () => {
        if (selectedIds.length < 2) return;
        const newGroupId = `group-${Math.random().toString(36).substr(2, 9)}`;
        setCustomElements(prev => prev.map(el => {
            if (selectedIds.includes(el.id)) {
                return { ...el, props: { ...el.props, parentId: newGroupId } };
            }
            return el;
        }));
    };

    const ungroupSelected = () => {
        const parentIds = [...new Set(
            customElements
                .filter(el => selectedIds.includes(el.id) && el.props.parentId)
                .map(el => el.props.parentId)
        )];

        setCustomElements(prev => prev.map(el => {
            if (el.props.parentId && parentIds.includes(el.props.parentId)) {
                return { ...el, props: { ...el.props, parentId: undefined } };
            }
            return el;
        }));
    };

    const updateElement = (id: string, updates: Partial<CustomElement> | { props: Partial<CustomElement['props']> }) => {
        setCustomElements(prev => prev.map(el => {
            if (el.id !== id) return el;

            // Handle specialized Props update vs top-level fields
            if ('props' in updates && updates.props) {
                return { ...el, props: { ...el.props, ...updates.props } };
            }
            return { ...el, ...updates };
        }));
    };

    const updateMultipleElements = (ids: string[], updates: Partial<CustomElement> | { props: Partial<CustomElement['props']> }) => {
        setCustomElements(prev => prev.map(el => {
            if (!ids.includes(el.id)) return el;

            if ('props' in updates && updates.props) {
                return { ...el, props: { ...el.props, ...updates.props } };
            }
            return { ...el, ...updates };
        }));
    };

    const removeSelectedElements = () => {
        setCustomElements(prev => prev.filter(el => !selectedIds.includes(el.id)));
        setSelectedIds([]);
    };

    const toggleSelection = (id: string, e?: React.MouseEvent | React.PointerEvent) => {
        const el = customElements.find(i => i.id === id);
        const parentId = el?.props.parentId;

        const groupIds = parentId
            ? customElements.filter(i => i.props.parentId === parentId).map(i => i.id)
            : [id];

        if (e?.shiftKey) {
            setSelectedIds(prev => {
                const isAllSelected = groupIds.every(gi => prev.includes(gi));
                if (isAllSelected) {
                    return prev.filter(i => !groupIds.includes(i));
                } else {
                    return [...new Set([...prev, ...groupIds])];
                }
            });
        } else {
            setSelectedIds(groupIds);
        }
    };

    const moveElements = (dx: number, dy: number) => {
        setCustomElements(prev => prev.map(el => {
            if (selectedIds.includes(el.id)) {
                return { ...el, x: el.x + dx, y: el.y + dy };
            }
            return el;
        }));
    };

    const removeElement = (id: string) => {
        setCustomElements(customElements.filter(el => el.id !== id));
        setSelectedIds(prev => prev.filter(i => i !== id));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedIds.length > 0 && e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const res = ev.target?.result;
                if (res) {
                    selectedIds.forEach(id => updateElement(id, { props: { image: res as string } }));
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const renderActiveTemplate = () => {
        switch (activeTemplate) {
            case 'Hero': return <HeroTemplate />;
            case 'Global': return <GlobalTemplate />;
            case 'Savings': return <SavingsTemplate />;
            case 'Analytics': return <AnalyticsTemplate />;
            case 'Blank': return <BlankTemplate />;
            case 'CTA': return <div className="text-white p-10 flex items-center justify-center h-full">CTA Template Coming Soon</div>;
            default: return null;
        }
    };

    // Render Overlay Elements
    if (!isLoaded) return null;

    const renderCustomElements = () => {
        // Font Styles Injection
        const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Roboto+Mono:wght@400;700&family=Space+Grotesk:wght@400;700&family=Syne:wght@400;700;800&family=Outfit:wght@300;400;700;900&family=Montserrat:wght@400;700;900&display=swap');`;

        return (
            <>
                <style>{fontImport}</style>
                {customElements.map(el => {
                    const model = el.props.model || 'iPhone 16 Pro';
                    const modernModels: DeviceModel[] = ['iPhone 16 Pro', 'iPhone 15 Pro', 'Galaxy S24 Ultra', 'Pixel 9 Pro'];
                    const isModern = modernModels.includes(model as DeviceModel);

                    // Font Mapper
                    const fontFamily = el.props.font === 'Serif' ? '"Playfair Display", serif' :
                        el.props.font === 'Mono' ? '"Roboto Mono", monospace' :
                            el.props.font === 'Grotesk' ? '"Space Grotesk", sans-serif' :
                                el.props.font === 'Syne' ? '"Syne", sans-serif' :
                                    el.props.font === 'Outfit' ? '"Outfit", sans-serif' :
                                        el.props.font === 'Montserrat' ? '"Montserrat", sans-serif' :
                                            'Inter, sans-serif'; // Default

                    const screenContent = el.props.image ? (
                        <img
                            src={el.props.image}
                            alt="Screen"
                            className="w-full h-full object-cover select-none"
                            draggable={false}
                            onDragStart={(e) => e.preventDefault()}
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center relative">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                            <span className="material-symbols-outlined text-4xl text-white/40">add_photo_alternate</span>
                            <p className="text-[10px] text-white/40 mt-2 font-bold uppercase tracking-widest text-center">No Image</p>
                        </div>
                    );

                    return (
                        <CanvasElement
                            key={el.id}
                            id={el.id}
                            type={el.type}
                            data={{ x: el.x, y: el.y, scale: el.scale, rotation: el.rotation || 0 }}
                            isSelected={selectedIds.includes(el.id)}
                            onSelect={toggleSelection}
                            onDragSelected={moveElements}
                            onUpdate={(id, updates) => {
                                if (selectedIds.includes(id) && selectedIds.length > 1) {
                                    updateMultipleElements(selectedIds, updates);
                                } else {
                                    updateElement(id, updates);
                                }
                            }}
                            onDelete={removeElement}
                        >
                            {el.type === 'phone' && (
                                <div className="relative pointer-events-none flex items-center justify-center">
                                    {isModern ? (
                                        <ModernDevice model={model as (typeof modernModels)[number]} width={300}>
                                            {screenContent}
                                        </ModernDevice>
                                    ) : (
                                        <DeviceFrameset
                                            device={(() => {
                                                const m = el.props.model as any;
                                                // Valid keys in react-device-frameset 1.3.4
                                                const validKeys = [
                                                    'iPhone X', 'iPhone 8', 'iPhone 8 Plus', 'iPhone 5s', 'iPhone 5c', 'iPhone 4s',
                                                    'Galaxy Note 8', 'Nexus 5', 'Lumia 920', 'Samsung Galaxy S5', 'HTC One',
                                                    'iPad Mini', 'MacBook Pro'
                                                ];

                                                // Direct match
                                                if (validKeys.includes(m)) return m;

                                                // Legacy/Fuzzy Mapping
                                                if (m === 'Note 8') return 'Galaxy Note 8';
                                                // Default
                                                return 'iPhone X';
                                            })()}
                                            color="black"
                                            width={300} // Increased base width for better initial visibility
                                        >
                                            {screenContent}
                                        </DeviceFrameset>
                                    )}
                                </div>
                            )}

                            {el.type === 'bubble' && (
                                <div
                                    className={`flex items-center gap-3 p-4 backdrop-blur-xl rounded-2xl shadow-xl min-w-[200px] border border-white/10 ${el.props.variant === 'solid' ? 'shadow-black/20' : ''} ${el.props.variant === 'glass' ? 'backdrop-blur-2xl' : ''}`}
                                    style={{
                                        backgroundColor: el.props.bgColor ? (el.props.bgColor + Math.round((el.props.bgOpacity ?? 1) * 255).toString(16).padStart(2, '0')) : (el.props.variant === 'solid' ? (el.props.color || 'white') : (el.props.color ? `${el.props.color}33` : 'rgba(255,255,255,0.1)')),
                                        fontFamily,
                                        color: el.props.textColor || (el.props.variant === 'solid' ? 'black' : 'white')
                                    }}
                                >
                                    {(el.props.showIcon !== false) && (
                                        <div className="size-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: el.props.iconColor ? `${el.props.iconColor}22` : 'rgba(255,255,255,0.1)', color: el.props.iconColor || el.props.color || '#0bc9da' }}>
                                            <span className="material-symbols-outlined">{el.props.icon || 'notifications'}</span>
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <p
                                            contentEditable
                                            suppressContentEditableWarning
                                            className="font-bold text-sm outline-none cursor-text select-text relative z-[50] pointer-events-auto min-w-[50px] mb-0.5"
                                            style={{ color: el.props.textColor || (el.props.variant === 'solid' ? 'black' : 'white') }}
                                            onPointerDown={(e) => {
                                                if (!selectedIds.includes(el.id)) return;
                                                e.stopPropagation();
                                                const target = e.currentTarget;
                                                setTimeout(() => target.focus(), 10);
                                            }}
                                            onFocus={(e) => {
                                                const range = document.createRange();
                                                const sel = window.getSelection();
                                                range.selectNodeContents(e.currentTarget);
                                                sel?.removeAllRanges();
                                                sel?.addRange(range);
                                            }}
                                            onBlur={(e) => updateElement(el.id, { props: { text: e.currentTarget.innerText } })}
                                        >
                                            {el.props.text || 'New Alert'}
                                        </p>
                                        <p
                                            contentEditable
                                            suppressContentEditableWarning
                                            className="text-[9px] font-black uppercase tracking-tighter opacity-40 outline-none cursor-text select-text pointer-events-auto"
                                            onPointerDown={(e) => {
                                                if (!selectedIds.includes(el.id)) return;
                                                e.stopPropagation();
                                                const target = e.currentTarget;
                                                setTimeout(() => target.focus(), 10);
                                            }}
                                            onFocus={(e) => {
                                                const range = document.createRange();
                                                const sel = window.getSelection();
                                                range.selectNodeContents(e.currentTarget);
                                                sel?.removeAllRanges();
                                                sel?.addRange(range);
                                            }}
                                            onBlur={(e) => updateElement(el.id, { props: { label: e.currentTarget.innerText } })}
                                        >
                                            {el.props.label || 'Touch to modify'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {el.type === 'message-stack' && (
                                <div className="relative w-[240px] h-[80px]" onPointerDown={(e) => { if (selectedIds.includes(el.id)) e.stopPropagation(); }}>
                                    <div className="absolute top-4 left-4 w-full h-full bg-white/5 rounded-2xl border border-white/5 translate-y-4"></div>
                                    <div className="absolute top-2 left-2 w-full h-full bg-white/10 rounded-2xl border border-white/10 translate-y-2"></div>
                                    <div
                                        className="absolute inset-0 flex items-center gap-3 p-4 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10"
                                        style={{
                                            backgroundColor: el.props.bgColor ? (el.props.bgColor + Math.round((el.props.bgOpacity ?? 0.2) * 255).toString(16).padStart(2, '0')) : 'rgba(255,255,255,0.1)',
                                            color: el.props.textColor || 'white'
                                        }}
                                    >
                                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center pointer-events-none">
                                            <span className="material-symbols-outlined text-primary">mail</span>
                                        </div>
                                        <div className="flex-1">
                                            <p
                                                contentEditable suppressContentEditableWarning
                                                className="font-bold text-sm outline-none select-text cursor-text pointer-events-auto"
                                                onPointerDown={(e) => {
                                                    if (!selectedIds.includes(el.id)) return;
                                                    e.stopPropagation();
                                                    const target = e.currentTarget;
                                                    setTimeout(() => target.focus(), 10);
                                                }}
                                                onFocus={(e) => {
                                                    const range = document.createRange();
                                                    const sel = window.getSelection();
                                                    range.selectNodeContents(e.currentTarget);
                                                    sel?.removeAllRanges();
                                                    sel?.addRange(range);
                                                }}
                                                onBlur={(e) => updateElement(el.id, { props: { text: e.currentTarget.innerText } })}
                                            >
                                                {el.props.text || 'Notification Title'}
                                            </p>
                                            <p className="text-[10px] opacity-50 pointer-events-none">2 minutes ago</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {el.type === 'chart' && (
                                <div
                                    className="p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl min-w-[240px]"
                                    style={{ backgroundColor: el.props.bgColor ? (el.props.bgColor + Math.round((el.props.bgOpacity ?? 0.8) * 255).toString(16).padStart(2, '0')) : 'rgba(22,25,32,0.8)' }}
                                >
                                    <div className="flex items-end gap-2 h-24">
                                        {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 rounded-t-lg transition-all duration-500"
                                                style={{ height: `${h}%`, backgroundColor: i === 3 ? (el.props.color || '#0bc9da') : 'rgba(255,255,255,0.1)' }}
                                            ></div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Weekly Analysis</span>
                                        <span className="text-sm font-black text-primary">+24%</span>
                                    </div>
                                </div>
                            )}

                            {el.type === 'progress-circle' && (
                                <div className="relative size-32 flex items-center justify-center">
                                    <svg className="size-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                                        <circle
                                            cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent"
                                            strokeDasharray={364} strokeDashoffset={364 * (1 - 0.85)}
                                            className="text-primary transition-all duration-1000"
                                            style={{ color: el.props.color || '#0bc9da' }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <span
                                            contentEditable suppressContentEditableWarning
                                            className="text-2xl font-black outline-none select-text cursor-text pointer-events-auto"
                                            onPointerDown={(e) => {
                                                if (!selectedIds.includes(el.id)) return;
                                                e.stopPropagation();
                                                const target = e.currentTarget;
                                                setTimeout(() => target.focus(), 10);
                                            }}
                                            onFocus={(e) => {
                                                const range = document.createRange();
                                                const sel = window.getSelection();
                                                range.selectNodeContents(e.currentTarget);
                                                sel?.removeAllRanges();
                                                sel?.addRange(range);
                                            }}
                                            onBlur={(e) => updateElement(el.id, { props: { text: e.currentTarget.innerText } })}
                                        >
                                            {el.props.text || '85%'}
                                        </span>
                                        <span className="text-[8px] font-bold uppercase opacity-50 max-w-[60px] leading-tight">{el.props.label || 'Goal'}</span>
                                    </div>
                                </div>
                            )}

                            {el.type === 'avatar-group' && (
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="size-12 rounded-full border-4 border-[#0f0f0f] bg-surface-dark overflow-hidden flex items-center justify-center shadow-lg hover:z-10 transition-all cursor-pointer">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + (el.id)}`} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="size-12 rounded-full border-4 border-[#0f0f0f] bg-primary flex items-center justify-center text-black font-black text-xs shadow-lg">+12</div>
                                </div>
                            )}

                            {el.type === 'grid-menu' && (
                                <div
                                    className="p-4 rounded-3xl grid grid-cols-3 gap-4 border border-white/5 shadow-2xl backdrop-blur-xl"
                                    style={{ backgroundColor: el.props.bgColor ? (el.props.bgColor + Math.round((el.props.bgOpacity ?? 0.8) * 255).toString(16).padStart(2, '0')) : 'rgba(22,25,32,0.8)' }}
                                >
                                    {['Home', 'Profile', 'Wallet', 'Settings', 'Stats', 'Lock'].map((ico) => (
                                        <div key={ico} className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/[0.03] hover:bg-primary transition-all group/it border border-white/5 aspect-square">
                                            <span className="material-symbols-outlined !text-[20px] group-hover/it:text-black mb-1">
                                                {ico === 'Stats' ? 'bar_chart' :
                                                    ico === 'Profile' ? 'person' :
                                                        ico === 'Wallet' ? 'account_balance_wallet' :
                                                            ico === 'Lock' ? 'lock' :
                                                                ico === 'Settings' ? 'settings' : 'home'}
                                            </span>
                                            <span className="block text-center leading-none tracking-tighter group-hover/it:text-black/80 font-black uppercase" style={{ fontSize: '6px' }}>{ico}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {el.type === 'stat' && (
                                <div
                                    className={`
                                 p-4 border shadow-lg min-w-[140px] text-center
                                 ${el.props.variant === 'minimal' ? 'bg-transparent border-none' : 'rounded-xl backdrop-blur-lg'}
                                 ${el.props.variant === 'pill' ? 'rounded-full px-6 flex items-center gap-3' : ''}
                             `}
                                    style={{
                                        backgroundColor: el.props.bgColor ? (el.props.bgColor + Math.round((el.props.bgOpacity ?? 0.8) * 255).toString(16).padStart(2, '0')) : (el.props.variant === 'minimal' ? 'transparent' : 'rgba(22, 25, 32, 0.8)'),
                                        borderColor: el.props.variant === 'minimal' ? 'transparent' : (el.props.color || '#2d333d'),
                                        fontFamily
                                    }}
                                >
                                    {el.props.showIcon && (
                                        <span className="material-symbols-outlined mb-1 block" style={{ color: el.props.iconColor || el.props.color }}>{el.props.icon || 'trending_up'}</span>
                                    )}
                                    <p className="text-xs font-bold uppercase tracking-wider opacity-50" style={{ color: el.props.textColor || 'white' }}>{el.props.label || 'Label'}</p>
                                    <p
                                        contentEditable
                                        suppressContentEditableWarning
                                        className="text-2xl font-black outline-none mt-1 select-text cursor-text pointer-events-auto relative z-10"
                                        style={{ color: el.props.textColor || el.props.color || '#ffffff' }}
                                        onPointerDown={(e) => {
                                            if (!selectedIds.includes(el.id)) return;
                                            e.stopPropagation();
                                            const target = e.currentTarget;
                                            setTimeout(() => target.focus(), 10);
                                        }}
                                        onFocus={(e) => {
                                            const range = document.createRange();
                                            const sel = window.getSelection();
                                            range.selectNodeContents(e.currentTarget);
                                            sel?.removeAllRanges();
                                            sel?.addRange(range);
                                        }}
                                        onBlur={(e) => updateElement(el.id, { props: { text: e.currentTarget.innerText } })}
                                    >
                                        {el.props.text || '$42.5k'}
                                    </p>
                                </div>
                            )}

                            {el.type === 'text' && (
                                <motion.div
                                    animate={el.props.variant === 'animated' ? {
                                        y: [0, -10, 0],
                                        rotate: [0, 1, -1, 0]
                                    } : {}}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className={`
                                        flex flex-col items-center justify-center transition-all duration-300
                                        ${el.props.variant === 'glass' ? 'p-10 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-[40px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent' : ''}
                                        ${el.props.variant === 'solid' || !el.props.variant || el.props.variant === 'default' ? 'p-10 bg-[#111317] border border-white/5 rounded-[40px] shadow-2xl overflow-hidden' : ''}
                                        ${el.props.variant === '3d' ? 'p-10 bg-[#1a1c21] rounded-[40px] border-b-[12px] border-black/40 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.7)] border-x-2 border-t-2 border-white/5' : ''}
                                        ${el.props.variant === 'outline' ? 'p-10 border-2 border-current rounded-[40px] border-dashed opacity-80' : ''}
                                        ${el.props.variant === 'neon' ? 'relative after:absolute after:inset-0 after:bg-primary/20 after:blur-[100px] after:-z-10' : ''}
                                        ${el.props.variant === 'none' ? 'bg-transparent border-none p-0' : ''}
                                    `}
                                    style={{
                                        backgroundColor: (el.props.variant === 'glass' || el.props.variant === 'solid' || el.props.variant === '3d' || !el.props.variant || el.props.variant === 'default') ? (el.props.bgColor ? (el.props.bgColor + Math.round((el.props.bgOpacity ?? 0.8) * 255).toString(16).padStart(2, '0')) : (el.props.variant === 'default' || !el.props.variant) ? 'rgba(255,255,255,0.05)' : undefined) : 'transparent',
                                        minWidth: (el.props.variant === 'glass' || el.props.variant === 'solid' || el.props.variant === '3d' || !el.props.variant || el.props.variant === 'default') ? '280px' : 'none',
                                        color: el.props.variant === 'outline' ? (el.props.textColor || el.props.color || '#ffffff') : undefined
                                    }}
                                >
                                    <h2
                                        contentEditable
                                        suppressContentEditableWarning
                                        className={`
                                            font-black outline-none cursor-text select-text pointer-events-auto text-center relative z-10
                                            ${el.props.variant === 'heading' ? 'text-7xl tracking-tighter leading-[0.9]' : ''}
                                            ${el.props.variant === 'caption' ? 'text-xl font-medium tracking-[0.3em] uppercase opacity-70' : ''}
                                            ${!el.props.variant || el.props.variant === 'default' ? 'text-5xl tracking-tight' : ''}
                                            ${el.props.variant === 'neon' ? 'text-6xl drop-shadow-[0_0_25px_rgba(23,161,207,1)]' : ''}
                                            ${el.props.variant === '3d' ? 'text-6xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]' : ''}
                                        `}
                                        style={{
                                            color: el.props.textColor || el.props.color || '#ffffff',
                                            fontFamily,
                                            userSelect: 'text',
                                            WebkitUserSelect: 'text'
                                        }}
                                        onPointerDown={(e) => {
                                            if (!selectedIds.includes(el.id)) return;
                                            e.stopPropagation();
                                            const target = e.currentTarget;
                                            setTimeout(() => target.focus(), 10);
                                        }}
                                        onFocus={(e) => {
                                            const range = document.createRange();
                                            const sel = window.getSelection();
                                            range.selectNodeContents(e.currentTarget);
                                            sel?.removeAllRanges();
                                            sel?.addRange(range);
                                        }}
                                        onBlur={(e) => updateElement(el.id, { props: { text: e.currentTarget.innerText } })}
                                    >
                                        {el.props.text || 'Edit Me'}
                                    </h2>
                                    {(el.props.variant === 'glass' || el.props.variant === '3d' || el.props.variant === 'solid') && (
                                        <div className="flex items-center gap-2 mt-6 opacity-30">
                                            <div className="h-px w-8 bg-current"></div>
                                            <p
                                                contentEditable
                                                suppressContentEditableWarning
                                                className="text-[10px] font-black uppercase tracking-[0.2em] outline-none cursor-text select-text pointer-events-auto"
                                                onPointerDown={(e) => {
                                                    if (!selectedIds.includes(el.id)) return;
                                                    e.stopPropagation();
                                                    const target = e.currentTarget;
                                                    setTimeout(() => target.focus(), 10);
                                                }}
                                                onFocus={(e) => {
                                                    const range = document.createRange();
                                                    const sel = window.getSelection();
                                                    range.selectNodeContents(e.currentTarget);
                                                    sel?.removeAllRanges();
                                                    sel?.addRange(range);
                                                }}
                                                onBlur={(e) => updateElement(el.id, { props: { label: e.currentTarget.innerText } })}
                                            >
                                                {el.props.label || 'Design Studio'}
                                            </p>
                                            <div className="h-px w-8 bg-current"></div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {el.type === 'sticker' && (
                                <div
                                    className={`
                                 px-4 py-2 text-black font-black uppercase tracking-widest text-xs shadow-lg transform -rotate-6
                                 ${el.props.variant === 'tape' ? 'opacity-90 shadow-sm' : 'rounded-full border-2 border-white/20'}
                                 ${el.props.variant === 'stamp' ? 'rounded-full border-4 border-dashed bg-transparent !text-current !shadow-none' : ''}
                             `}
                                    style={{
                                        backgroundColor: el.props.variant === 'stamp' ? 'transparent' : (el.props.bgColor || el.props.color || '#0bc9da'),
                                        color: el.props.textColor || (el.props.variant === 'stamp' ? (el.props.color || '#0bc9da') : 'black'),
                                        borderColor: el.props.variant === 'stamp' ? (el.props.color || '#0bc9da') : undefined,
                                        maskImage: el.props.variant === 'tape' ? 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/tape-mask.png)' : undefined,
                                        fontFamily
                                    }}
                                >
                                    {el.props.showIcon && (
                                        <span className="material-symbols-outlined mr-1 align-middle" style={{ color: el.props.iconColor || 'inherit' }}>{el.props.icon || 'star'}</span>
                                    )}
                                    <span
                                        contentEditable
                                        suppressContentEditableWarning
                                        className="outline-none cursor-text select-text pointer-events-auto"
                                        onPointerDown={(e) => {
                                            if (!selectedIds.includes(el.id)) return;
                                            e.stopPropagation();
                                            const target = e.currentTarget;
                                            setTimeout(() => target.focus(), 10);
                                        }}
                                        onFocus={(e) => {
                                            const range = document.createRange();
                                            const sel = window.getSelection();
                                            range.selectNodeContents(e.currentTarget);
                                            sel?.removeAllRanges();
                                            sel?.addRange(range);
                                        }}
                                        onBlur={(e) => updateElement(el.id, { props: { text: e.currentTarget.innerText } })}
                                    >
                                        {el.props.text || 'NEW'}
                                    </span>
                                </div>
                            )}

                            {el.type === 'icon' && (
                                <div className="flex items-center justify-center size-20 drop-shadow-lg" style={{ color: el.props.iconColor || el.props.color || 'white' }}>
                                    <span className="material-symbols-outlined text-[80px]">{el.props.text || 'star'}</span>
                                </div>
                            )}

                            {el.type === 'graphics' && (
                                <div
                                    className="size-32 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-xl border border-white/10"
                                    style={{ backgroundColor: el.props.color ? `${el.props.color}33` : undefined }}
                                ></div>
                            )}
                        </CanvasElement>
                    );
                })}
            </>
        );
    };

    // Right Sidebar Controls Render
    const renderSidebarControls = () => {
        if (selectedIds.length === 0) {
            // Add Elements View
            return (
                <div className="p-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9db2b8] mb-4">Add Elements</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => addElement('phone')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-surface-dark border border-border-dark hover:border-primary/50 hover:bg-white/5 transition-all group">
                            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary">smartphone</span>
                            <span className="text-xs font-bold text-slate-300">Phone</span>
                        </button>
                        <button onClick={() => addElement('bubble')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-surface-dark border border-border-dark hover:border-primary/50 hover:bg-white/5 transition-all group">
                            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary">chat_bubble</span>
                            <span className="text-xs font-bold text-slate-300">Bubble</span>
                        </button>
                        <button onClick={() => addElement('sticker')} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-surface-dark border border-border-dark hover:border-primary/50 hover:bg-white/5 transition-all group">
                            <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary">verified</span>
                            <span className="text-xs font-bold text-slate-300">Sticker</span>
                        </button>
                        <button onClick={() => addElement('icon')} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface-dark border border-border-dark hover:border-primary/50 hover:bg-white/5 transition-all group">
                            <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-primary">sentiment_satisfied</span>
                            <span className="text-[10px] font-bold text-slate-300">Icon</span>
                        </button>
                        <button onClick={() => addElement('graphics')} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface-dark border border-border-dark hover:border-primary/50 hover:bg-white/5 transition-all group">
                            <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-primary">blur_on</span>
                            <span className="text-[10px] font-bold text-slate-300">Shape</span>
                        </button>
                        <button onClick={() => addElement('text')} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface-dark border border-border-dark hover:border-primary/50 hover:bg-white/5 transition-all group col-span-2">
                            <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-primary">title</span>
                            <span className="text-[10px] font-bold text-slate-300">Text Block</span>
                        </button>
                    </div>

                    <div className="mt-8">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9db2b8] mb-4">Smart Presets</h4>
                        <div className="space-y-3">
                            {[
                                { id: 'stat', label: 'Metric Card', icon: 'monitoring', variant: 'graph' },
                                { id: 'message-stack', label: 'Notification Stack', icon: 'dynamic_feed', variant: 'glass' },
                                { id: 'chart', label: 'Bar Analysis', icon: 'bar_chart' },
                                { id: 'progress-circle', label: 'Goal Tracker', icon: 'progress_activity' },
                                { id: 'grid-menu', label: 'App Grid', icon: 'grid_view' },
                                { id: 'avatar-group', label: 'User Group', icon: 'group' },
                            ].map(preset => (
                                <button
                                    key={preset.label}
                                    onClick={() => addElement(preset.id as any)}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-dark border border-border-dark hover:border-primary/50 hover:bg-white/5 transition-all group text-left"
                                >
                                    <div className="size-8 rounded-lg bg-black/40 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-lg text-slate-400 group-hover:text-primary">{preset.icon}</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-300 flex-1">{preset.label}</span>
                                    <span className="material-symbols-outlined text-sm text-slate-600">add</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border-dark">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9db2b8] mb-4">Canvas Background</h4>
                        <div className="space-y-4">
                            <div className="flex bg-surface-dark rounded-lg p-1 border border-border-dark">
                                {(['solid', 'gradient', 'grid', 'pattern'] as const).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setBackgroundConfig(prev => ({ ...prev, type: t, value: t === 'pattern' ? 'Waves' : prev.value }))}
                                        className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded transition-all ${backgroundConfig.type === t ? 'bg-primary text-black shadow' : 'text-slate-500 hover:text-white'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            {backgroundConfig.type === 'solid' && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-[#9db2b8] uppercase">
                                        <label>Color</label>
                                        <span className="font-mono text-slate-500">{backgroundConfig.value}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="color" value={backgroundConfig.value} onChange={(e) => setBackgroundConfig({ ...backgroundConfig, value: e.target.value })} className="size-10 rounded-lg bg-transparent cursor-pointer border border-border-dark" />
                                        <input type="text" value={backgroundConfig.value} onChange={(e) => setBackgroundConfig({ ...backgroundConfig, value: e.target.value })} className="flex-1 h-10 px-3 bg-surface-dark border border-border-dark rounded-lg text-xs font-mono uppercase text-white focus:outline-none focus:border-primary" />
                                    </div>
                                </div>
                            )}

                            {backgroundConfig.type === 'gradient' && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-[#9db2b8] uppercase">
                                        <label>Gradient Colors</label>
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="color" value={backgroundConfig.value.split(',')[0] || '#000000'} onChange={(e) => {
                                            const colors = backgroundConfig.value.split(',');
                                            colors[0] = e.target.value;
                                            setBackgroundConfig({ ...backgroundConfig, value: colors.join(',') });
                                        }} className="size-10 rounded-lg bg-transparent cursor-pointer border border-border-dark" />
                                        <input type="color" value={backgroundConfig.value.split(',')[1] || '#1a1a1a'} onChange={(e) => {
                                            const colors = backgroundConfig.value.split(',');
                                            colors[1] = e.target.value || '#1a1a1a';
                                            setBackgroundConfig({ ...backgroundConfig, value: colors.join(',') });
                                        }} className="size-10 rounded-lg bg-transparent cursor-pointer border border-border-dark" />
                                    </div>
                                    <p className="text-[10px] text-slate-500">Pick start and end colors</p>
                                </div>
                            )}

                            {backgroundConfig.type === 'grid' && (
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-[#9db2b8] uppercase">Grid Color</label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" value={backgroundConfig.value} onChange={(e) => setBackgroundConfig({ ...backgroundConfig, value: e.target.value })} className="size-8 rounded bg-transparent cursor-pointer border border-border-dark" />
                                            <input type="text" value={backgroundConfig.value} onChange={(e) => setBackgroundConfig({ ...backgroundConfig, value: e.target.value })} className="flex-1 h-8 px-2 bg-surface-dark border border-border-dark rounded text-xs font-mono uppercase text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-bold text-[#9db2b8] uppercase">
                                            <label>Opacity</label>
                                            <span className="font-mono text-primary bg-primary/10 px-1 rounded">{((backgroundConfig.opacity || 0.1) * 100).toFixed(0)}%</span>
                                        </div>
                                        <input
                                            type="range" min="0.01" max="0.5" step="0.01" value={backgroundConfig.opacity || 0.1}
                                            onChange={(e) => setBackgroundConfig({ ...backgroundConfig, opacity: parseFloat(e.target.value) })}
                                            className="w-full accent-primary bg-surface-dark h-2 rounded-full appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            )}

                            {backgroundConfig.type === 'pattern' && (
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-[#9db2b8] uppercase">Pattern Theme</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Waves', 'ZigZag', 'Dots', 'Carbon'].map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setBackgroundConfig({ ...backgroundConfig, value: p })}
                                                className={`px-3 py-2 rounded text-[10px] font-bold border transition-all ${backgroundConfig.value === p ? 'border-primary bg-primary/10 text-primary' : 'border-border-dark text-slate-500 hover:border-white/20'}`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="space-y-1 mt-2">
                                        <div className="flex justify-between">
                                            <label className="text-[9px] font-bold text-slate-500 uppercase">Pattern Opacity</label>
                                            <span className="text-[9px] font-mono text-primary">{Math.round((backgroundConfig.opacity || 0.1) * 100)}%</span>
                                        </div>
                                        <input
                                            type="range" min="0.01" max="0.5" step="0.01"
                                            value={backgroundConfig.opacity || 0.1}
                                            onChange={(e) => setBackgroundConfig({ ...backgroundConfig, opacity: parseFloat(e.target.value) })}
                                            className="w-full accent-primary h-1 bg-surface-dark rounded-full appearance-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        // Properties View
        const selectedEl = customElements.find(el => el.id === selectedIds[0]);
        if (!selectedEl) return null;

        const isMulti = selectedIds.length > 1;

        return (
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={() => setSelectedIds([])}
                        className="flex-1 h-9 bg-surface-dark border border-border-dark rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2 group"
                    >
                        <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        Library
                    </button>
                    <button
                        onClick={() => removeSelectedElements()}
                        className="size-9 shrink-0 flex items-center justify-center text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg border border-red-500/20 transition-all"
                        title="Delete Selected"
                    >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                </div>

                {isMulti ? (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center space-y-3">
                        <div className="flex items-center justify-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-[18px]">group</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Grouping {selectedIds.length} Items</span>
                        </div>
                        <button
                            onClick={groupSelected}
                            className="w-full py-2 bg-primary text-black text-[10px] font-black uppercase rounded shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Confirm Group
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        {selectedEl.props.parentId ? (
                            <button onClick={ungroupSelected} className="flex-1 py-2 bg-slate-500/10 border border-white/10 rounded text-[10px] font-bold text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-all">
                                <span className="material-symbols-outlined text-[14px]">group_off</span>
                                Ungroup Items
                            </button>
                        ) : (
                            <>
                                <button onClick={() => moveToFront(selectedEl.id)} className="flex-1 py-2 bg-surface-dark border border-border-dark rounded text-[10px] font-bold text-slate-300 hover:text-white flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[14px]">flip_to_front</span> Front</button>
                                <button onClick={() => moveToBack(selectedEl.id)} className="flex-1 py-2 bg-surface-dark border border-border-dark rounded text-[10px] font-bold text-slate-300 hover:text-white flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[14px]">flip_to_back</span> Back</button>
                            </>
                        )}
                    </div>
                )}

                <div className="space-y-4">
                    {!isMulti && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-[#9db2b8] uppercase">Scale & Rotation</label>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="range" min="0.2" max="3" step="0.1"
                                    value={selectedEl.scale}
                                    onChange={(e) => updateElement(selectedEl.id, { scale: parseFloat(e.target.value) })}
                                    className="w-full accent-primary bg-surface-dark h-1 rounded-full appearance-none cursor-pointer"
                                />
                                <input
                                    type="range" min="-180" max="180" step="1"
                                    value={selectedEl.rotation || 0}
                                    onChange={(e) => updateElement(selectedEl.id, { rotation: parseInt(e.target.value) })}
                                    className="w-full accent-primary bg-surface-dark h-1 rounded-full appearance-none cursor-pointer"
                                />
                            </div>
                        </div>
                    )}

                    {/* Shared Properties */}
                    <div className="space-y-4 border-t border-border-dark pt-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-slate-500 uppercase">Background</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={selectedEl.props.bgColor || selectedEl.props.color || '#0bc9da'}
                                        onChange={(e) => updateMultipleElements(selectedIds, { props: { bgColor: e.target.value, color: e.target.value } })}
                                        className="size-8 rounded cursor-pointer border border-white/5 p-0 bg-transparent"
                                    />
                                    <span className="text-[9px] font-mono text-slate-400">{(selectedEl.props.bgColor || selectedEl.props.color || '#0bc9da').toUpperCase()}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold text-slate-500 uppercase">Text Color</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={selectedEl.props.textColor || '#ffffff'}
                                        onChange={(e) => updateMultipleElements(selectedIds, { props: { textColor: e.target.value } })}
                                        className="size-8 rounded cursor-pointer border border-white/5 p-0 bg-transparent"
                                    />
                                    <span className="text-[9px] font-mono text-slate-400">{(selectedEl.props.textColor || '#ffffff').toUpperCase()}</span>
                                </div>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase">
                                    <label>Background Opacity</label>
                                    <span className="font-mono text-primary">{Math.round((selectedEl.props.bgOpacity ?? 1) * 100)}%</span>
                                </div>
                                <input
                                    type="range" min="0" max="1" step="0.01"
                                    value={selectedEl.props.bgOpacity ?? 1}
                                    onChange={(e) => updateMultipleElements(selectedIds, { props: { bgOpacity: parseFloat(e.target.value) } })}
                                    className="w-full accent-primary bg-surface-dark h-1 rounded-full appearance-none cursor-pointer"
                                />
                            </div>
                            {(selectedEl.type === 'bubble' || selectedEl.type === 'stat' || selectedEl.type === 'icon' || selectedEl.type === 'sticker') && (
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-slate-500 uppercase">Icon Color</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={selectedEl.props.iconColor || '#ffffff'}
                                            onChange={(e) => updateMultipleElements(selectedIds, { props: { iconColor: e.target.value } })}
                                            className="size-8 rounded cursor-pointer border border-white/5 p-0 bg-transparent"
                                        />
                                        <span className="text-[9px] font-mono text-slate-400">{(selectedEl.props.iconColor || '#ffffff').toUpperCase()}</span>
                                    </div>
                                </div>
                            )}
                            {(selectedEl.type === 'bubble' || selectedEl.type === 'stat' || selectedEl.type === 'sticker') && (
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-slate-500 uppercase">Show Icon</label>
                                    <button
                                        onClick={() => updateMultipleElements(selectedIds, { props: { showIcon: !selectedEl.props.showIcon } })}
                                        className={`w-full h-8 rounded border transition-all flex items-center justify-center ${selectedEl.props.showIcon ? 'bg-primary/20 border-primary text-primary' : 'bg-surface-dark border-border-dark text-slate-500'}`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">{selectedEl.props.showIcon ? 'visibility' : 'visibility_off'}</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-[#9db2b8] uppercase">Font Family</label>
                                <select
                                    value={selectedEl.props.font || 'Inter'}
                                    onChange={(e) => updateMultipleElements(selectedIds, { props: { font: e.target.value } })}
                                    className="w-full h-8 px-1 bg-surface-dark border border-border-dark rounded text-[10px] text-white focus:outline-none focus:border-primary appearance-none cursor-pointer"
                                >
                                    <option value="Inter">Inter</option>
                                    <option value="Serif">Playfair</option>
                                    <option value="Mono">Roboto</option>
                                    <option value="Grotesk">Space</option>
                                    <option value="Outfit">Outfit</option>
                                    <option value="Syne">Syne</option>
                                    <option value="Montserrat">Montserrat</option>
                                </select>
                            </div>

                            {(selectedEl.type !== 'phone' && selectedEl.type !== 'graphics') && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-[#9db2b8] uppercase">Variant</label>
                                    <select
                                        value={selectedEl.props.variant || 'default'}
                                        onChange={(e) => updateMultipleElements(selectedIds, { props: { variant: e.target.value } })}
                                        className="w-full h-8 px-1 bg-surface-dark border border-border-dark rounded text-[10px] text-white focus:outline-none focus:border-primary appearance-none cursor-pointer"
                                    >
                                        <option value="default">Default</option>
                                        {selectedEl.type === 'sticker' && <><option value="tape">Tape</option><option value="stamp">Stamp</option><option value="tag">Tag</option></>}
                                        {selectedEl.type === 'stat' && <><option value="minimal">Minimal</option><option value="pill">Pill</option><option value="graph">Graph</option></>}
                                        {selectedEl.type === 'bubble' && <><option value="solid">Solid</option><option value="glass">Glass (Glassmorphism)</option><option value="user">User</option></>}
                                        {selectedEl.type === 'text' && (
                                            <>
                                                <option value="heading">Heading</option>
                                                <option value="caption">Caption</option>
                                                <option value="glass">Glass Card</option>
                                                <option value="solid">Solid Card</option>
                                                <option value="3d">3D Depth</option>
                                                <option value="outline">Outline</option>
                                                <option value="neon">Neon Glow</option>
                                                <option value="animated">Animated Flow</option>
                                                <option value="none">No Background</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Content input */}
                        {(selectedEl.type === 'text' || selectedEl.type === 'bubble' || selectedEl.type === 'sticker' || selectedEl.type === 'stat') && (
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-[#9db2b8] uppercase">Main Content</label>
                                    <textarea
                                        value={selectedEl.props.text || ''}
                                        onChange={(e) => updateMultipleElements(selectedIds, { props: { text: e.target.value } })}
                                        className="w-full h-16 p-3 bg-surface-dark border border-border-dark rounded text-xs text-white focus:outline-none focus:border-primary resize-none"
                                        placeholder="Type something..."
                                    />
                                </div>
                                {(selectedEl.type === 'stat' || selectedEl.type === 'bubble' || selectedEl.type === 'text') && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-[#9db2b8] uppercase">{selectedEl.type === 'stat' ? 'Label Text' : 'Subtitle'}</label>
                                        <input
                                            type="text"
                                            value={selectedEl.props.label || ''}
                                            onChange={(e) => updateMultipleElements(selectedIds, { props: { label: e.target.value } })}
                                            className="w-full h-9 px-3 bg-surface-dark border border-border-dark rounded text-xs text-white focus:outline-none focus:border-primary"
                                            placeholder={selectedEl.type === 'stat' ? "Label (e.g. Revenue)" : selectedEl.type === 'text' ? "Sub-label (e.g. Design Studio)" : "Subtitle (e.g. Tap to open)"}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Icon input & Picker */}
                        {(selectedEl.type === 'icon' || selectedEl.type === 'bubble' || selectedEl.type === 'sticker' || selectedEl.type === 'stat') && (
                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-[#9db2b8] uppercase">Icon Picker</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={iconSearch}
                                            onChange={(e) => setIconSearch(e.target.value)}
                                            className="w-full h-9 pl-9 pr-3 bg-surface-dark border border-border-dark rounded-lg text-xs text-white focus:border-primary"
                                            placeholder="Search icons..."
                                        />
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-500">search</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-1 max-h-40 overflow-y-auto pr-1 code-scrollbar">
                                    {(iconSearch ? COMMON_ICONS.filter(i => i.includes(iconSearch.toLowerCase())) : COMMON_ICONS).map(icon => (
                                        <button
                                            key={icon}
                                            onClick={() => {
                                                selectedIds.forEach(id => {
                                                    const el = customElements.find(i => i.id === id);
                                                    if (!el) return;
                                                    if (el.type === 'icon') updateElement(id, { props: { text: icon } });
                                                    else updateElement(id, { props: { icon: icon } });
                                                });
                                            }}
                                            className={`aspect-square flex items-center justify-center rounded hover:bg-white/10 transition-colors ${(selectedEl.type === 'icon' ? selectedEl.props.text : selectedEl.props.icon) === icon ? 'bg-primary/20 text-primary' : 'text-slate-400'}`}
                                            title={icon}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">{icon}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Phone Specifics */}
                    {selectedEl.type === 'phone' && !isMulti && (
                        <div className="space-y-2 border-t border-border-dark pt-4">
                            <label className="text-[10px] font-bold text-[#9db2b8] uppercase">Device Frame</label>
                            <select
                                value={selectedEl.props.model || 'iPhone 16 Pro'}
                                onChange={(e) => updateElement(selectedEl.id, { props: { model: e.target.value as DeviceModel } })}
                                className="w-full h-9 px-3 bg-surface-dark border border-border-dark rounded text-xs text-white"
                            >
                                <option value="iPhone 16 Pro">iPhone 16 Pro</option>
                                <option value="iPhone 15 Pro">iPhone 15 Pro</option>
                                <option value="Galaxy S24 Ultra">Galaxy S24 Ultra</option>
                                <option value="Pixel 9 Pro">Pixel 9 Pro</option>
                                <option value="iPhone X">iPhone X</option>
                                <option value="MacBook Pro">MacBook Pro</option>
                            </select>
                            <button onClick={() => fileInputRef.current?.click()} className="w-full py-2 bg-primary/10 border border-primary/20 rounded text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-all">Upload Screen</button>
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden font-display text-white">
            {/* Sidebar Left */}
            <aside className="w-64 border-r border-border-dark flex flex-col bg-background-light dark:bg-background-dark shrink-0">
                <div className="p-6 border-b border-border-dark flex items-center gap-3 cursor-pointer" onClick={() => setActiveTemplate(null)}>
                    <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xl">view_quilt</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-tight">Studio v2.0</span>
                    </div>
                </div>

                <div className="flex items-center border-b border-border-dark">
                    <button onClick={() => setSidebarTab('templates')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider ${sidebarTab === 'templates' ? 'bg-surface-dark text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}>Templates</button>
                    <button onClick={() => setSidebarTab('projects')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider ${sidebarTab === 'projects' ? 'bg-surface-dark text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}>Projects</button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                    {sidebarTab === 'templates' ? (
                        <div>
                            <div className="flex items-center gap-2 text-[#9db2b8] px-2 mb-3">
                                <span className="material-symbols-outlined text-[18px]">folder_open</span>
                                <span className="text-xs font-bold uppercase tracking-widest">Templates</span>
                            </div>
                            <div className="space-y-1">
                                {[
                                    { id: 'Blank', icon: 'check_box_outline_blank', label: 'Create from Scratch' },
                                    { id: 'Hero', icon: 'javascript', label: 'Hero (Intro)' },
                                    { id: 'Global', icon: 'public', label: 'Global (Map)' },
                                    { id: 'Savings', icon: 'savings', label: 'Savings (Goals)' },
                                    { id: 'Analytics', icon: 'analytics', label: 'Analytics (Stats)' },
                                    { id: 'CTA', icon: 'call_to_action', label: 'CTA (End)' },
                                ].map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setActiveTemplate(item.id as TemplateId)}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors group ${activeTemplate === item.id
                                            ? 'bg-primary/10 border border-primary/20 text-primary'
                                            : 'hover:bg-surface-dark text-[#9db2b8] hover:text-white'
                                            }`}
                                    >
                                        <span className={`material-symbols-outlined text-[20px] ${activeTemplate === item.id ? '' : 'group-hover:text-white'}`}>
                                            {item.icon}
                                        </span>
                                        <p className="text-sm font-medium">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-2 text-[#9db2b8] px-2 mb-3">
                                <span className="material-symbols-outlined text-[18px]">bookmark</span>
                                <span className="text-xs font-bold uppercase tracking-widest">Saved Projects</span>
                            </div>
                            {savedProjects.length === 0 ? (
                                <p className="text-xs text-slate-500 px-2 italic">No saved projects yet.</p>
                            ) : (
                                <div className="space-y-2">
                                    {savedProjects.map(proj => (
                                        <div key={proj.id} className="bg-surface-dark border border-border-dark rounded-lg overflow-hidden group hover:border-primary/50 transition-all">
                                            <div className="p-3 cursor-pointer" onClick={() => loadVersion(proj, proj.versions?.[0])}>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h5 className="font-bold text-sm text-white group-hover:text-primary transition-colors">{proj.name}</h5>
                                                    <button onClick={(e) => deleteProject(proj.id, e)} className="text-slate-500 hover:text-red-400 p-1 hover:bg-white/5 rounded">
                                                        <span className="material-symbols-outlined text-[14px]">delete</span>
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[10px]">history</span>
                                                    {(proj.versions?.length || 0)} versions
                                                </p>
                                                <p className="text-[10px] text-slate-500 mt-1">Latest: {proj.versions?.[0]?.name || 'N/A'}</p>
                                            </div>

                                            {/* Version History (Mini) */}
                                            {(proj.versions?.length || 0) > 1 && (
                                                <div className="border-t border-border-dark bg-black/20 max-h-32 overflow-y-auto hidden group-hover:block">
                                                    {proj.versions?.slice(1).map(v => (
                                                        <div
                                                            key={v.id}
                                                            className="px-3 py-2 border-b border-border-dark/50 hover:bg-white/5 cursor-pointer flex justify-between items-center"
                                                            onClick={(e) => { e.stopPropagation(); loadVersion(proj, v); }}
                                                        >
                                                            <span className="text-[10px] text-slate-400 truncate max-w-[120px]">{v.name}</span>
                                                            <span className="text-[9px] text-slate-600">{new Date(v.timestamp).toLocaleDateString()}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-background-dark/50" onPointerDown={() => setSelectedIds([])}>
                <header className="h-16 border-b border-border-dark flex items-center justify-between px-8 bg-background-dark/80 backdrop-blur-md sticky top-0 z-10" onPointerDown={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold tracking-tight">
                                {activeTemplate ? `${activeTemplate} Template` : 'Project Overview'}
                            </h1>
                            {currentProjectId && (
                                <p className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">folder</span>
                                    Editing: {savedProjects.find(p => p.id === currentProjectId)?.name}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {activeTemplate && (
                            <>
                                <button
                                    onClick={() => { setActiveTemplate(null); setSelectedIds([]); }}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    className="h-9 px-4 bg-surface-dark border border-border-dark text-white text-xs font-bold rounded-lg hover:bg-[#293438] transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                                    Back to Gallery
                                </button>

                                <div className="h-6 w-px bg-border-dark mx-2"></div>

                                <button
                                    onClick={saveToLibrary}
                                    className="h-9 px-4 bg-primary text-black text-xs font-black rounded-lg hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined text-[18px]">{currentProjectId ? 'history_edu' : 'save_as'}</span>
                                    {currentProjectId ? 'Create New Version' : 'Save Project (v1)'}
                                </button>
                                <button
                                    onClick={handleSaveProject}
                                    className="h-9 px-4 bg-surface-dark border border-border-dark text-white text-xs font-bold rounded-lg hover:bg-[#293438] transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                    Download JSON
                                </button>
                                <button
                                    onClick={() => projectInputRef.current?.click()}
                                    className="h-9 px-4 bg-surface-dark border border-border-dark text-white text-xs font-bold rounded-lg hover:bg-[#293438] transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">folder_open</span>
                                    Load
                                </button>
                                <input
                                    type="file"
                                    ref={projectInputRef}
                                    className="hidden"
                                    accept=".json"
                                    onChange={handleLoadProject}
                                />

                                <div className="h-6 w-px bg-border-dark mx-2"></div>

                                <button
                                    onClick={handleDownload}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    disabled={isExporting}
                                    className="h-9 px-4 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined text-[18px]">file_download</span>
                                    {isExporting ? 'Exporting...' : 'Export PNG'}
                                </button>
                            </>
                        )}
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-8 code-scrollbar flex justify-center items-start">
                    {activeTemplate ? (
                        <div
                            id="capture-target"
                            className="relative border border-border-dark rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
                            onPointerDown={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: backgroundConfig.type === 'solid' ? backgroundConfig.value :
                                    backgroundConfig.type === 'grid' ? '#000000' :
                                        undefined,
                                backgroundImage: backgroundConfig.type === 'gradient' ? `linear-gradient(135deg, ${backgroundConfig.value.split(',')[0]}, ${backgroundConfig.value.split(',')[1] || '#000000'})` :
                                    backgroundConfig.type === 'grid' ? `radial-gradient(circle at 1px 1px, ${backgroundConfig.value} 1px, transparent 0)` :
                                        backgroundConfig.type === 'pattern' ? (
                                            backgroundConfig.value === 'Waves' ? 'url("https://www.transparenttextures.com/patterns/wavecut.png")' :
                                                backgroundConfig.value === 'ZigZag' ? 'url("https://www.transparenttextures.com/patterns/shattered.png")' :
                                                    backgroundConfig.value === 'Dots' ? 'url("https://www.transparenttextures.com/patterns/micro-carbon.png")' :
                                                        'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")'
                                        ) : undefined,
                                backgroundSize: backgroundConfig.type === 'grid' ? '24px 24px' : backgroundConfig.type === 'pattern' ? '100px 100px' : undefined
                            }}
                        >
                            {/* Grid Overlay for opacity control if type is grid or pattern */}
                            {(backgroundConfig.type === 'grid' || backgroundConfig.type === 'pattern') && (
                                <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: `rgba(0,0,0,${1 - (backgroundConfig.opacity || 0.1)})`, mixBlendMode: 'multiply' }}></div>
                            )}
                            {renderActiveTemplate()}
                            {renderCustomElements()}
                        </div>
                    ) : (
                        <div className="w-full max-w-6xl space-y-12">
                            {/* Dashboard Heading */}
                            <div className="flex flex-col gap-2">
                                <h2 className="text-3xl font-black tracking-tight text-white flex items-center gap-4">
                                    Welcome back, Developer
                                    <span className="text-[10px] font-bold py-1 px-3 bg-primary/10 text-primary border border-primary/20 rounded-full uppercase tracking-tighter">Pro Studio</span>
                                </h2>
                                <p className="text-slate-500 text-sm font-medium">Create stunning mobile UI mockups with ease.</p>
                            </div>

                            {/* Saved Projects (Dashboard View) */}
                            {savedProjects.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-6 group cursor-pointer" onClick={() => setSidebarTab('projects')}>
                                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                                            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                                            Recent Projects
                                        </h3>
                                        <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                                            View Library <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {savedProjects.slice(0, 3).map(proj => (
                                            <div
                                                key={proj.id}
                                                className="group relative bg-[#111317] border border-border-dark rounded-2xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer shadow-2xl hover:translate-y-[-4px]"
                                                onClick={() => loadVersion(proj, proj.versions[0])}
                                            >
                                                <div className="aspect-video bg-[#0a0a0a] flex items-center justify-center p-8 relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5"></div>
                                                    <div className="scale-75 opacity-20 group-hover:opacity-60 transition-all blur-sm group-hover:blur-none">
                                                        <div className="size-24 bg-primary/20 rounded-full blur-2xl"></div>
                                                        <div className="w-40 h-10 bg-white/5 rounded-lg border border-white/10 mt-4 translate-x-4"></div>
                                                        <div className="w-40 h-10 bg-white/5 rounded-lg border border-white/10 mt-2"></div>
                                                    </div>
                                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold text-primary border border-primary/20">
                                                        v{proj.versions.length}
                                                    </div>
                                                </div>
                                                <div className="p-5 border-t border-border-dark flex flex-col gap-1 bg-[#14161b]">
                                                    <h4 className="font-bold text-white group-hover:text-primary transition-colors truncate">{proj.name}</h4>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] text-slate-500">{new Date(proj.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono uppercase">
                                                            <span className="material-symbols-outlined text-[12px]">schedule</span>
                                                            {new Date(proj.versions[proj.versions.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                                    <span className="size-2 rounded-full bg-slate-600"></span>
                                    Design Templates
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {/* Create Blank */}
                                    <div className="group relative" onClick={() => setActiveTemplate('Blank')}>
                                        <div className="aspect-[9/16] bg-[#111317] rounded-2xl border-2 border-dashed border-border-dark flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-white/[0.02] transition-all text-slate-500 hover:text-white cursor-pointer shadow-xl">
                                            <div className="size-14 rounded-full bg-surface-dark flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all shadow-lg group-hover:shadow-primary/20">
                                                <span className="material-symbols-outlined text-3xl">add</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-xs font-black uppercase tracking-widest text-white">Empty Canvas</span>
                                                <span className="text-[9px] font-bold opacity-40 uppercase tracking-tighter">Start New Design</span>
                                            </div>
                                        </div>
                                    </div>

                                    {(['Hero', 'Global', 'Analytics', 'Savings'] as TemplateId[]).map((t) => (
                                        <div key={t} className="group relative cursor-pointer" onClick={() => setActiveTemplate(t)}>
                                            <div className="aspect-[9/16] bg-[#111317] rounded-2xl border border-border-dark overflow-hidden transition-all group-hover:border-primary/50 shadow-xl group-hover:translate-y-[-4px]">
                                                <div className="h-full w-full bg-gradient-to-br from-black to-[#1a1c22] flex flex-col items-center justify-center p-8 text-center relative">
                                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-all">
                                                        <span className="material-symbols-outlined text-8xl">
                                                            {t === 'Hero' ? 'rocket_launch' : t === 'Global' ? 'public' : t === 'Analytics' ? 'insights' : 'savings'}
                                                        </span>
                                                    </div>
                                                    <span className="material-symbols-outlined text-5xl text-primary/40 group-hover:text-primary transition-all mb-4">
                                                        {t === 'Hero' ? 'rocket' : t === 'Global' ? 'public' : t === 'Analytics' ? 'bar_chart' : 'savings'}
                                                    </span>
                                                    <h5 className="text-sm font-black text-white mb-2">{t} Preset</h5>
                                                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Modern mobile UI layout optimized for {t.toLowerCase()} showcase.</p>
                                                    <div className="mt-6 h-8 px-4 rounded-full bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all">
                                                        Select Preset
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <aside className="hidden md:flex w-80 border-l border-border-dark flex-col bg-surface-dark/40 backdrop-blur-xl shrink-0 z-20">
                <div className="flex items-center px-6 py-4 border-b border-border-dark h-[53px]">
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
                        {selectedIds.length > 0 ? 'Properties' : 'Library'}
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto code-scrollbar bg-black/30">
                    {renderSidebarControls()}
                </div>
            </aside>
        </div>
    );
};

export default Studio;

