import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { PROJECTS } from '../data';
import { useSoundController } from '../hooks/useSoundController';

const ease = [0.16, 1, 0.3, 1] as const;

export function Projects() {
  const { playHover } = useSoundController();
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 pointer-events-none">
      <div className="max-w-6xl w-full relative z-10 pointer-events-auto">
        <SectionHeader
          world="LEVELS"
          title="Projects"
          subtitle="Each one a level beaten."
          accent="#43B047"
        />

        <div className="grid md:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              onMouseEnter={playHover}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-20%' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer border border-white/[0.06] bg-black/40 backdrop-blur-md hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 overflow-hidden relative"
            >
              <div className="relative h-40 sm:h-48 overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <span className="absolute top-3 left-3 font-retro text-[8px] text-mario-green/50 tracking-[0.2em]">
                  LVL {project.level}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-mario-green/90 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 mt-0.5">
                    ↗
                  </span>
                </div>

                <p className="text-white/35 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-medium text-white/35 border border-white/[0.05]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="h-[2px] w-full bg-white/[0.04]">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ margin: '-20%' }}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.15, ease }}
                  className="h-full origin-left bg-mario-green/30"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/[0.08]"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover opacity-40 bg-black" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white border border-white/10 bg-black/50 backdrop-blur-sm transition-colors"
                >
                  ✕
                </button>
                <span className="absolute top-4 left-4 font-retro text-[9px] text-mario-green/60 tracking-[0.2em] bg-black/50 px-2 py-1 backdrop-blur-sm">
                  LVL {selectedProject.level}
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">{selectedProject.title}</h2>
                <p className="text-white/45 text-sm font-light leading-relaxed mb-5">{selectedProject.description}</p>
                <div className="space-y-2 mb-5">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-mario-green/60" />
                      <span className="text-white/55 text-xs sm:text-sm">{m}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[10px] font-medium text-white/45 border border-white/[0.06]">{t}</span>
                  ))}
                </div>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.04] text-xs font-medium uppercase tracking-wide transition-all"
                >
                  <div className="w-1 h-1 bg-mario-green" />
                  View Source
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
