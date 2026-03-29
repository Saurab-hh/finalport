import React, { useState } from 'react';
import { Award, ExternalLink, ShieldCheck, Download, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const CertificatesApp = () => {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // You can later replace these URLs with the actual paths to your certificates
  const certificates = [
    {
      id: "1",
      title: "Master Generative AI & Generative AI tools (ChatGPT & more)",
      issuer: "Udemy",
      date: "August 2025",
      image: "/certificates/udemy-genai.png", 
      skills: ["Generative AI", "ChatGPT", "AI Tools"]
    },
    {
      id: "2",
      title: "Cloud Computing",
      issuer: "NPTEL (IIT Kharagpur)",
      date: "Jan - Apr 2025",
      image: "/certificates/nptel-cloud.png", 
      skills: ["Cloud Computing", "Distributed Systems"]
    },
    {
      id: "3",
      title: "ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM",
      issuer: "Infosys Springboard",
      date: "August 2025",
      image: "/certificates/infosys-prompt.png", 
      skills: ["Prompt Engineering", "ChatGPT", "LLM"]
    },
    {
      id: "4",
      title: "Build Generative AI Apps and Solutions with No-Code Tools",
      issuer: "Infosys Springboard",
      date: "August 2025",
      image: "/certificates/infosys-nocode.png", 
      skills: ["Generative AI", "No-Code Development"]
    },
    {
      id: "5",
      title: "Computational Theory: Language Principle & Finite Automata Theory",
      issuer: "Infosys Springboard",
      date: "August 2025",
      image: "/certificates/infosys-automata.png", 
      skills: ["Finite Automata", "Computational Theory"]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#1a1c1e] text-black dark:text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="h-16 flex items-center px-6 gap-4 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-xl shrink-0">
        <div className="p-2.5 bg-yellow-500/20 rounded-xl text-yellow-600 dark:text-yellow-400">
          <Award size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400">My Certificates</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Professional achievements and verified credentials</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-500" />
              Verified Credentials
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search certificates..." 
                className="pl-10 pr-4 py-2 rounded-full bg-white dark:bg-[#2a2d30] border border-black/5 dark:border-white/5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-shadow w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <motion.div 
                key={cert.id}
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-[#2a2d30] rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col cursor-pointer"
                onClick={() => setSelectedCert(cert.image)}
              >
                <div className="aspect-[4/3] bg-gray-100 dark:bg-[#202224] relative overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-4">
                    <span className="text-white text-sm font-medium flex items-center gap-1"><Search size={14}/> Click to view</span>
                  </div>
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover rounded shadow-lg group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 leading-tight mb-2">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                    <span className="font-medium text-blue-600 dark:text-blue-400">{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-[#202224] text-[10px] font-medium text-gray-600 dark:text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Modal for viewing certificate fullscreen */}
        {selectedCert && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 animate-in fade-in duration-200"
            onClick={() => setSelectedCert(null)}
          >
            <div 
              className="relative max-w-5xl max-h-full w-full h-full flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute -top-4 -right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                onClick={() => setSelectedCert(null)}
              >
                ✕
              </button>
              <img 
                src={selectedCert} 
                alt="Certificate full view" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10" 
              />
              <div className="mt-4 flex gap-4">
                <a 
                  href={selectedCert} 
                  download 
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
                >
                  <Download size={16} /> Download PDF
                </a>
                <button className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors">
                  <ExternalLink size={16} /> Verify Credential
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
