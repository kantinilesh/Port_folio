import { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL, SOCIALS } from '../data';
import { PanelHeader } from './CoreSystem';

const ease = [0.16, 1, 0.3, 1] as const;

export function Terminal() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full px-6 pb-32 pt-28">
      <div className="max-w-5xl w-full mx-auto">
        <PanelHeader code="MODULE_06 / INTERFACE TERMINAL" title="Contact" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Terminal info panel */}
          <div className="space-y-4">
            {/* Identity block */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="glass p-6 font-mono"
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-DEFAULT/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                  <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                  <div className="w-2 h-2 rounded-full bg-white/[0.06]" />
                </div>
                <span className="text-white/15 text-[9px] tracking-widest ml-2">interface.terminal</span>
              </div>

              <div className="space-y-2 text-xs">
                <div><span className="text-cyan-DEFAULT/40">$ </span><span className="text-white/50">whoami</span></div>
                <div className="text-white/30 pl-4">{PERSONAL.name} — {PERSONAL.role}</div>
                <div className="mt-3"><span className="text-cyan-DEFAULT/40">$ </span><span className="text-white/50">cat contact.txt</span></div>
                <div className="text-white/30 pl-4">{PERSONAL.email}</div>
                <div className="mt-3"><span className="text-cyan-DEFAULT/40">$ </span><span className="text-white/50">echo location</span></div>
                <div className="text-white/30 pl-4">{PERSONAL.location}</div>
                <div className="mt-3"><span className="text-cyan-DEFAULT/40">$ </span><span className="text-white/50">status</span></div>
                <div className="flex items-center gap-2 pl-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/70 animate-pulse" />
                  <span className="text-cyan-DEFAULT/60">Available for opportunities</span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <span className="text-cyan-DEFAULT/40">$ </span>
                  <span className="cursor-blink text-cyan-DEFAULT/60">▊</span>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="space-y-2"
            >
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease }}
                  className="flex items-center justify-between p-3 glass glass-hover transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center border border-cyan-DEFAULT/15 text-cyan-DEFAULT/40 text-[8px] font-mono">{s.icon}</span>
                    <span className="text-white/35 text-xs font-mono group-hover:text-white/60 transition-colors">{s.label}</span>
                  </div>
                  <span className="text-white/10 group-hover:text-cyan-DEFAULT/40 transition-colors text-xs">→</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: 'name', label: 'IDENTIFIER', type: 'text', placeholder: 'Your name' },
                  { key: 'email', label: 'COMM_CHANNEL', type: 'email', placeholder: 'your@email.com' },
                ].map(field => (
                  <div key={field.key}>
                    <label className={`block text-[9px] font-mono tracking-widest mb-2 transition-colors duration-300 ${
                      focused === field.key ? 'text-cyan-DEFAULT/60' : 'text-white/15'
                    }`}>{field.label}</label>
                    <input
                      type={field.type}
                      required
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused(null)}
                      placeholder={field.placeholder}
                      className={`w-full px-4 py-3 bg-black/40 border outline-none text-white text-sm font-light
                        placeholder:text-white/10 transition-all duration-300 font-mono
                        ${focused === field.key
                          ? 'border-cyan-DEFAULT/30 bg-cyan-DEFAULT/[0.03]'
                          : 'border-white/[0.06] hover:border-white/10'
                        }`}
                    />
                  </div>
                ))}

                <div>
                  <label className={`block text-[9px] font-mono tracking-widest mb-2 transition-colors duration-300 ${
                    focused === 'message' ? 'text-cyan-DEFAULT/60' : 'text-white/15'
                  }`}>MESSAGE_PAYLOAD</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Describe your mission..."
                    className={`w-full px-4 py-3 bg-black/40 border outline-none text-white text-sm font-light
                      resize-none placeholder:text-white/10 transition-all duration-300 font-mono
                      ${focused === 'message'
                        ? 'border-cyan-DEFAULT/30 bg-cyan-DEFAULT/[0.03]'
                        : 'border-white/[0.06] hover:border-white/10'
                      }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-DEFAULT/10 border border-cyan-DEFAULT/25 text-cyan-DEFAULT/80 hover:bg-cyan-DEFAULT/15 hover:text-cyan-DEFAULT hover:border-cyan-DEFAULT/40 hover:shadow-[0_0_24px_rgba(0,212,255,0.12)] transition-all duration-300 text-[10px] font-mono tracking-[0.2em]"
                >
                  TRANSMIT MESSAGE →
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[380px] glass p-10 text-center"
              >
                <div className="w-10 h-10 border border-cyan-DEFAULT/30 flex items-center justify-center mb-6 text-cyan-DEFAULT glow-cyan-strong">✓</div>
                <h3 className="text-white/80 text-lg font-semibold mb-2">Transmission Received</h3>
                <p className="text-white/25 text-sm font-mono">Response incoming within 24h.</p>
                <div className="flex items-center gap-2 mt-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/70 animate-pulse" />
                  <span className="text-cyan-DEFAULT/30 text-[9px] font-mono tracking-widest">CHANNEL OPEN</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white/10 text-[9px] font-mono tracking-widest">NK_SYSTEMS v2.0.26</span>
          <span className="text-white/8 text-[9px] font-mono">© 2026 NILESH KANTI</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-DEFAULT/40 animate-pulse" />
            <span className="text-white/10 text-[9px] font-mono">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
