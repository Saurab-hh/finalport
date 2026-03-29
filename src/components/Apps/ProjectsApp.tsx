import React from 'react';
import { Folder, ExternalLink, Terminal, Layout, Database } from 'lucide-react';

const projects = [
  {
    title: 'TFMM E-Commerce Platform',
    date: 'Jan 2025 - Apr 2025',
    description: 'High-performance e-commerce ecosystem slashing administrative workload by 8 hours/week.',
    techs: ['PHP', 'MySQL', 'Tailwind', 'JS'],
    icon: <img src="/projects/tfmm.png" alt="TFMM Website Model" className="w-full h-full object-cover rounded-lg" />,
    github: 'https://github.com/Saurab-hh/Tfmm.git'
  },
  {
    title: 'IPNEXUS IP Tracking',
    date: 'Jun 2025 - Jul 2025',
    description: 'Real-time IP intelligence tool rendering high-precision interactive maps with Leaflet.js.',
    techs: ['HTML', 'CSS', 'Vanilla JS', 'Leaflet.js'],
    icon: <img src="/projects/ipnexus.png" alt="IPNEXUS UI" className="w-full h-full object-cover rounded-lg" />,
    github: 'https://github.com/Saurab-hh/IP-Nexus.git'
  },
  {
    title: 'EDUTRACK',
    date: 'Sep 2024 - Nov 2024',
    description: 'Student Progress Tracker enabling real-time attendance and academic monitoring ecosystem.',
    techs: ['React', 'Node.js', 'Express', 'MongoDB'],
    icon: <img src="/projects/edutrack.png" alt="EDUTRACK App UI" className="w-full h-full object-cover rounded-lg" />,
    github: 'https://github.com/Saurab-hh/EduTrack-Student-progress-tracker.git'
  }
];

export const ProjectsApp = () => {
  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#1e1e1e] text-black dark:text-white overflow-hidden">
      {/* Top Bar */}
      <div className="h-12 bg-white/50 dark:bg-black/20 flex items-center px-4 border-b border-black/10 dark:border-white/10 gap-4 backdrop-blur-md">
        <Folder className="text-yellow-500" size={20} />
        <span className="font-semibold text-sm">C:\Users\Saurabh\Projects</span>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <h1 className="text-2xl font-bold mb-6">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div className="bg-white dark:bg-[#2d2d2d] border border-black/5 dark:border-white/5 rounded-xl p-5 hover:shadow-xl transition-shadow flex flex-col group cursor-pointer h-full">
              <div className="bg-gray-100 dark:bg-[#1a1a1a] h-32 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-50 dark:group-hover:bg-white/5 transition-colors shrink-0">
                {proj.icon}
              </div>
              <h2 className="text-lg font-bold mb-1">{proj.title}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{proj.date}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 flex-1">{proj.description}</p>
              <div className="flex flex-wrap gap-2 mb-4 shrink-0">
                {proj.techs.map((tech, i) => (
                  <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-3 border-t border-gray-100 dark:border-white/5 shrink-0">
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-500 transition-colors">
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> Github
                </a>
                <button className="flex items-center gap-1.5 text-sm font-medium hover:text-blue-500 transition-colors">
                  <ExternalLink size={14} /> Live
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
