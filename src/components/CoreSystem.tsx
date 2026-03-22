import { motion } from 'framer-motion';
import { PERSONAL } from '../data';
import { MagicBento } from './effects/MagicBento';
import { ScrambleText } from './effects/ScrambleText';
import { ScrollFloat } from './effects/ScrollFloat';

const ease = [0.16, 1, 0.3, 1] as const;

function PanelHeader({ code, title }: { code: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-8 bg-cyan-DEFAULT/40" />
        <div>
          <p className="text-cyan-DEFAULT/30 text-[9px] font-mono tracking-[0.2em]">{code}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-none">
            <ScrambleText text={title} trigger="view" speed={35} />
          </h2>
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

        <ScrollFloat>
          <div className="grid md:grid-cols-5 gap-4">
            {/* Bio panel — spans 3 */}
            <MagicBento span="md:col-span-3" className="p-7">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-cyan-DEFAULT/[0.06]">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/60 animate-pulse" />
                <span className="text-cyan-DEFAULT/40 text-[9px] font-mono tracking-widest">PROFILE.SYS</span>
              </div>
              {PERSONAL.bio.map((para, i) => (
                <p key={i} className={`text-white/40 text-sm font-light leading-loose ${i > 0 ? 'mt-3' : ''}`}>
                  {para}
                </p>
              ))}
            </MagicBento>

            {/* Stats — spans 2 stacked */}
            <div className="md:col-span-2 space-y-4">
              {PERSONAL.stats.map((stat) => (
                <MagicBento key={stat.label} className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-[2px] h-8 bg-cyan-DEFAULT/20" />
                      <span className="text-white/30 text-xs font-mono tracking-wider">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-cyan-DEFAULT/90">{stat.value}</span>
                  </div>
                </MagicBento>
              ))}
            </div>

            {/* Wide bottom bento — System status */}
            <MagicBento span="md:col-span-5" className="p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/20 text-[9px] font-mono tracking-widest">SYSTEM DIAGNOSTICS</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/70 animate-pulse" />
                  <span className="text-cyan-DEFAULT/50 text-[9px] font-mono">ALL MODULES ACTIVE</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { m: 'Core Engine', v: '99.8%' },
                  { m: 'Data Pipeline', v: '97.2%' },
                  { m: 'Cloud Layer', v: '100%' },
                  { m: 'AI Subsystem', v: '95.4%' },
                ].map(item => (
                  <div key={item.m}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/20 text-[10px] font-mono">{item.m}</span>
                      <span className="text-cyan-DEFAULT/50 text-[10px] font-mono">{item.v}</span>
                    </div>
                    <div className="h-[2px] bg-white/[0.04] relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.v }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3, ease }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-DEFAULT/60 to-cyan-DEFAULT/20"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MagicBento>
          </div>
        </ScrollFloat>
      </div>
    </section>
  );
}
