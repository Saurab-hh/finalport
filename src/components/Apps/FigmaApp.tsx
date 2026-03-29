import React from 'react';
import { MousePointer2, Frame, Type, Square, Layout, Maximize2, Layers } from 'lucide-react';

export const FigmaApp = () => {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-[#f5f5f5] font-sans text-xs">
      {/* Top Toolbar */}
      <div className="h-12 bg-[#2c2c2c] border-b border-[#111] flex items-center px-4 justify-between">
         <div className="flex items-center gap-4">
           {/* Tools */}
           <div className="flex items-center gap-3">
             <MousePointer2 size={16} className="text-[#0acf83] cursor-pointer" />
             <Frame size={16} className="opacity-70 hover:opacity-100 cursor-pointer" />
             <Square size={16} className="opacity-70 hover:opacity-100 cursor-pointer" />
             <Type size={16} className="opacity-70 hover:opacity-100 cursor-pointer" />
           </div>
         </div>

         {/* Title Centered */}
         <div className="flex items-center gap-2 font-medium opacity-80 cursor-default">
           <Layers className="text-[#f24e1e]" size={14} /> Saurabh Portfolio Design
           <span className="px-1.5 py-0.5 rounded bg-[#444] text-[10px]">Drafts</span>
         </div>

         {/* Share & Play */}
         <div className="flex items-center gap-3">
           <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">S</div>
           <button className="h-7 px-3 bg-[#0acf83] text-black font-semibold rounded hover:bg-[#12b87f] transition-colors rounded-md text-[11px]">
             Share
           </button>
           <Play size={16} className="opacity-70 cursor-pointer" />
           <Maximize2 size={14} className="opacity-70 cursor-pointer ml-1" />
         </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-56 bg-[#2c2c2c] border-r border-[#111] flex flex-col">
          <div className="h-10 flex items-center px-4 font-semibold text-[11px] opacity-70 cursor-default">
            Layers
          </div>
          <div className="flex flex-col gap-1 px-2 pt-1">
             <div className="px-2 py-1.5 hover:bg-[#444] rounded flex items-center gap-2 cursor-pointer bg-[#444]">
               <Frame size={12} className="opacity-70 text-[#0acf83]" />
               <span className="font-medium text-[11px]">Desktop Layout</span>
             </div>
             <div className="px-4 py-1.5 hover:bg-[#444] rounded flex items-center gap-2 cursor-pointer">
               <Layout size={12} className="opacity-70 text-[#f24e1e]" />
               <span className="text-[11px]">Desktop Background</span>
             </div>
             <div className="px-4 py-1.5 hover:bg-[#444] rounded flex items-center gap-2 cursor-pointer">
               <Square size={12} className="opacity-70 text-blue-400" />
               <span className="text-[11px]">Taskbar Shape</span>
             </div>
             <div className="px-4 py-1.5 hover:bg-[#444] rounded flex items-center gap-2 cursor-pointer">
               <Type size={12} className="opacity-70 text-gray-300" />
               <span className="text-[11px]">App Icon Label</span>
             </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#1e1e1e] flex justify-center items-center overflow-auto relative">
           <div className="absolute top-4 left-4 text-[#888] font-medium pointer-events-none text-xs">
             Page 1
           </div>
           
           <div className="shadow-2xl border border-[#444] bg-gradient-to-br from-[#121212] to-[#3a3a3a] w-[400px] h-[300px] sm:w-[500px] sm:h-[350px] relative rounded">
              <div className="absolute top-0 right-0 left-0 h-4 bg-white/10 flex items-center justify-center text-[8px] text-white/50 border-b border-black/20">
                1920 x 1080 - Desktop Layout
              </div>
              <div className="absolute inset-4 flex pt-4 gap-4">
                 <div className="w-10 h-10 border-2 border-dashed border-[#0acf83] rounded-md bg-[#0acf83]/10" />
                 <div className="w-10 h-10 bg-white/20 rounded-md shadow-sm" />
                 <div className="w-10 h-10 bg-white/20 rounded-md shadow-sm" />
              </div>
           </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 bg-[#2c2c2c] border-l border-[#111] flex flex-col p-4 gap-4 overflow-y-auto">
          <div>
            <div className="font-semibold text-xs opacity-70 mb-2">Design</div>
            <div className="flex gap-2 p-1 bg-[#222] rounded-md">
              <div className="flex-1 text-center py-1 bg-[#444] rounded-md shadow-sm cursor-pointer">Design</div>
              <div className="flex-1 text-center py-1 opacity-50 hover:opacity-100 cursor-pointer">Prototype</div>
              <div className="flex-1 text-center py-1 opacity-50 hover:opacity-100 cursor-pointer">Inspect</div>
            </div>
          </div>
          
          <div className="border-t border-[#444] pt-3">
             <div className="flex items-center justify-between text-[#888] font-semibold text-xs mb-2">
               <span>Layout</span>
             </div>
             <div className="grid grid-cols-2 gap-2 text-[10px]">
               <div className="flex items-center flex-col gap-1 bg-[#1e1e1e] p-2 rounded border border-[#333]">
                 <span className="text-[#888]">W</span>
                 <span className="font-mono">1920</span>
               </div>
               <div className="flex items-center flex-col gap-1 bg-[#1e1e1e] p-2 rounded border border-[#333]">
                 <span className="text-[#888]">H</span>
                 <span className="font-mono">1080</span>
               </div>
             </div>
          </div>

          <div className="border-t border-[#444] pt-3 flex flex-col gap-2">
             <div className="text-[#888] font-semibold">Fill</div>
             <div className="flex items-center gap-2 bg-[#1e1e1e] p-1.5 rounded border border-[#333]">
                <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-[#121212] to-[#3a3a3a] border border-[#555]" />
                <span className="font-mono opacity-80 uppercase flex-1 text-center">Linear Background</span>
             </div>
          </div>

          <div className="border-t border-[#444] pt-3 flex flex-col gap-2">
             <div className="text-[#888] font-semibold">Stroke</div>
             <div className="flex justify-between items-center bg-[#1e1e1e] px-2 py-1.5 rounded border border-[#333]">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0acf83]" />
                  <span>#0ACF83</span>
               </div>
               <span className="font-mono text-[10px] opacity-70">100%</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Quick component to simulate a play button since we didn't import it
const Play = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);
