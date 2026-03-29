'use client';

import { useStore, WindowState } from '@/store/useStore';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Minus, Square, Minimize2 } from 'lucide-react';
import React, { useRef } from 'react';

interface WindowProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ windowState, children }) => {
  const { closeApp, toggleMinimizeApp, toggleMaximizeApp, focusApp, activeWindowId } = useStore();
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const isActive = activeWindowId === windowState.instanceId;

  if (windowState.isMinimized) return null; 
  
  return (
    <AnimatePresence>
      <motion.div
        ref={windowRef}
        drag={!windowState.isMaximized}
        dragListener={false}
        dragControls={dragControls}
        dragMomentum={false}
        dragConstraints={{ left: 0, top: 0, right: typeof window !== 'undefined' ? window.innerWidth - 800 : 1000, bottom: typeof window !== 'undefined' ? window.innerHeight - 600 : 1000 }}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          display: windowState.isMinimized ? 'none' : 'flex'
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onMouseDown={(e) => {
          e.stopPropagation();
          focusApp(windowState.instanceId);
        }}
        className={`absolute rounded-xl overflow-hidden shadow-2xl flex flex-col border border-white/20 dark:border-white/10 bg-white/80 dark:bg-[#1C1C1C]/90 backdrop-blur-xl ${
          windowState.isMaximized 
            ? 'top-0 left-0 w-screen h-[calc(100vh-48px)] !rounded-none !border-0' 
            : 'top-10 left-10 w-[800px] h-[600px] max-w-[100vw] max-h-[calc(100vh-48px)] resize'
        } ${isActive ? 'shadow-[0_0_20px_rgba(0,0,0,0.3)]' : 'shadow-lg'}`}
        style={{ zIndex: windowState.zIndex }}
      >
        <div 
          className="h-10 shrink-0 flex items-center justify-between select-none cursor-move hover:bg-white/10 dark:hover:bg-black/10 transition"
          onDoubleClick={() => toggleMaximizeApp(windowState.instanceId)}
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className="flex items-center gap-3 px-4">
            {React.createElement(windowState.icon, { size: 16, className: "text-blue-500" })}
            <span className="text-sm font-medium text-black dark:text-white/80">{windowState.title}</span>
          </div>

          <div className="flex h-full">
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMinimizeApp(windowState.instanceId); }}
              className="px-4 h-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition"
              aria-label="Minimize"
            >
              <Minus size={16} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMaximizeApp(windowState.instanceId); }}
              className="px-4 h-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition"
              aria-label="Maximize"
            >
              {windowState.isMaximized ? <Minimize2 size={14} /> : <Square size={14} />}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); closeApp(windowState.instanceId); }}
              className="px-4 h-full flex items-center justify-center hover:bg-red-500 hover:text-white text-black dark:text-white transition"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 w-full bg-white/50 dark:bg-black/50 overflow-auto relative">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
