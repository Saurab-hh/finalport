'use client';

import { useStore } from '@/store/useStore';
import { StartMenu } from '@/components/Taskbar/StartMenu';
import { SearchMenu } from '@/components/Taskbar/SearchMenu';
import { WidgetsPanel } from '@/components/Taskbar/WidgetsPanel';
import { Taskbar } from '@/components/Taskbar/Taskbar';
import { QuickSettingsPanel } from '@/components/Taskbar/QuickSettingsPanel';
import { Desktop } from '@/components/Desktop/Desktop';
import { Window } from '@/components/Window/Window';
import { PortfolioApp } from '@/components/Apps/PortfolioApp';
import { ResumeApp } from '@/components/Apps/ResumeApp';
import { ProjectsApp } from '@/components/Apps/ProjectsApp';
import { VSCodeApp } from '@/components/Apps/VSCodeApp';
import { FigmaApp } from '@/components/Apps/FigmaApp';
import { LikesApp } from '@/components/Apps/LikesApp';
import { CommentsApp } from '@/components/Apps/CommentsApp';
import { TrashApp } from '@/components/Apps/TrashApp';
import { TerminalApp } from '@/components/Apps/TerminalApp';
import { ChromeApp } from '@/components/Apps/ChromeApp';
import { CertificatesApp } from '@/components/Apps/CertificatesApp';
import { CameraApp } from '@/components/Apps/CameraApp';
import { useEffect, useState } from 'react';
import { ContextMenu } from '@/components/Desktop/ContextMenu';

// Maps app IDs to their respective React components
const AppRegistry: Record<string, React.FC<{instanceId: string}>> = {
  'portfolio': PortfolioApp,
  'chrome': ChromeApp,
  'certificates': CertificatesApp,
  'resume': ResumeApp,
  'projects': ProjectsApp,
  'vscode': VSCodeApp,
  'figma': FigmaApp,
  'likes': LikesApp,
  'comments': CommentsApp,
  'trash': TrashApp,
  'terminal': TerminalApp,
  'camera': CameraApp,
};

export default function Windows11Portfolio() {
  const { windows, closeAllMenus, wallpaperIndex } = useStore();
  const [mounted, setMounted] = useState(false);

  const WALLPAPERS = [
    "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&q=80&w=2560", // Win 11 Bloom
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2560", // Abstract blue wavy
    "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&q=80&w=2560", // Mac Big Sur style
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2560", // Abstract tech neon lines
    "https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&q=80&w=2560", // Dark abstract bloom
    "https://images.unsplash.com/photo-1506744626753-dba37c15eac0?auto=format&fit=crop&q=80&w=2560", // Yosemite Mountains
    "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=2560", // Neon Cityscape
    "https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&q=80&w=2560", // Minimalist dark geometry
    "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=2560", // Dark purple starry abstract
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=2560"  // 3D Glassmorphic shapes
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
     return <div className="min-h-screen bg-black flex items-center justify-center">
       <div className="flex flex-col items-center">
         <div className="w-16 h-16 border-4 border-[#0078D4] border-t-transparent rounded-full animate-spin mb-8" />
         <p className="text-white font-sans text-xl">Starting Windows 11 Portfolio...</p>
       </div>
     </div>;
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-cover bg-center relative font-sans text-black dark:text-white transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `url("${WALLPAPERS[wallpaperIndex] || WALLPAPERS[0]}")`,
      }}
      onClick={() => closeAllMenus()}
    >
      <ContextMenu />
      <Desktop />

      {windows.map((win) => {
        const AppComponent = AppRegistry[win.appId];
        if (!AppComponent) return null;

        return (
          <Window key={win.instanceId} windowState={win}>
            <AppComponent instanceId={win.instanceId} />
          </Window>
        );
      })}

      <StartMenu />
      <SearchMenu />
      <WidgetsPanel />
      <QuickSettingsPanel />
      <Taskbar />

      <div className="fixed top-4 right-4 text-white/50 text-xs text-right cursor-default pointer-events-none select-none drop-shadow-md">
        <p>Windows 11 Portfolio Edition</p>
        <p>Evaluation copy. Build 22621.ni_release</p>
      </div>
    </div>
  );
}
