import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { EXPERIENCE } from '../data';
import { MagneticCard } from './effects/MagneticCard';
import { BlurText } from './effects/BlurText';

const ease = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  return (
    <section id="experience" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <SectionHeader number="03" title="Experience" />

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/[0.04] hidden md:block" />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i: number) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease }}
                className="relative md:pl-14"
              >
                <div className="absolute left-0 top-3 hidden md:block">
                  <div className="w-[6px] h-[6px] bg-accent/30 rounded-full" />
                </div>

                <MagneticCard strength={0.08}>
                  <div className="group p-7 border border-white/[0.05] bg-surface hover:bg-surface-light transition-all duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-display text-xl font-medium text-white/90 tracking-tight mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-white/30 text-sm font-light">{exp.company}</p>
                      </div>
                      <span className="text-accent/25 text-[10px] font-mono tracking-[0.15em] flex-shrink-0 mt-1">
                        {exp.period}
                      </span>
                    </div>

                    <BlurText className="text-white/30 text-sm font-light leading-relaxed mb-5">
                      {exp.description}
                    </BlurText>

                    <div className="space-y-2 mb-5">
                      {exp.highlights.map((h: string, j: number) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, x: -6 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 0.4, delay: 0.2 + j * 0.05, ease }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-[3px] h-[3px] bg-accent/30 mt-2 flex-shrink-0 rounded-full" />
                          <p className="text-white/35 text-xs sm:text-sm font-light">{h}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t: string) => (
                        <span key={t} className="px-2.5 py-1 text-[10px] font-mono text-white/25 border border-white/[0.04]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
