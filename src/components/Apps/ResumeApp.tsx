import React from 'react';
import { Download, Printer, Plus, Minus, FileText } from 'lucide-react';

export const ResumeApp = () => {
  const pdfPath = "/updated cv 2026. (2).pdf";

  return (
    <div className="flex flex-col h-full bg-[#323639] text-white font-sans overflow-hidden">
      {/* Top Toolbar - PDF Reader Style */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#323639] border-b border-black/20 shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <FileText size={20} className="text-red-400" />
          <span className="text-sm font-semibold select-none">updated cv 2026. (2).pdf</span>
        </div>
        <div className="flex items-center gap-4 bg-black/20 px-3 py-1 rounded-md">
          <button className="p-1 hover:bg-white/10 rounded transition"><Minus size={16} /></button>
          <span className="text-xs select-none">100%</span>
          <button className="p-1 hover:bg-white/10 rounded transition"><Plus size={16} /></button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition" title="Print" onClick={() => {
            const iframe = document.getElementById('resume-pdf-iframe') as HTMLIFrameElement;
            if (iframe && iframe.contentWindow) {
              iframe.contentWindow.print();
            } else {
              window.print();
            }
          }}><Printer size={18} /></button>
          <a href={pdfPath} download="Saurabh_Kumar_Resume_2026.pdf" className="p-2 hover:bg-white/10 rounded-full transition text-white" title="Download"><Download size={18} /></a>
        </div>
      </div>

      {/* Actual PDF Viewer */}
      <div className="flex-1 w-full relative bg-[#525659]">
        <iframe
          id="resume-pdf-iframe"
          src={`${pdfPath}#toolbar=0&navpanes=0`}
          className="w-full h-full border-none"
          title="Resume PDF Viewer"
        />
      </div>
    </div>
  );
};
