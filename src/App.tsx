import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Loader } from './components/Loader';
import { SpotlightCursor } from './components/effects/SpotlightCursor';

import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';

const NAV_ITEMS = ['About', 'Skills', 'Experience', 'Projects', 'Achievements', 'Contact'] as const;

function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-black text-white dot-grid grain min-h-screen">
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <SpotlightCursor />

          {/* Nav Bar */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
              scrolled
                ? 'bg-black/60 backdrop-blur-xl border-b border-white/[0.04]'
                : 'bg-transparent'
            }`}
          >
            <div className="max-w-5xl mx-auto flex items-center justify-between px-6 h-16">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-white/50 text-xs font-mono tracking-[0.15em] hover:text-white transition-colors"
              >
                NK
              </button>

              <div className="hidden sm:flex items-center gap-6">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className="text-white/25 text-[10px] font-mono tracking-[0.15em] uppercase hover:text-white/60 transition-colors duration-300"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>

          {/* Sections */}
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
