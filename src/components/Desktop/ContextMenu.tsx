import React, { useState, useEffect } from 'react';
import { RefreshCw, Monitor, Settings, LayoutDashboard, Copy, FileIcon, Trash2, Shield, FolderPlus, MonitorUp, Image as ImageIcon } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Icons } from './Icons';

export const ContextMenu = () => {
  const [menu, setMenu] = useState<{ x: number; y: number; visible: boolean }>({ x: 0, y: 0, visible: false });
  const { openApp } = useStore();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      // Ensure menu stays within screen bounds
      const x = Math.min(e.pageX, window.innerWidth - 220);
      const y = Math.min(e.pageY, window.innerHeight - 300);
      setMenu({ x, y, visible: true });
    };

    const handleClick = () => setMenu({ ...menu, visible: false });

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, [menu]);

  if (!menu.visible) return null;

  return (
    <div 
      className="fixed z-[99999] w-56 bg-white/70 dark:bg-[#1C1C1C]/90 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-xl shadow-2xl p-1 text-sm font-sans"
      style={{ top: menu.y, left: menu.x }}
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="flex items-center gap-3 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer transition select-none"
        onClick={() => {
          location.reload();
        }}
      >
        <RefreshCw size={16} className="opacity-70 text-blue-500" /> Refresh
      </div>

      <div className="h-px bg-black/10 dark:bg-white/10 my-1 mx-2" />

      <div 
        className="flex items-center gap-3 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer transition select-none"
        onClick={() => {
          openApp({ id: 'projects', title: 'Projects', icon: Icons.projects });
          setMenu({ ...menu, visible: false });
        }}
      >
        <FolderPlus size={16} className="opacity-70 text-yellow-500" /> New Project Node
      </div>

      <div 
        className="flex items-center gap-3 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer transition select-none"
        onClick={() => {
          openApp({ id: 'portfolio', title: 'Portfolio', icon: Icons.portfolioSite });
          setMenu({ ...menu, visible: false });
        }}
      >
        <LayoutDashboard size={16} className="opacity-70 text-emerald-500" /> Design UI Website
      </div>

      <div className="h-px bg-black/10 dark:bg-white/10 my-1 mx-2" />

      <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer transition select-none">
        <Monitor size={16} className="opacity-70" /> Display settings
      </div>
      <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer transition select-none">
        <MonitorUp size={16} className="opacity-70" /> Personalize
      </div>
      <div 
        className="flex items-center gap-3 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer transition select-none"
        onClick={() => {
          useStore.getState().nextWallpaper();
          setMenu({ ...menu, visible: false });
        }}
      >
        <ImageIcon size={16} className="opacity-70 text-blue-500" /> Next desktop background
      </div>

      <div className="h-px bg-black/10 dark:bg-white/10 my-1 mx-2" />

      <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer transition select-none">
        <Shield size={16} className="opacity-70 text-blue-500" /> Open in Terminal
      </div>
      
      <div className="flex items-center justify-between px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer transition select-none opacity-50">
        <div className="flex items-center gap-3">
          <Trash2 size={16} /> Empty Trash
        </div>
      </div>
      
      <div className="h-px bg-black/10 dark:bg-white/10 my-1 mx-2" />
      
      <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-md cursor-pointer transition font-semibold text-blue-600 dark:text-blue-400 select-none">
        Show more options
      </div>

    </div>
  );
};
