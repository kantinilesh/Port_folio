import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { SOCIALS, PERSONAL } from '../data';

const ease = [0.16, 1, 0.3, 1] as const;

const TERMINAL_LINES = [
  { type: 'input', text: '$ whoami' },
  { type: 'output', text: `Nilesh Kanti — ${PERSONAL.role}` },
  { type: 'input', text: '$ cat contact.txt' },
  { type: 'output', text: PERSONAL.email },
  { type: 'input', text: '$ echo "Let\'s build something together"' },
  { type: 'output', text: 'Ready when you are.' },
];

function TerminalLine({ line, delay }: { line: typeof TERMINAL_LINES[0]; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState('');
  const text = line.text;

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(show);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    if (line.type === 'output') {
      setTyped(text);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [visible, text, line.type]);

  if (!visible) return null;

  return (
    <div className={`font-mono text-xs sm:text-sm ${
      line.type === 'input' ? 'text-accent/60' : 'text-white/35'
    }`}>
      {typed}
      {line.type === 'input' && typed.length < text.length && (
        <span className="cursor-blink text-accent/60">▊</span>
      )}
    </div>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <SectionHeader number="06" title="Contact" />

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left — Interactive Terminal */}
          <div>
            <div className="border border-white/[0.06] bg-surface-light overflow-hidden">
              {/* Terminal header bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="ml-3 text-white/15 text-[10px] font-mono tracking-wider">contact.sh</span>
              </div>

              {/* Terminal body */}
              <div className="p-5 space-y-2 min-h-[200px]">
                {TERMINAL_LINES.map((line, i) => (
                  <TerminalLine key={i} line={line} delay={i * 800} />
                ))}
                <div className="mt-4 pt-4 border-t border-white/[0.04]">
                  <span className="text-accent/30 text-[10px] font-mono tracking-wider cursor-blink">$ _</span>
                </div>
              </div>
            </div>

            {/* Socials below terminal */}
            <div className="mt-6 space-y-2">
              {SOCIALS.map((social: { label: string; url: string }, i: number) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease }}
                  className="group flex items-center justify-between p-3 border border-white/[0.04] bg-surface hover:bg-surface-light hover:border-white/[0.07] transition-all duration-500"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[3px] h-[3px] bg-white/10 group-hover:bg-accent/40 rounded-full transition-colors duration-500" />
                    <span className="text-white/35 group-hover:text-white/70 text-xs font-mono tracking-wide transition-colors duration-500">
                      {social.label}
                    </span>
                  </div>
                  <span className="text-white/10 group-hover:text-accent/30 transition-all duration-300 text-xs">→</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {!submitted ? (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-5"
              >
                {[
                  { label: 'Name', type: 'text', placeholder: 'Your name' },
                  { label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map((field: { label: string; type: string; placeholder: string }) => (
                  <div key={field.label}>
                    <label className="text-white/15 text-[10px] font-mono tracking-[0.15em] uppercase block mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      required
                      className="w-full px-4 py-3 bg-surface border border-white/[0.06] text-white text-sm font-light outline-none focus:border-accent/20 transition-colors duration-300 placeholder:text-white/10"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                <div>
                  <label className="text-white/15 text-[10px] font-mono tracking-[0.15em] uppercase block mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-surface border border-white/[0.06] text-white text-sm font-light outline-none focus:border-accent/20 transition-colors duration-300 resize-none placeholder:text-white/10"
                    placeholder="Let's build something..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-surface border border-white/[0.06] text-white/50 hover:text-white hover:bg-surface-light hover:border-accent/15 transition-all duration-500 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  send message <span className="text-accent/30">→</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[380px] text-center p-8 border border-white/[0.05] bg-surface"
              >
                <div className="w-12 h-[1px] bg-accent/25 mb-6" />
                <h3 className="font-display text-xl font-medium text-white/85 mb-2">Message Sent</h3>
                <p className="text-white/30 text-sm font-light">I'll get back to you soon.</p>
                <div className="w-12 h-[1px] bg-accent/25 mt-6" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-24 border-t border-white/[0.03] pt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-white/15 text-xs font-mono tracking-wide">{PERSONAL.name}</span>
            <span className="text-white/8 text-[10px] font-mono tracking-[0.15em]">© 2026</span>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
