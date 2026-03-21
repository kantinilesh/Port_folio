import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { SKILLS } from '../data';
import { useSoundController } from '../hooks/useSoundController';

const ease = [0.16, 1, 0.3, 1] as const;

export function Skills() {
  const { playHover } = useSoundController();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 pointer-events-none">
      <div className="max-w-6xl w-full relative z-10 pointer-events-auto">
        <SectionHeader
          world="POWER-UPS"
          title="Skills"
          subtitle="Tools and technologies in my arsenal."
          accent="#FFD700"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-20%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group p-6 border border-white/[0.06] bg-black/40 backdrop-blur-md hover:bg-white/[0.04] hover:border-white/[0.1] transition-colors duration-300 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${group.color}08 0%, transparent 60%)` }}
              />

              <div className="flex items-center gap-2.5 mb-5 relative z-10">
                <div className="w-3 h-3 flex items-center justify-center" style={{ backgroundColor: `${group.color}20` }}>
                  <div className="w-1.5 h-1.5" style={{ backgroundColor: group.color }} />
                </div>
                <h3 className="font-retro text-[8px] sm:text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium text-white/55 bg-white/[0.04] border border-white/[0.06] hover:text-white/80 hover:border-white/12 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-5 h-[2px] w-full bg-white/[0.04] overflow-hidden relative z-10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ margin: '-20%' }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease }}
                  className="h-full origin-left"
                  style={{ backgroundColor: `${group.color}40` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
