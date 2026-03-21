import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { EXPERIENCE } from '../data';
import { useSoundController } from '../hooks/useSoundController';

const ease = [0.16, 1, 0.3, 1] as const;

export function Experience() {
  const { playHover } = useSoundController();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 pointer-events-none">
      <div className="max-w-6xl w-full relative z-10 pointer-events-auto">
        <SectionHeader
          world="BOSS BATTLES"
          title="Experience"
          subtitle="Challenges conquered along the way."
          accent="#E52521"
        />

        <div className="relative">
          <div className="absolute left-[11px] top-0 bottom-0 w-[1px] bg-white/[0.06] hidden md:block" />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.id}
                onMouseEnter={playHover}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: '-20%' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease }}
                className="relative md:pl-14"
              >
                <div className="absolute left-0 top-3 hidden md:flex items-center justify-center">
                  <div className="w-[9px] h-[9px] bg-mario-red border-2 border-black z-10" />
                  <div className="absolute w-5 h-5 bg-mario-red/20 animate-ping" style={{ animationDuration: '3s' }} />
                </div>

                <div className="group p-6 sm:p-8 border border-white/[0.06] bg-black/40 backdrop-blur-md hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <span className="font-retro text-[7px] text-mario-red/30 tracking-[0.15em]">
                      BOSS {i + 1}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <p className="text-white/45 text-sm font-medium">{exp.company}</p>
                      <span className="hidden sm:block text-white/15">·</span>
                      <span className="font-retro text-[7px] text-white/25 tracking-[0.15em]">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/40 text-sm font-light leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {exp.highlights.map((h, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ margin: '-20%' }}
                        transition={{ duration: 0.4, delay: 0.3 + j * 0.08, ease }}
                        className="flex items-start gap-2.5"
                      >
                        <div className="w-1.5 h-1.5 bg-mario-gold/50 mt-1.5 flex-shrink-0" />
                        <p className="text-white/50 text-xs sm:text-sm font-light">{h}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-[10px] font-medium text-white/45 border border-white/[0.06] bg-white/[0.02]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="h-[3px] w-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ margin: '-20%' }}
                      transition={{ duration: 2, delay: 0.5, ease }}
                      className="h-full origin-left bg-gradient-to-r from-mario-red/60 to-mario-gold/40"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
