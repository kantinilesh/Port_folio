import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data';
import { PanelHeader } from './CoreSystem';

const ease = [0.16, 1, 0.3, 1] as const;
type Project = typeof PROJECTS[0];

const STATUS_STYLES = {
  DEPLOYED: 'bg-cyan-DEFAULT/10 text-cyan-DEFAULT/70 border-cyan-DEFAULT/20',
  ACTIVE: 'bg-blue-400/10 text-blue-400/70 border-blue-400/20',
};

export function Simulations() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <PanelHeader code="MODULE_04 / PROJECT SIMULATIONS" title="Projects" />

        {/* Project grid - visually strongest section */}
        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              onClick={() => setSelected(project)}
              className="group cursor-pointer glass border border-cyan-DEFAULT/[0.06] hover:border-cyan-DEFAULT/20 hover:bg-cyan-DEFAULT/[0.04] transition-all duration-500 overflow-hidden"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-cyan-DEFAULT/[0.06] bg-cyan-DEFAULT/[0.02]">
                <span className="text-cyan-DEFAULT/30 text-[9px] font-mono tracking-widest">{project.codename}</span>
                <span className={`text-[8px] font-mono px-2 py-0.5 border ${STATUS_STYLES[project.status as keyof typeof STATUS_STYLES]}`}>
                  {project.status}
                </span>
              </div>

              <div className="p-5">
                {/* Title */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white/85 group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-cyan-DEFAULT/20 group-hover:text-cyan-DEFAULT/60 transition-all duration-300 text-sm mt-0.5">↗</span>
                </div>
                <p className="text-cyan-DEFAULT/35 text-[10px] font-mono mb-4">{project.subtitle}</p>
                <p className="text-white/25 text-xs font-light leading-relaxed mb-5 line-clamp-2">{project.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {project.metrics.map(m => (
                    <div key={m.label} className="bg-black/30 p-2.5">
                      <p className="text-cyan-DEFAULT/70 text-sm font-bold font-mono">{m.value}</p>
                      <p className="text-white/20 text-[8px] font-mono tracking-wide">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="px-2 py-0.5 text-[8px] font-mono text-white/20 border border-white/[0.04]">{t}</span>
                  ))}
                </div>
              </div>

              {/* Bottom scanner line on hover */}
              <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-cyan-DEFAULT/50 to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.4, ease }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-xl glass border border-cyan-DEFAULT/15 glow-cyan"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-DEFAULT/10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/70 animate-pulse" />
                  <span className="text-cyan-DEFAULT/40 text-[9px] font-mono tracking-widest">SIM/{selected.codename}</span>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-white/20 hover:text-white text-sm transition-colors"
                >✕</button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-1">{selected.title}</h2>
                <p className="text-cyan-DEFAULT/40 text-xs font-mono mb-4">{selected.subtitle}</p>
                <p className="text-white/35 text-sm font-light leading-relaxed mb-6">{selected.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {selected.metrics.map(m => (
                    <div key={m.label} className="bg-black/50 p-4 border border-cyan-DEFAULT/[0.06]">
                      <p className="text-cyan-DEFAULT text-xl font-bold font-mono">{m.value}</p>
                      <p className="text-white/25 text-[9px] font-mono tracking-wide mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.tech.map(t => (
                    <span key={t} className="px-3 py-1 text-[9px] font-mono text-cyan-DEFAULT/50 border border-cyan-DEFAULT/15 bg-cyan-DEFAULT/[0.03]">{t}</span>
                  ))}
                </div>

                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-cyan-DEFAULT/20 bg-cyan-DEFAULT/[0.04] text-cyan-DEFAULT/70 hover:text-cyan-DEFAULT hover:border-cyan-DEFAULT/40 hover:bg-cyan-DEFAULT/[0.08] text-[10px] font-mono tracking-wider transition-all duration-300"
                >
                  VIEW SOURCE CODE →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
