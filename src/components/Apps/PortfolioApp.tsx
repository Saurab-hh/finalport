import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Code2, Server, Database, Monitor, Mail, ExternalLink, Download, ArrowRight, Layers, Sparkles, Terminal, MapPin, Zap, Sun, Moon } from 'lucide-react';

const LinkedinIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size }: { size: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const BentoCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-colors ${className}`}
  >
    {children}
  </motion.div>
);

export const PortfolioApp = () => {
  const [activeSection, setActiveSection] = useState('Home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(true);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);

  // Track mouse for dynamic background glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = ['Home', 'About', 'Skills', 'Experience', 'Education', 'Projects', 'Contact'];

  return (
    <div className={`flex flex-col h-full font-sans overflow-x-hidden relative scroll-smooth overflow-y-auto custom-scrollbar transition-colors duration-500 ${isDark ? 'bg-[#050505] text-gray-100' : 'bg-white text-gray-900'}`}>
      
      {/* Interactive Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Stronger Mouse Follower Glow */}
        <motion.div 
          className={`absolute w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none transition-colors duration-500 ${isDark ? 'bg-blue-600/20' : 'bg-blue-300/40'}`}
          animate={{ x: mousePosition.x - 400, y: mousePosition.y - 400 }}
          transition={{ type: "tween", ease: "circOut", duration: 0.2 }}
        />
        {/* Custom cursor dot */}
        <motion.div 
          className={`absolute w-4 h-4 rounded-full blur-[2px] pointer-events-none z-50 ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}
          animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
          transition={{ type: "tween", ease: "circOut", duration: 0.05 }}
        />
        <motion.div 
          style={{ y: backgroundY }}
          className={`absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] transition-colors duration-500 ${isDark ? 'bg-purple-900/10' : 'bg-purple-300/20'}`} 
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Modern Floating Navbar */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl border px-8 py-3 rounded-full flex justify-between items-center gap-12 shadow-2xl transition-colors duration-500 ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/10'}`}>
        <div className="text-lg font-black tracking-tighter flex items-center gap-1 cursor-pointer" onClick={() => scrollTo('Home')}>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          SAURABH
        </div>
        <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase">
          {navLinks.map((link) => (
            <button 
              key={link} 
              onClick={() => scrollTo(link)}
              className={`transition-colors relative ${activeSection === link ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {link}
              {activeSection === link && (
                <motion.div layoutId="nav-indicator" className="absolute -bottom-2 left-0 right-0 h-px bg-blue-500" />
              )}
            </button>
          ))}
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="ml-4 w-8 h-8 rounded-full border border-gray-500/30 flex items-center justify-center text-gray-500 hover:text-blue-500 transition-colors"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </nav>

      <main className="relative z-10 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto w-full">
        
        {/* 1. Hero Section */}
        <section id="Home" className="min-h-[90vh] flex flex-col justify-center pt-24 pb-12 relative">
          
          {/* Abstract geometric illustrations */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-end overflow-hidden">
             <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
               className={`w-64 h-64 border rounded-full opacity-20 transition-colors duration-500 ${isDark ? 'border-white' : 'border-black'}`}
             />
             <motion.div 
               animate={{ rotate: -360 }} 
               transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
               className={`absolute right-10 top-1/4 w-32 h-32 border-2 border-dashed rounded-full opacity-20 transition-colors duration-500 ${isDark ? 'border-blue-400' : 'border-blue-600'}`}
             />
             <svg className={`absolute right-1/4 bottom-1/4 w-24 h-24 opacity-10 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
               <motion.polygon 
                 points="50 5 95 95 5 95" 
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 100, repeat: Infinity, ease: 'linear' }} 
                 style={{ transformOrigin: '50% 50%' }}
               />
             </svg>
          </div>

          <div className="max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-8 text-xs font-mono text-blue-500 transition-colors duration-500 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
            >
              <Sparkles size={14} /> Open to Software Engineering Roles
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-[7.5rem] font-medium tracking-tighter leading-[0.95] mb-8"
            >
              <span className={`transition-colors duration-500 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>I build</span> <br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r transition-colors duration-500 ${isDark ? 'from-white via-white to-gray-500' : 'from-black via-black to-gray-400'}`}>
                digital experiences.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed mb-12"
            >
              A focused Full-Stack Developer specializing in robust ecosystems, engaging frontends, and scalable architecture.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              <button 
                onClick={() => scrollTo('Projects')} 
                className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-blue-100 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">Explore Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              </button>
              
            <a 
                href="/updated cv 2026. (2).pdf" 
                download="Saurabh_Kumar_CV_2026.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`group px-8 py-4 rounded-full border transition-all flex items-center gap-2 font-medium ${isDark ? 'border-white/20 hover:bg-white/5 text-white' : 'border-black/20 hover:bg-black/5 text-black'}`}
              >
                <Download size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" /> Download CV
              </a>
              
              <div className="flex gap-4 ml-auto md:ml-4">
                <a href="https://github.com/Saurab-hh" target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5' : 'border-black/10 text-gray-500 hover:text-black hover:border-black/30 hover:bg-black/5'}`}><GithubIcon size={20} /></a>
                <a href="https://linkedin.com/in/imsaurabhkumar1" target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5' : 'border-black/10 text-gray-500 hover:text-black hover:border-black/30 hover:bg-black/5'}`}><LinkedinIcon size={20} /></a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. About Section */}
        <section id="About" className="py-24">
          <div className="mb-12">
            <h2 className="text-4xl font-medium tracking-tight mb-4">About Me</h2>
            <p className="text-gray-400">Everything you need to know about who I am.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {/* Bio Card - Large */}
            <BentoCard className="md:col-span-2 p-10 flex flex-col justify-between group">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8">
                <Terminal size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-medium mb-4">Hi, I'm Saurabh.</h3>
                <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
                  I'm pursuing a B.Tech in Computer Science from Lovely Professional University. I specialize in the complete software lifecycle—from database architecture to pixel-perfect UI designs. I love bridging the gap between back-end infrastructure and cutting-edge user experiences.
                </p>
              </div>
            </BentoCard>

            {/* Profile Image Card */}
            <BentoCard delay={0.1} className="md:col-span-1 min-h-[300px] overflow-hidden relative group p-0">
              <img src="/profile.jpg" alt="Saurabh Kumar" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-xl p-3 flex items-center justify-center gap-3 border border-white/10">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-sm font-semibold uppercase tracking-wider text-white">India</span>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* 3. Skills Section */}
        <section id="Skills" className="py-24">
          <div className="mb-12">
            <h2 className="text-4xl font-medium tracking-tight mb-4">Technical Skills</h2>
            <p className="text-gray-400">The tools I use to build digital experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Core Stack */}
            <BentoCard delay={0.2} className="p-8 flex flex-col min-h-[200px]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Layers className="text-purple-400" size={28} />
                </div>
                <h3 className="font-medium text-2xl">Core Stack</h3>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                {['React', 'Next.js', 'Node.js', 'Express', 'Tailwind', 'MongoDB'].map(skill => (
                  <span key={skill} className={`text-sm px-4 py-2 rounded-lg font-medium border transition-all duration-500 hover:-translate-y-1 ${isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-black/5 border-black/10 text-gray-700 hover:bg-black/10'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </BentoCard>

            {/* Languages Stack */}
            <BentoCard delay={0.3} className="p-8 flex flex-col min-h-[200px]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Code2 className="text-emerald-400" size={28} />
                </div>
                <h3 className="font-medium text-2xl">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                {['C', 'C++', 'Java', 'Python', 'JavaScript', 'HTML/CSS'].map(skill => (
                  <span key={skill} className={`text-sm px-4 py-2 rounded-lg font-medium border transition-all duration-500 hover:-translate-y-1 ${isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-black/5 border-black/10 text-gray-700 hover:bg-black/10'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </BentoCard>
          </div>
        </section>

        {/* 4. Experience */}
        <section id="Experience" className="py-32">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12">
            <div>
              <h2 className="text-4xl font-medium tracking-tight mb-4 sticky top-32">Experience.</h2>
            </div>
            <div className="space-y-12">
              
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">Freelance Web Developer</h3>
                  <span className="text-gray-500 font-mono text-sm mt-2 md:mt-0">Jan 2025 - Apr 2025</span>
                </div>
                <h4 className="text-sm font-medium text-gray-400 mb-6 uppercase tracking-widest">TFMM E-Commerce Platform</h4>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Engineered a high-performance e-commerce ecosystem using PHP and MySQL. Optimized complex server-side logic and RESTful pipelines for real-time inventory tracking, reducing cart abandonment rates by 7%.
                </p>
                <div className="flex gap-2 text-xs font-mono text-blue-300 bg-blue-500/10 w-fit px-3 py-1.5 rounded-md">
                  PHP • MySQL • Tailwind
                </div>
              </motion.div>

              <div className="h-px bg-white/5 w-full" />

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">Oracle Cloud Professional</h3>
                  <span className="text-gray-500 font-mono text-sm mt-2 md:mt-0">Aug 2025 - Sep 2025</span>
                </div>
                <h4 className="text-sm font-medium text-gray-400 mb-6 uppercase tracking-widest">Certification Badge</h4>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Certified expertise in advanced cloud architectures, security deployments, and robust infrastructure monitoring.
                </p>
                <div className="flex gap-2 text-xs font-mono text-purple-300 bg-purple-500/10 w-fit px-3 py-1.5 rounded-md">
                  Cloud Computing • Architecture
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 4. Education */}
        <section id="Education" className="py-32">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12">
            <div>
              <h2 className="text-4xl font-medium tracking-tight mb-4 sticky top-32">Education.</h2>
            </div>
            <div className="space-y-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-amber-400 transition-colors">Lovely Professional University</h3>
                  <span className="text-gray-500 font-mono text-sm mt-2 md:mt-0">2023 - Present</span>
                </div>
                <h4 className="text-sm font-medium text-gray-400 mb-6 uppercase tracking-widest">B.Tech in Computer Science</h4>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Studying rigorous foundational computer science, data structures, algorithms, and practical software engineering principles. Active participant in coding clubs and continuous learning ecosystems.
                </p>
                <div className="flex gap-2 text-xs font-mono text-amber-300 bg-amber-500/10 w-fit px-3 py-1.5 rounded-md">
                  Academics • Computer Science
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. Projects Showcase */}
        <section id="Projects" className="py-32">
          <h2 className="text-4xl font-medium tracking-tight mb-16 text-center">Selected Work</h2>
          
          <div className="grid gap-24">
            
            {/* Project 1 */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-2xl group border border-white/10 aspect-[4/3] bg-[#111]">
                <img src="/projects/tfmm.png" alt="TFMM" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <a href="#" className="flex hover:text-blue-400 gap-2 font-medium items-center transition bg-white/10 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/20">
                    Visit Live Site <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px bg-blue-500 w-8" />
                  <span className="text-blue-400 text-sm font-mono tracking-widest uppercase">E-Commerce</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">TFMM Platform</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  A fully responsive digital storefront deployed for a local retail shop. Built entirely from scratch, incorporating secure authentications, administrative dashboards, and a robust cart management system.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {['PHP', 'MySQL', 'JavaScript', 'Tailwind'].map(tech => (
                    <span key={tech} className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-300">{tech}</span>
                  ))}
                </div>
                <a href="https://github.com/Saurab-hh/Tfmm.git" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-blue-400 transition-colors font-medium">
                  View Source <GithubIcon size={20} />
                </a>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:pr-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px bg-green-500 w-8" />
                  <span className="text-green-400 text-sm font-mono tracking-widest uppercase">Web Utility</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">IPNEXUS</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  A high-performance intelligence tool to resolve geographic data for any global IP address under 200ms. Leverages Leaflet.js to chart dynamic maps securely and interactively.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {['Vanilla JS', 'Leaflet.js', 'IP Geolocation API'].map(tech => (
                    <span key={tech} className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-300">{tech}</span>
                  ))}
                </div>
                <a href="https://github.com/Saurab-hh/IP-Nexus.git" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-green-400 transition-colors font-medium">
                  View Source <GithubIcon size={20} />
                </a>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-white/10 aspect-[4/3] bg-[#111]">
                <img src="/projects/ipnexus.png" alt="IPNEXUS" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <a href="#" className="flex hover:text-green-400 gap-2 font-medium items-center transition bg-white/10 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/20">
                    Visit Live Site <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-2xl group border border-white/10 aspect-[4/3] bg-[#111]">
                <img src="/projects/edutrack.png" alt="EDUTRACK" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <a href="#" className="flex hover:text-purple-400 gap-2 font-medium items-center transition bg-white/10 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/20">
                    Visit Live Site <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px bg-purple-500 w-8" />
                  <span className="text-purple-400 text-sm font-mono tracking-widest uppercase">Management System</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">EDUTRACK</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  A massive full-stack academic monitoring ecosystem. Built with a scalable backend and an interactive admin dashboard featuring real-time graphical data analysis.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {['React', 'Node.js', 'Express', 'MongoDB'].map(tech => (
                    <span key={tech} className="px-4 py-2 rounded-full border border-white/10 text-sm text-gray-300">{tech}</span>
                  ))}
                </div>
                <a href="https://github.com/Saurab-hh/EduTrack-Student-progress-tracker.git" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-purple-400 transition-colors font-medium">
                  View Source <GithubIcon size={20} />
                </a>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 5. Contact Area */}
        <section id="Contact" className="py-32 mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <Zap className="mx-auto text-blue-400 mb-8" size={48} />
              <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-8 text-white">Let's build something extraordinary.</h2>
              <p className="text-xl text-gray-300 mb-12">
                Currently exploring new horizons and full-time software engineering roles. Have a project or role in mind?
              </p>
              <a 
                href="mailto:sauravsingh7370@gmail.com" 
                className={`inline-flex items-center gap-3 px-10 py-5 text-lg font-bold rounded-full hover:scale-105 active:scale-95 transition-transform ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
              >
                Start a Conversation <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Modern Minimal Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 bg-[#000]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-500 font-mono">
            © {new Date().getFullYear()} Saurabh Kumar.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Saurab-hh" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition group">
              <GithubIcon size={20} />
            </a>
            <a href="https://linkedin.com/in/imsaurabhkumar1" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition group">
              <LinkedinIcon size={20} />
            </a>
          </div>
          <div className="text-sm text-gray-500">
            Powered by Next.js & Framer Motion
          </div>
        </div>
      </footer>
      
    </div>
  );
};
