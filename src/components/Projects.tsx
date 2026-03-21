import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { PROJECTS } from '../data';
import { MagneticCard } from './effects/MagneticCard';

const ease = [0.16, 1, 0.3, 1] as const;
type Project = typeof PROJECTS[0];

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <SectionHeader number="04" title="Projects" />

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((project, i: number) => (
            <MagneticCard key={project.id} strength={0.1}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                onClick={() => setSelected(project)}
                className="group cursor-pointer border border-white/[0.05] bg-surface hover:bg-surface-light hover:border-white/[0.1] transition-all duration-500 overflow-hidden"
              >
                <div className="relative h-44 overflow-hidden bg-surface-lighter">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-45 group-hover:scale-[1.03] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
                  <span className="absolute top-3 left-3 text-accent/25 text-[9px] font-mono tracking-[0.15em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display text-lg font-medium text-white/85 tracking-tight group-hover:text-white transition-colors duration-500">
                      {project.title}
                    </h3>
                    <span className="text-white/15 group-hover:text-accent/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 mt-1 text-sm">↗</span>
                  </div>
                  <p className="text-white/25 text-xs font-light leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t: string) => (
                      <span key={t} className="px-2 py-0.5 text-[9px] font-mono text-white/20 border border-white/[0.04]">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </MagneticCard>
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
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.4, ease }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-surface border border-white/[0.06]"
            >
              <div className="relative h-48 overflow-hidden bg-surface-lighter">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/30 hover:text-white border border-white/[0.06] bg-black/40 backdrop-blur-sm transition-colors"
                >✕</button>
              </div>

              <div className="p-7">
                <h2 className="font-display text-2xl font-medium text-white/90 tracking-tight mb-3">{selected.title}</h2>
                <p className="text-white/35 text-sm font-light leading-relaxed mb-6">{selected.description}</p>

                <div className="space-y-2 mb-6">
                  {selected.metrics.map((m: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-[3px] h-[3px] bg-accent/40 rounded-full" />
                      <span className="text-white/40 text-xs font-light">{m}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-7">
                  {selected.tech.map((t: string) => (
                    <span key={t} className="px-2.5 py-1 text-[10px] font-mono text-white/30 border border-white/[0.04]">{t}</span>
                  ))}
                </div>

                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-white/[0.06] text-white/40 hover:text-white hover:border-accent/20 text-xs font-mono uppercase tracking-wider transition-all duration-300"
                >
                  view source <span className="text-accent/30">→</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
