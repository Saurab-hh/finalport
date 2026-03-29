'use client';

import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

import { Icons } from '@/components/Desktop/Icons';
import { HelpCircle, Mail, Map } from 'lucide-react';

export const StartMenu = () => {
  const { startMenuOpen, openApp, toggleStartMenu } = useStore();

  const pinnedApps = [
    { id: 'portfolio', title: 'Portfolio', icon: Icons.portfolioSite },
    { id: 'resume', title: 'Resume', icon: Icons.resume },
    { id: 'projects', title: 'Projects', icon: Icons.projects },
    { id: 'vscode', title: 'VSCode', icon: Icons.vscode },
    { id: 'figma', title: 'Figma', icon: Icons.figma },
    { id: 'comments', title: 'Comments', icon: Icons.comments },
    { id: 'terminal', title: 'Terminal', icon: Icons.terminal },
    { id: 'trash', title: 'Trash', icon: Icons.trash }
  ];

  return (
    <AnimatePresence>
      {startMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-[60px] left-1/2 -translate-x-1/2 w-[600px] h-[650px] bg-white/70 dark:bg-[#202020]/90 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8 pb-4 flex flex-col h-full overflow-y-auto">
            {/* Search Box */}
            <div className="w-full h-10 bg-white/50 dark:bg-black/50 border border-black/10 dark:border-white/20 rounded-full flex items-center px-4 mb-8 transition hover:bg-white/80 dark:hover:bg-white/10 shadow-sm cursor-text">
              <span className="text-gray-500 text-sm">Type here to search</span>
            </div>

            <div className="flex justify-between items-center mb-6 px-2">
              <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Pinned</h3>
              <button className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/5 px-3 py-1 rounded hover:bg-white/60 dark:hover:bg-white/10 transition">All apps {'>'}</button>
            </div>

            <div className="grid grid-cols-6 gap-x-2 gap-y-6 mb-8">
              {pinnedApps.map((app) => (
                <div 
                  key={app.id} 
                  onClick={() => openApp(app)}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 cursor-pointer transition"
                >
                  <app.icon size={36} className="drop-shadow-sm mb-2" />
                  <span className="text-xs text-gray-800 dark:text-gray-200">{app.title}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4 mt-auto px-2">
              <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => openApp({ id: 'portfolio', title: 'Portfolio', icon: Icons.portfolioSite })}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition border border-transparent hover:border-blue-200 dark:hover:border-blue-800/50"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Map size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Guide to Portfolio</div>
                    <div className="text-xs text-gray-500">Explore my work visually</div>
                  </div>
                </div>

                <div 
                  onClick={() => window.open('mailto:souravvsing@gmail.com')}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 cursor-pointer transition border border-transparent hover:border-green-200 dark:hover:border-green-800/50"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Connect to Me</div>
                    <div className="text-xs text-gray-500">souravvsing@gmail.com</div>
                  </div>
                </div>
            </div>
          </div>

        <div className="h-16 bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10 px-8 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3 hover:bg-black/10 dark:hover:bg-white/10 p-2 rounded-lg cursor-pointer transition">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10">
              <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Saurabh Kumar</span>
          </div>
          <button className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg cursor-pointer transition text-gray-700 dark:text-gray-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"/></svg>
          </button>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
