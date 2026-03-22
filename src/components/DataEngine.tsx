import { motion } from 'framer-motion';
import { SKILLS } from '../data';
import { PanelHeader } from './CoreSystem';
import { LogoLoop, TECH_LOGOS } from './effects/LogoLoop';
import { ScrollFloat } from './effects/ScrollFloat';

const ease = [0.16, 1, 0.3, 1] as const;

const STATUS_COLORS = {
  ACTIVE: { dot: 'bg-cyan-DEFAULT', text: 'text-cyan-DEFAULT/70', border: 'border-cyan-DEFAULT/20', bg: 'bg-cyan-DEFAULT/[0.04]' },
  LOADED: { dot: 'bg-blue-400', text: 'text-blue-400/70', border: 'border-blue-400/20', bg: 'bg-blue-400/[0.04]' },
};

export function DataEngine() {
  return (
    <section id="skills" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <PanelHeader code="MODULE_02 / DATA ENGINE" title="Stack" />

        {/* Logo Loop — infinite scrolling tech logos */}
        <div className="mb-10">
          <LogoLoop items={TECH_LOGOS} speed={35} direction="left" />
        </div>
        <div className="mb-12">
          <LogoLoop items={[...TECH_LOGOS].reverse()} speed={28} direction="right" />
        </div>

        <ScrollFloat offset={40}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((group, i) => {
              const colors = STATUS_COLORS[group.status as keyof typeof STATUS_COLORS];
              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className={`glass p-6 glass-hover transition-all duration-500 group ${colors.bg} border ${colors.border}`}
                >
                  {/* Module header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-white/30 text-[9px] font-mono tracking-[0.15em]">{group.category}</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse-slow`} />
                      <span className={`text-[8px] font-mono tracking-wider ${colors.text}`}>{group.status}</span>
                    </div>
                  </div>

                  {/* Skills with SVG icons */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <span
                        key={item.name}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-mono border transition-all duration-300
                          text-white/40 border-white/[0.05] bg-white/[0.02]
                          group-hover:text-white/60 hover:!text-cyan-DEFAULT/80 hover:!border-cyan-DEFAULT/20 hover:!bg-cyan-DEFAULT/[0.04]
                          cursor-default`}
                      >
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                          loading="lazy"
                        />
                        {item.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollFloat>

        {/* Engine capacity bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="mt-8 glass p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/15 text-[9px] font-mono tracking-widest">ENGINE CAPACITY</span>
            <span className="text-cyan-DEFAULT/40 text-[9px] font-mono">87% UTILIZED</span>
          </div>
          <div className="h-[1px] bg-white/5 relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '87%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8, ease }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-DEFAULT/60 to-cyan-DEFAULT/20"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
