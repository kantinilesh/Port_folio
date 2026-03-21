import { motion } from 'framer-motion';
import { PERSONAL } from '../data';
import { SplitFlap } from './effects/SplitFlap';

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-10 h-[1px] bg-accent/20" />
          <span className="text-accent/40 text-[10px] font-mono tracking-[0.3em] uppercase">
            Portfolio 2026
          </span>
          <div className="w-10 h-[1px] bg-accent/20" />
        </motion.div>

        {/* Split Flap Name */}
        <SplitFlap
          text={PERSONAL.name}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] mb-8"
          delay={0.4}
        />

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease }}
          className="text-white/30 text-sm sm:text-base font-light tracking-wide max-w-md"
        >
          {PERSONAL.role}
        </motion.p>

        {/* Coordinates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6, ease }}
          className="mt-12 flex items-center gap-6 text-white/10 text-[10px] font-mono tracking-[0.15em]"
        >
          <span>FULL-STACK</span>
          <div className="w-1 h-1 bg-accent/30 rounded-full" />
          <span>AI / ML</span>
          <div className="w-1 h-1 bg-accent/30 rounded-full" />
          <span>CLOUD</span>
        </motion.div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2, ease }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-white/10 text-[9px] font-mono tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 bg-gradient-to-b from-accent/20 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
