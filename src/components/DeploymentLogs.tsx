import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE } from '../data';
import { PanelHeader } from './CoreSystem';

const ease = [0.16, 1, 0.3, 1] as const;

function LogLine({ text, index, inView }: { text: string; index: number; inView: boolean }) {
  const isSuccess = text.startsWith('[SUCCESS]');
  const isInfo = text.startsWith('[INFO]');

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.12, ease }}
      className="flex items-start gap-2 font-mono text-xs leading-relaxed"
    >
      <span className={`flex-shrink-0 text-[9px] mt-0.5 ${isSuccess ? 'text-cyan-DEFAULT/70' : 'text-white/20'}`}>
        {isSuccess ? '[OK]' : isInfo ? '[>>]' : '[--]'}
      </span>
      <span className={`${isSuccess ? 'text-white/55' : 'text-white/30'}`}>
        {text.replace(/\[(SUCCESS|INFO)\] /, '')}
      </span>
    </motion.div>
  );
}

export function DeploymentLogs() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto" ref={ref}>
        <PanelHeader code="MODULE_03 / DEPLOYMENT LOGS" title="Experience" />

        <div className="space-y-6">
          {EXPERIENCE.map((exp, i) => {
            const sectionRef = useRef<HTMLDivElement>(null);
            const inView = useInView(sectionRef, { once: true, margin: '-60px' });

            return (
              <motion.div
                key={exp.id}
                ref={sectionRef}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }}
                className="glass p-7 glass-hover transition-all duration-500"
              >
                {/* Card header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5 pb-5 border-b border-cyan-DEFAULT/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/60" />
                      <span className="text-cyan-DEFAULT/50 text-[9px] font-mono tracking-widest">DEPLOY_LOG_{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white/85">{exp.company}</h3>
                    <p className="text-white/30 text-sm font-mono">{exp.role}</p>
                  </div>
                  <span className="text-cyan-DEFAULT/30 text-[9px] font-mono tracking-wider self-start sm:mt-1 px-3 py-1 border border-cyan-DEFAULT/10">
                    {exp.period}
                  </span>
                </div>

                {/* Log output */}
                <div className="space-y-1.5 mb-5 bg-black/30 p-4 font-mono">
                  {exp.logs.map((log, j) => (
                    <LogLine key={j} text={log} index={j} inView={inView} />
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 text-[9px] font-mono text-cyan-DEFAULT/30 border border-cyan-DEFAULT/10 bg-cyan-DEFAULT/[0.02]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
