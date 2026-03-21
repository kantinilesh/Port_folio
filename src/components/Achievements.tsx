import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { ACHIEVEMENTS } from '../data';
import { useSoundController } from '../hooks/useSoundController';

const ease = [0.16, 1, 0.3, 1] as const;

export function Achievements() {
  const { playHover } = useSoundController();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 pointer-events-none">
      <div className="max-w-6xl w-full relative z-10 pointer-events-auto">
        <SectionHeader
          world="TROPHIES"
          title="Achievements"
          subtitle="Milestones unlocked."
          accent="#FFD700"
        />

        <div className="grid sm:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={ach.title}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ margin: '-20%' }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease }}
              className="group p-6 sm:p-8 border border-white/[0.06] bg-black/40 backdrop-blur-md hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden text-center"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shine-sweep"
                style={{
                  background: `linear-gradient(105deg, transparent 40%, ${ach.shine}08 45%, ${ach.shine}15 50%, ${ach.shine}08 55%, transparent 60%)`,
                }}
              />

              <div className="text-4xl sm:text-5xl mb-5 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                {ach.icon}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-2">
                {ach.title}
              </h3>
              <p className="text-white/35 text-xs font-light leading-relaxed">
                {ach.description}
              </p>

              <div className="mt-5 flex justify-center gap-0.5">
                <div className="w-1.5 h-1.5 opacity-30 group-hover:opacity-80 transition-opacity" style={{ backgroundColor: ach.shine }} />
                <div className="w-1.5 h-1.5 opacity-20 group-hover:opacity-60 transition-opacity" style={{ backgroundColor: ach.shine }} />
                <div className="w-1.5 h-1.5 opacity-10 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: ach.shine }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
