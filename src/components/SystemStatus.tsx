import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../data';
import { PanelHeader } from './CoreSystem';

const ease = [0.16, 1, 0.3, 1] as const;

const RESULT_STYLES = {
  'WINNER': { text: 'text-cyan-DEFAULT', glow: '0 0 20px rgba(0,212,255,0.3)', bar: 'bg-cyan-DEFAULT' },
  'RUNNER-UP': { text: 'text-blue-400', glow: '0 0 20px rgba(96,165,250,0.2)', bar: 'bg-blue-400' },
  'RECOGNIZED': { text: 'text-emerald-400', glow: '0 0 20px rgba(52,211,153,0.2)', bar: 'bg-emerald-400' },
};

export function SystemStatus() {
  return (
    <section id="achievements" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <PanelHeader code="MODULE_05 / SYSTEM STATUS" title="Recognition" />

        <div className="grid sm:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((ach, i) => {
            const style = RESULT_STYLES[ach.result as keyof typeof RESULT_STYLES];
            return (
              <motion.div
                key={ach.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }}
                className="glass glass-hover p-7 transition-all duration-500 group"
                style={{ '--glow': style.glow } as React.CSSProperties}
              >
                {/* Code + status */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/15 text-[9px] font-mono tracking-widest">{ach.code}</span>
                  <span className={`text-[9px] font-mono tracking-wider font-bold ${style.text}`}
                    style={{ textShadow: style.glow }}>
                    {ach.result}
                  </span>
                </div>

                {/* Accent bar */}
                <div className="mb-5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '32px' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease }}
                    className={`h-[2px] ${style.bar} group-hover:w-full`}
                    style={{ transition: 'width 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </div>

                <h3 className="text-base font-semibold text-white/85 mb-1.5">{ach.title}</h3>
                <p className="text-white/20 text-[10px] font-mono mb-3">{ach.org}</p>
                <span className="text-white/15 text-[9px] font-mono">{ach.year}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Summary status bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="mt-8 glass p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/70 animate-pulse" />
            <span className="text-white/25 text-[9px] font-mono tracking-widest">ACHIEVEMENT LOG COMPLETE</span>
          </div>
          <span className="text-cyan-DEFAULT/40 text-[9px] font-mono">{ACHIEVEMENTS.length} ENTRIES</span>
        </motion.div>
      </div>
    </section>
  );
}
