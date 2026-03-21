import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { ACHIEVEMENTS } from '../data';
import { MagneticCard } from './effects/MagneticCard';

const ease = [0.16, 1, 0.3, 1] as const;

export function Achievements() {
  return (
    <section id="achievements" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <SectionHeader number="05" title="Recognition" />

        <div className="grid sm:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((ach: { title: string; description: string; year: string }, i: number) => (
            <MagneticCard key={ach.title} strength={0.1}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease }}
                className="group p-7 border border-white/[0.05] bg-surface hover:bg-surface-light hover:border-white/[0.08] transition-all duration-500"
              >
                <span className="text-accent/20 text-[10px] font-mono tracking-[0.15em] block mb-5">
                  {ach.year}
                </span>

                <div className="w-6 h-[1px] bg-accent/15 group-hover:w-12 group-hover:bg-accent/35 transition-all duration-700 mb-5" />

                <h3 className="font-display text-base sm:text-lg font-medium text-white/85 tracking-tight mb-2">
                  {ach.title}
                </h3>
                <p className="text-white/25 text-xs font-light leading-relaxed">
                  {ach.description}
                </p>
              </motion.div>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  );
}
