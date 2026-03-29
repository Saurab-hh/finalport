'use client';

import { useStore, AppType } from '@/store/useStore';
import { format } from 'date-fns';
import { Wifi, Volume2, BatteryMedium, ChevronUp, Bell, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Icons } from '../Desktop/Icons';

export const Taskbar = () => {
  const { toggleStartMenu, toggleWidgets, toggleSearchMenu, toggleQuickSettings, quickSettingsOpen, searchMenuOpen, startMenuOpen, widgetsOpen, windows, activeWindowId, openApp, toggleMinimizeApp, focusApp } = useStore();
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const activeApps = windows.reduce((acc, win) => {
    if (!acc.find(a => a.appId === win.appId)) {
      acc.push(win);
    }
    return acc;
  }, [] as typeof windows);

  // Default pinned apps
  const pinnedApps: AppType[] = [
    { id: 'portfolio', title: 'Portfolio', icon: Icons.portfolioSite },
    { id: 'vscode', title: 'VSCode', icon: Icons.vscode },
    { id: 'projects', title: 'Projects', icon: Icons.projects },
  ];

  // Merge pinned with active so active apps appear after pinned, or overlap them
  const taskbarIcons = [...pinnedApps];
  activeApps.forEach(activeApp => {
    if (!taskbarIcons.find(p => p.id === activeApp.appId)) {
      taskbarIcons.push({
        id: activeApp.appId,
        title: activeApp.title,
        icon: activeApp.icon
      });
    }
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[48px] bg-[#f3f3f3]/90 dark:bg-[#1a1a1a]/90 backdrop-blur-2xl border-t border-black/5 dark:border-white/5 z-[10000] flex items-center px-3 select-none">
      
      {/* Left Widget section */}
      <div 
        onClick={toggleWidgets}
        className={`flex-1 flex items-center h-full max-w-[150px] px-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition cursor-pointer gap-2 ${widgetsOpen ? 'bg-black/5 dark:bg-white/5 shadow-inner' : ''}`}
      >
        <div className="text-xl">🌤️</div>
        <div className="flex flex-col text-[10px] leading-tight font-medium text-gray-800 dark:text-gray-200">
          <span>72°F</span>
          <span>Mostly Sunny</span>
        </div>
      </div>

      {/* Center Apps */}
      <div className="flex-1 flex justify-center items-center gap-1.5 h-full">
        {/* Start Button */}
        <div 
          onClick={toggleStartMenu}
          className={`w-11 h-11 flex items-center justify-center rounded hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer relative group shadow-sm hover:shadow-md
                    ${startMenuOpen ? 'bg-black/10 dark:bg-white/10 shadow-inner' : ''}`}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e6/Windows_11_logo.svg" alt="Start" className="w-[26px] h-[26px] group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,120,212,0.5)]" />
          {startMenuOpen && <div className="absolute bottom-0 w-3 h-1 bg-blue-500 rounded-full" />}
        </div>
        
        {/* Search Bar - Fake icon */}
        <div 
          onClick={toggleSearchMenu}
          className={`w-10 h-10 flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer relative group ${searchMenuOpen ? 'bg-black/10 dark:bg-white/10' : ''}`}
        >
          <Search size={22} className="text-black/80 dark:text-white/80 group-hover:scale-105 transition-transform" />
          {searchMenuOpen && <div className="absolute bottom-0 w-3 h-1 bg-blue-500 rounded-full" />}
        </div>

        {/* Apps Render */}
        {taskbarIcons.map(app => {
           // Find if app is actively running
           const activeInstance = activeApps.find(a => a.appId === app.id);
           const isRunning = !!activeInstance;
           const isActive = activeInstance && activeWindowId === activeInstance.instanceId;
           
           return (
             <div 
               key={app.id}
               title={app.title}
               onClick={() => {
                 if (isRunning && activeInstance) {
                   if (isActive) {
                     toggleMinimizeApp(activeInstance.instanceId);
                   } else {
                     focusApp(activeInstance.instanceId);
                     // if minimized, unminimize it
                     if (activeInstance.isMinimized) {
                       toggleMinimizeApp(activeInstance.instanceId);
                     }
                   }
                 } else {
                   openApp(app);
                 }
               }}
               className={`w-10 h-10 flex items-center justify-center rounded transition cursor-pointer group relative 
               ${isActive ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
             >
               {React.createElement(app.icon, { size: 24, className: "group-hover:scale-110 transition-transform drop-shadow-sm" })}
               
               {/* Running Indicator Line */}
               {isRunning && (
                 <div className={`absolute bottom-0 h-1 rounded-full transition-all duration-300 ${isActive ? 'bg-blue-500 w-4' : 'bg-gray-400 dark:bg-gray-500 w-1.5 group-hover:w-2.5'}`} />
               )}
             </div>
           );
        })}

      </div>

      {/* Right System Tray */}
      <div className="flex-1 flex justify-end items-center h-full space-x-0.5 text-xs text-black/90 dark:text-white/90 font-medium">
        <div className="flex items-center hover:bg-black/5 dark:hover:bg-white/5 rounded px-2 h-9 transition cursor-pointer">
          <ChevronUp size={16} />
        </div>
        
        <div 
          onClick={toggleQuickSettings}
          className={`flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 rounded px-3 h-9 transition cursor-pointer ${quickSettingsOpen ? 'bg-black/10 dark:bg-white/10' : ''}`}
        >
          <Wifi size={16} />
          <Volume2 size={16} />
          <BatteryMedium size={16} className="-rotate-90" />
        </div>
        
        <div className="flex flex-col items-end justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded px-3 h-9 transition cursor-pointer leading-[1.1] relative text-[11px] font-normal w-[80px]">
          {time && (
            <>
              <span className="text-right w-full">{format(time, 'h:mm a')}</span>
              <span className="text-right w-full">{format(time, 'M/d/yyyy')}</span>
            </>
          )}
        </div>
        
        <div className="flex items-center hover:bg-black/5 dark:hover:bg-white/5 rounded px-2 h-9 transition cursor-pointer">
          <Bell size={16} />
        </div>
        
        {/* Show Desktop Button */}
        <div className="w-2 h-9 border-l border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer ml-2"></div>
      </div>

    </div>
  );
};
