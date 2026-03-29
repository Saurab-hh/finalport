import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Home, Lock, Menu, Plus, X } from 'lucide-react';

export const ChromeApp = () => {
  const [urlInput, setUrlInput] = useState('https://www.wikipedia.org');
  const [currentUrl, setCurrentUrl] = useState('https://www.wikipedia.org');
  
  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let url = urlInput.trim();
    if (!url) return;
    
    // Auto add https if missing and not localhost
    if (!/^https?:\/\//i.test(url) && !url.includes('localhost')) {
      // If it looks like a domain, prepend https, else maybe it's a search
      if (url.includes('.')) {
        url = `https://${url}`;
      } else {
        // Mock Google search via Bing or DuckDuckGo (which sometimes allow iframe dependng on params, let's use bing for simplicity, or just set it to Wikipedia search)
        url = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(url)}`;
      }
    }
    setUrlInput(url);
    setCurrentUrl(url);
  };

  const handleRefresh = () => {
    const iframe = document.getElementById('chrome-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f1f3f4] dark:bg-[#202124] text-black dark:text-white font-sans overflow-hidden">
      
      {/* Chrome Tabs */}
      <div className="h-10 bg-[#dee1e6] dark:bg-[#1a1b1e] flex items-end px-2 gap-1 select-none">
        <div className="h-8 max-w-[240px] w-48 bg-white dark:bg-[#323639] rounded-t-lg flex items-center justify-between px-3 cursor-default group">
          <div className="flex items-center gap-2 overflow-hidden">
            <img src="https://img.icons8.com/color/48/chrome--v1.png" width={16} alt="Google Chrome" />
            <span className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">New Tab</span>
          </div>
          <X size={14} className="text-gray-500 hover:text-gray-800 dark:hover:text-white bg-transparent hover:bg-black/10 dark:hover:bg-white/10 rounded-full cursor-pointer" />
        </div>
        <div className="w-8 h-8 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 rounded-full mb-0.5 cursor-pointer">
          <Plus size={18} className="text-gray-600 dark:text-gray-400" />
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="h-12 bg-white dark:bg-[#323639] flex items-center px-4 gap-4 border-b border-black/10 dark:border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer text-gray-600 dark:text-gray-300">
            <ChevronLeft size={20} />
          </div>
          <div className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer text-gray-400">
            <ChevronRight size={20} />
          </div>
          <div className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer text-gray-600 dark:text-gray-300" onClick={handleRefresh}>
            <RotateCcw size={16} />
          </div>
          <div className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer text-gray-600 dark:text-gray-300" onClick={() => { setUrlInput('https://www.wikipedia.org'); setCurrentUrl('https://www.wikipedia.org'); }}>
            <Home size={18} />
          </div>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleNavigate} className="flex-1 flex items-center bg-[#f1f3f4] dark:bg-[#202124] rounded-full px-4 py-1.5 gap-2 border border-black/5 dark:border-transparent focus-within:bg-white focus-within:dark:bg-[#2a2b2e] focus-within:shadow-[0_0_0_1px_#1a73e8] transition-all">
          <Lock size={14} className="text-gray-500" />
          <input
            type="text"
            className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer text-gray-600 dark:text-gray-300">
            <Menu size={20} />
          </div>
        </div>
      </div>

      {/* Note about X-Frame-Options */}
      {currentUrl !== 'https://www.wikipedia.org' && (
        <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs px-4 py-1.5 flex justify-between items-center text-center">
          <span>Note: Many websites (like Google/YouTube) block themselves from being embedded in iframes. If the page doesn't load, it's due to security policies.</span>
        </div>
      )}

      {/* Browser View */}
      <div className="flex-1 bg-white relative">
        <iframe
          id="chrome-iframe"
          src={currentUrl}
          className="w-full h-full border-none"
          title="browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

    </div>
  );
};
