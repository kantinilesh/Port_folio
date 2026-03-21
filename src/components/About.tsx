import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { PERSONAL, STATS, ABOUT_EXPERTISE } from '../data';
import { useSoundController } from '../hooks/useSoundController';

const ease = [0.16, 1, 0.3, 1] as const;

export function About() {
  const { playHover } = useSoundController();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 pointer-events-none">
      <div className="max-w-6xl w-full relative z-10 pointer-events-auto">
        <SectionHeader world="WORLD 2" title="About" subtitle="The origin story." accent="#049CD8" />

        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-3 space-y-6">
            {PERSONAL.bio.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-20%' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease }}
                className="text-white/45 text-sm sm:text-base font-light leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                onMouseEnter={playHover}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ margin: '-20%' }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease }}
                className="group p-5 border border-white/[0.06] bg-black/40 backdrop-blur-md hover:bg-white/[0.04] transition-colors duration-300 pointer-events-auto cursor-default"
              >
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                  {stat.value}
                </p>
                <p className="text-white/25 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map progression */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/[0.04] hidden md:block" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ABOUT_EXPERTISE.map((item, i) => (
              <motion.div
                key={item.title}
                onMouseEnter={playHover}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-20%' }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease }}
                className="group relative p-5 border border-white/[0.06] bg-black/40 backdrop-blur-md hover:bg-white/[0.04] transition-all duration-300 pointer-events-auto"
              >
                <div className="absolute -top-[5px] left-6 w-2.5 h-2.5 bg-mario-blue border-2 border-black hidden md:block" />
                <span className="font-retro text-[7px] text-mario-blue/50 tracking-[0.2em] block mb-2">
                  NODE {i + 1}
                </span>
                <h3 className="text-sm font-semibold text-white tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-white/30 text-xs font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
