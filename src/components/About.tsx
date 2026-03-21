import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { PERSONAL, STATS, ABOUT_EXPERTISE } from '../data';
import { BlurText } from './effects/BlurText';
import { MagneticCard } from './effects/MagneticCard';

const ease = [0.16, 1, 0.3, 1] as const;

export function About() {
  return (
    <section id="about" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <SectionHeader number="01" title="About" />

        <div className="grid md:grid-cols-5 gap-16 mb-20">
          <div className="md:col-span-3 space-y-4">
            {PERSONAL.bio.map((para: string, i: number) => (
              <BlurText
                key={i}
                delay={i * 0.15}
                className="text-white/40 text-sm sm:text-base font-light leading-[1.9]"
              >
                {para}
              </BlurText>
            ))}
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {STATS.map((stat: { label: string; value: string }, i: number) => (
              <MagneticCard key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease }}
                  className="p-5 border border-white/[0.05] bg-surface hover:bg-surface-light transition-colors duration-500 cursor-default"
                >
                  <p className="text-2xl sm:text-3xl font-display font-medium text-white/90 tracking-tight mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/20 text-[10px] font-mono tracking-wider uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              </MagneticCard>
            ))}
          </div>
        </div>

        {/* Expertise */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ABOUT_EXPERTISE.map((item: { title: string; description: string }, i: number) => (
            <MagneticCard key={item.title} strength={0.1}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease }}
                className="group p-5 border border-white/[0.05] bg-surface hover:bg-surface-light transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-accent/25 group-hover:bg-accent/50 transition-colors duration-500" />
                  <h3 className="text-sm font-medium text-white/70 tracking-tight">{item.title}</h3>
                </div>
                <p className="text-white/25 text-xs font-light leading-relaxed">{item.description}</p>
              </motion.div>
            </MagneticCard>
          ))}
        </div>
      </div>
    </section>
  );
}
