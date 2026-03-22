import { motion } from 'framer-motion';
import { PERSONAL } from '../data';
import { ScrambleText } from './effects/ScrambleText';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">

        {/* System tag — simple fade in, no scramble */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="inline-flex items-center gap-2.5 mb-10 px-4 py-1.5 border border-cyan-DEFAULT/15 bg-cyan-DEFAULT/[0.03]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/70 animate-pulse" />
          <span className="text-cyan-DEFAULT/50 text-[10px] font-mono tracking-[0.2em]">AI SYSTEMS INITIALIZED</span>
        </motion.div>

        {/* Name — simple, bold, no scramble animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[0.95]"
        >
          <span className="block text-white/90">{PERSONAL.name.split(' ')[0]}</span>
          <span className="block text-cyan-DEFAULT" style={{ textShadow: '0 0 40px rgba(0,212,255,0.4)' }}>
            {PERSONAL.name.split(' ')[1]}
          </span>
        </motion.h1>

        {/* Role — ScrambleText on hover only (plays once, not auto) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          className="text-sm sm:text-base font-mono text-white/35 mb-4 tracking-wide"
        >
          <ScrambleText text={PERSONAL.role} trigger="hover" speed={25} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6, ease }}
          className="text-white/25 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed"
        >
          {PERSONAL.tagline}
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2, ease }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {PERSONAL.stats.map((stat) => (
            <div
              key={stat.label}
              className="glass p-4 text-center group hover:border-cyan-DEFAULT/25 transition-all duration-500"
            >
              <p className="text-xl sm:text-2xl font-bold text-cyan-DEFAULT/90 mb-1">{stat.value}</p>
              <p className="text-white/20 text-[9px] font-mono tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4, ease }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 bg-cyan-DEFAULT/10 border border-cyan-DEFAULT/25 text-cyan-DEFAULT/80 hover:bg-cyan-DEFAULT/15 hover:text-cyan-DEFAULT hover:border-cyan-DEFAULT/40 transition-all duration-300 text-xs font-mono tracking-wider"
          >
            VIEW SIMULATIONS →
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 border border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/12 transition-all duration-300 text-xs font-mono tracking-wider"
          >
            OPEN TERMINAL
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.8 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/10 text-[9px] font-mono tracking-[0.25em]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 bg-gradient-to-b from-cyan-DEFAULT/25 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
