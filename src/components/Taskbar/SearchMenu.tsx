'use client';

import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, History, TrendingUp, MonitorPlay, Image as ImageIcon, Newspaper } from 'lucide-react';
import { useState } from 'react';

export const SearchMenu = () => {
  const { searchMenuOpen } = useStore();
  const [query, setQuery] = useState('');

  if (!searchMenuOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-[60px] left-1/2 -translate-x-1/2 ml-10 w-[600px] h-[700px] bg-[#fbfbfb]/90 dark:bg-[#202020]/90 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden text-black dark:text-white font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-6 pb-2 border-b border-black/5 dark:border-white/5 relative">
          <Search size={20} className="absolute left-10 top-1/2 -translate-y-1/2 text-blue-500" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type here to search"
            className="w-full h-12 bg-white dark:bg-[#2d2d2d] border border-black/10 dark:border-white/10 rounded-xl pl-12 pr-4 outline-none focus:border-blue-500 transition-colors shadow-sm text-lg"
            autoFocus
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
          
          {query ? (
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Local Results for "{query}"</h3>
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                <Search className="text-gray-400" size={20} />
                <span>Search the web for "{query}"</span>
              </div>
            </div>
          ) : (
            <>
              {/* Top Apps */}
              <section>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-sm">Top apps</h3>
                </div>
                <div className="flex gap-2">
                  {['Edge', 'Settings', 'VSCode'].map(app => (
                    <div key={app} className="flex-1 flex flex-col items-center justify-center p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer border border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#2a2a2a]/50">
                      <div className="w-8 h-8 bg-blue-500 rounded-md mb-2 shadow-sm" />
                      <span className="text-xs">{app}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Searches */}
              <section className="mt-2">
                <h3 className="font-semibold text-sm mb-3">Quick searches</h3>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                    <TrendingUp size={16} className="text-gray-500" />
                    <span className="text-sm">Today's top tech news</span>
                  </div>
                  <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                    <MonitorPlay size={16} className="text-gray-500" />
                    <span className="text-sm">New movies in theaters</span>
                  </div>
                  <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                    <History size={16} className="text-gray-500" />
                    <span className="text-sm">Local weather forecast</span>
                  </div>
                </div>
              </section>
            </>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
