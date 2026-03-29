'use client';

import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export const WidgetsPanel = () => {
  const { widgetsOpen } = useStore();

  if (!widgetsOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 left-4 h-[calc(100vh-64px)] w-[600px] z-[9998] flex gap-4"
      >
        <div className="flex-1 bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl p-6 overflow-y-auto">
          <div className="text-xl font-semibold mb-6">Widgets</div>
          
          <div className="space-y-4">
            {/* Weather Widget */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Toronto, ON</h3>
                  <p className="text-sm opacity-80">Mostly Sunny</p>
                </div>
                <div className="text-4xl text-yellow-300">☀️</div>
              </div>
              <div className="text-5xl font-bold mb-4">72°</div>
              <div className="flex gap-4 text-sm opacity-90">
                <span>UV: Strong</span>
                <span>Humidity: 0%</span>
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="bg-white/50 dark:bg-white/5 rounded-xl p-4 shadow-lg border border-white/20">
              <h3 className="text-lg font-medium mb-3">Calendar</h3>
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
                <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={`p-1 rounded ${i === 25 ? 'bg-blue-500 text-white' : 'hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer'}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Todo Widget */}
            <div className="bg-white/50 dark:bg-white/5 rounded-xl p-4 shadow-lg border border-white/20">
              <h3 className="text-lg font-medium mb-3">To Do - My Day</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                No new notifications or tasks
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
