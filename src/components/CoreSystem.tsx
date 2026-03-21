import { motion } from 'framer-motion';
import { PERSONAL } from '../data';

const ease = [0.16, 1, 0.3, 1] as const;

function PanelHeader({ code, title }: { code: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-8 bg-cyan-DEFAULT/40" />
        <div>
          <p className="text-cyan-DEFAULT/30 text-[9px] font-mono tracking-[0.2em]">{code}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-none">{title}</h2>
        </div>
      </div>
    </div>
  );
}

export { PanelHeader };

export function CoreSystem() {
  return (
    <section id="about" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <PanelHeader code="MODULE_01 / CORE SYSTEM" title="About" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bio panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="glass p-7 glass-hover transition-all duration-500"
          >
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-cyan-DEFAULT/[0.06]">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/60 animate-pulse" />
              <span className="text-cyan-DEFAULT/40 text-[9px] font-mono tracking-widest">PROFILE.SYS</span>
            </div>
            {PERSONAL.bio.map((para, i) => (
              <p key={i} className={`text-white/40 text-sm font-light leading-loose ${i > 0 ? 'mt-3' : ''}`}>
                {para}
              </p>
            ))}
          </motion.div>

          {/* Stats panel */}
          <div className="space-y-3">
            {PERSONAL.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="glass p-5 flex items-center justify-between glass-hover transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[2px] h-8 bg-cyan-DEFAULT/20 group-hover:bg-cyan-DEFAULT/50 transition-colors duration-500" />
                  <span className="text-white/30 text-xs font-mono tracking-wider">{stat.label}</span>
                </div>
                <span className="text-2xl font-bold text-cyan-DEFAULT/90">{stat.value}</span>
              </motion.div>
            ))}

            {/* System status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="glass p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/20 text-[9px] font-mono tracking-widest">SYSTEM STATUS</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/70 animate-pulse" />
                  <span className="text-cyan-DEFAULT/50 text-[9px] font-mono">ACTIVE</span>
                </div>
              </div>
              <div className="space-y-2">
                {['Core Modules', 'Data Engine', 'Cloud Interface'].map(item => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-white/20 text-[10px] font-mono">{item}</span>
                    <div className="flex gap-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className={`w-3 h-1.5 ${i < 5 ? 'bg-cyan-DEFAULT/40' : 'bg-white/5'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
