import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { SOCIALS, PERSONAL } from '../data';
import { useSoundController } from '../hooks/useSoundController';

const ease = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { playHover, playTransition } = useSoundController();

  useEffect(() => {
    if (submitted) {
      playTransition();
    }
  }, [submitted, playTransition]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 pointer-events-none">
      <div className="max-w-6xl w-full relative z-10 pointer-events-auto">
        <SectionHeader
          world="FINAL CASTLE"
          title="Contact"
          subtitle="Let's build something together."
          accent="#E52521"
        />

        <div className="grid md:grid-cols-2 gap-16 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-20%' }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-white/40 text-sm sm:text-base font-light leading-relaxed mb-8">
              Whether it's an AI project, a systems challenge, or just a conversation about building great software —
              I'm always open to connecting.
            </p>

            <a
              href={`mailto:${PERSONAL.email}`}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-3 px-6 py-3 border border-white/[0.1] text-white/70 hover:text-white hover:border-mario-red/40 bg-black/40 backdrop-blur-md hover:bg-mario-red/10 transition-all duration-300 text-sm font-medium tracking-wide group"
            >
              <div className="w-2 h-2 bg-mario-red group-hover:animate-pulse" />
              Say Hello
              <span className="text-white/30 group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <div className="mt-10 space-y-3">
              {SOCIALS.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: '-20%' }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease }}
                  className="group flex items-center justify-between p-4 border border-white/[0.06] bg-black/40 backdrop-blur-md hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-mario-red transition-colors" />
                    <span className="text-white/55 group-hover:text-white/90 text-sm font-medium tracking-wide transition-colors">
                      {social.label}
                    </span>
                  </div>
                  <span className="text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-300 text-sm">
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-20%' }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="font-retro text-[7px] text-white/25 tracking-[0.2em] block mb-2">NAME</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-white/[0.08] text-white text-sm font-light outline-none focus:border-white/20 transition-colors placeholder:text-white/15"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-retro text-[7px] text-white/25 tracking-[0.2em] block mb-2">EMAIL</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-white/[0.08] text-white text-sm font-light outline-none focus:border-white/20 transition-colors placeholder:text-white/15"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="font-retro text-[7px] text-white/25 tracking-[0.2em] block mb-2">MESSAGE</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-white/[0.08] text-white text-sm font-light outline-none focus:border-white/20 transition-colors resize-none placeholder:text-white/15"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  onMouseEnter={playHover}
                  className="w-full px-6 py-3 bg-black/60 backdrop-blur-md border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 text-sm font-medium tracking-wide flex items-center justify-center gap-2.5 group"
                >
                  <div className="w-1.5 h-1.5 bg-mario-red" />
                  Send Message
                  <span className="text-white/30 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease }}
                className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-6 border border-white/[0.06] bg-black/40 backdrop-blur-md"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease }}
                  className="text-4xl mb-4"
                >
                  🚩
                </motion.div>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease }}
                  className="w-[2px] h-8 bg-mario-red/40 mb-4 origin-bottom"
                />
                <h3 className="text-lg font-bold text-white mb-2">Castle Reached!</h3>
                <p className="text-white/40 text-sm font-light">
                  Message sent. I'll get back to you soon.
                </p>
                <div className="mt-4 flex gap-1">
                  <div className="w-2 h-2 bg-mario-red" />
                  <div className="w-2 h-2 bg-mario-gold" />
                  <div className="w-2 h-2 bg-mario-green" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: '-20%' }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-20 border-t border-white/[0.06] pt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-mario-red" />
                <div className="w-1.5 h-1.5 bg-mario-gold" />
                <div className="w-1.5 h-1.5 bg-mario-green" />
                <div className="w-1.5 h-1.5 bg-mario-blue" />
              </div>
              <span className="text-white/25 text-xs font-medium tracking-wide">
                {PERSONAL.name}
              </span>
            </div>
            <span className="font-retro text-[7px] text-white/15 tracking-[0.2em]">
              © 2026 · GAME OVER? NEVER.
            </span>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
