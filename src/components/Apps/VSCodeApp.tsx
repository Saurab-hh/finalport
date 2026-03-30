import React, { useState } from 'react';
import { Files, Search, GitBranch, Play, Settings, Menu, X, Minus, Square } from 'lucide-react';

const files = [
  { name: 'app.js', type: 'js', code: 'console.log("Hello IPNEXUS");\n\nfunction fetchIP() {\n  return fetch("https://api.ipify.org?format=json")\n    .then(res => res.json())\n    .then(data => console.log(data.ip));\n}\n\nfetchIP();\n' },
  { name: 'resume.json', type: 'json', code: '{\n  "name": "Saurabh Kumar",\n  "contact": {\n    "email": "sauravsingh7370@gmail.com",\n    "github": "github.com/Saurab-hh"\n  },\n  "skills": ["JavaScript", "C++", "React.js", "Node.js"]\n}' },
  { name: 'styles.css', type: 'css', code: 'body {\n  margin: 0;\n  padding: 0;\n  background-color: #121212;\n  color: #fff;\n  font-family: inherit;\n}\n\n.app-container {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n}\n' }
];

export const VSCodeApp = () => {
  const [activeFile, setActiveFile] = useState(0);
  const activeCode = files[activeFile].code;

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-[#cccccc] font-sans text-sm select-none">
      {/* Title bar */}
      <div className="flex justify-between items-center h-8 bg-[#323233] px-2 text-[11px]">
        <div className="flex items-center gap-3 opacity-80 cursor-default">
          <Menu size={14} />
          <span>File</span>
          <span>Edit</span>
          <span>Selection</span>
          <span>View</span>
          <span>Go</span>
          <span>Run</span>
          <span>Terminal</span>
        </div>
        <div className="flex-1 text-center font-semibold text-[#8b8b8b]">
          {files[activeFile].name} - Saurabh-Portfolio - Visual Studio Code
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 text-[#858585]">
          <Files size={24} className="text-white cursor-pointer hover:text-white transition-colors" />
          <Search size={24} className="cursor-pointer hover:text-white transition-colors" />
          <GitBranch size={24} className="cursor-pointer hover:text-white transition-colors" />
          <Play size={24} className="cursor-pointer hover:text-white transition-colors" />
          <div className="flex-1" />
          <Settings size={22} className="cursor-pointer hover:text-white transition-colors" />
        </div>

        {/* Sidebar */}
        <div className="w-48 bg-[#252526] border-r border-[#1e1e1e] flex flex-col">
          <div className="h-8 flex items-center px-4 font-semibold text-[11px] uppercase tracking-wider text-[#bbbbbb]">
            Explorer
          </div>
          <div className="px-2 py-1 flex items-center gap-1 font-bold text-xs opacity-90 cursor-default">
            SAURABH-PORTFOLIO
          </div>
          <div className="flex flex-col items-stretch mt-1">
            {files.map((file, idx) => (
              <div 
                key={file.name}
                onClick={() => setActiveFile(idx)}
                className={`py-1 px-4 text-xs cursor-pointer flex items-center gap-2 hover:bg-[#2a2d2e] ${activeFile === idx ? 'bg-[#37373d] text-white' : ''}`}
              >
                <div className={`w-2 h-2 rounded-full ${file.type === 'js' ? 'bg-yellow-400' : file.type === 'json' ? 'bg-green-400' : 'bg-blue-400'}`} />
                {file.name}
              </div>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-[#1e1e1e] flex flex-col">
           {/* Editor Tabs */}
           <div className="h-9 bg-[#252526] flex items-end">
              {files.map((file, idx) => (
                <div 
                  key={file.name}
                  onClick={() => setActiveFile(idx)}
                  className={`h-full flex items-center gap-2 px-3 border-r border-[#1e1e1e] min-w-[120px] max-w-[200px] cursor-pointer group ${activeFile === idx ? 'bg-[#1e1e1e] text-white border-t border-t-blue-500' : 'bg-[#2d2d2d] hover:bg-[#2b2b2b]'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${file.type === 'js' ? 'bg-yellow-400' : file.type === 'json' ? 'bg-green-400' : 'bg-blue-400'}`} />
                  <span className="text-sm truncate mr-auto">{file.name}</span>
                  <X size={14} className={`opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-[#4d4d4d] ${activeFile === idx ? 'opacity-100' : ''}`} />
                </div>
              ))}
           </div>

           {/* Code View */}
           <div className="flex-1 overflow-auto p-4 custom-scrollbar font-mono text-[13px] leading-relaxed">
             <pre className="text-green-400 whitespace-pre-wrap"><code className="language-javascript">
               {activeCode}
             </code></pre>
           </div>
        </div>
      </div>
      
      {/* Status bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center px-3 text-[10px] justify-between">
         <div className="flex items-center gap-4">
           <span className="flex items-center gap-1"><GitBranch size={12} /> main*</span>
           <span>0 ⚠  0 ⛔</span>
         </div>
         <div className="flex items-center gap-4">
           <span>Ln 12, Col 43</span>
           <span>Spaces: 2</span>
           <span>UTF-8</span>
           <span>CRLF</span>
           <span>{files[activeFile].type.toUpperCase()}</span>
         </div>
      </div>
    </div>
  );
};
