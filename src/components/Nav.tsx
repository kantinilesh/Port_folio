import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAV_MODULES } from '../data';

interface NavProps {
  activeSection: string;
}

export function Nav({ activeSection }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-DEFAULT/[0.06]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-1.5 h-5 bg-cyan-DEFAULT/60 group-hover:bg-cyan-DEFAULT transition-colors duration-300" />
          <span className="text-white/60 text-[11px] font-mono tracking-[0.2em] group-hover:text-white transition-colors duration-300">NK_SYS</span>
        </button>

        {/* Modules */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_MODULES.slice(1).map(mod => (
            <button
              key={mod.id}
              onClick={() => scrollTo(mod.id)}
              className={`px-3 py-1.5 text-[9px] font-mono tracking-[0.12em] transition-all duration-300 ${
                activeSection === mod.id
                  ? 'text-cyan-DEFAULT bg-cyan-DEFAULT/[0.06] border border-cyan-DEFAULT/20'
                  : 'text-white/25 hover:text-white/50 border border-transparent'
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/70 animate-pulse-slow" />
          <span className="text-white/15 text-[9px] font-mono tracking-wider hidden sm:block">ONLINE</span>
        </div>
      </div>
    </motion.nav>
  );
}
