'use client';

import { useStore, AppType } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Icons } from './Icons';

const desktopApps: AppType[] = [
  { id: 'portfolio', title: 'Portfolio', icon: Icons.portfolioSite },
  { id: 'chrome', title: 'Google Chrome', icon: Icons.chrome },
  { id: 'resume', title: 'Resume', icon: Icons.resume },
  { id: 'projects', title: 'Projects', icon: Icons.projects },
  { id: 'vscode', title: 'VSCode', icon: Icons.vscode },
  { id: 'linkedin', title: 'LinkedIn', icon: Icons.linkedin },
  { id: 'figma', title: 'Figma', icon: Icons.figma },
  { id: 'certificates', title: 'Certificates', icon: Icons.certificates },
  { id: 'camera', title: 'Camera', icon: Icons.camera },
  { id: 'comments', title: 'Comments', icon: Icons.comments },
  { id: 'trash', title: 'Trash', icon: Icons.trash },
  { id: 'terminal', title: 'Terminal', icon: Icons.terminal },
];

export const Desktop = () => {
  const { openApp, closeStartMenu } = useStore();

  return (
    <div 
      className="absolute inset-0 p-4 pt-10"
      onClick={closeStartMenu}
    >
      <div className="flex flex-col flex-wrap gap-4 h-[calc(100vh-60px)] content-start">
        {desktopApps.map((app) => (
          <motion.div
            key={app.id}
            onDoubleClick={() => {
              if (app.id === 'linkedin') {
                window.open('https://linkedin.com/in/imsaurabhkumar1', '_blank');
              } else {
                openApp(app);
              }
            }}
            className="w-[84px] p-2 flex flex-col items-center justify-start rounded border border-transparent hover:bg-black/10 hover:dark:bg-white/10 hover:border-black/20 hover:dark:border-white/20 transition cursor-pointer gap-1"
          >
            <app.icon size={48} className="drop-shadow-md" />
            <span 
              className="text-xs text-white text-center line-clamp-2 leading-tight" 
              style={{textShadow: '0px 1px 2px rgba(0, 0, 0, 0.8)'}}
            >
              {app.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
