import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden w-full px-6"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none blur-[140px] opacity-20"
        style={{ background: 'radial-gradient(circle, #E52521 0%, #FFD700 40%, #049CD8 80%, transparent 100%)' }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise pointer-events-none mix-blend-overlay opacity-20" />

      <main className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">

        {/* Pixel accent dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="flex gap-1.5 mb-8"
        >
          <div className="w-2 h-2 bg-mario-red" />
          <div className="w-2 h-2 bg-mario-gold" />
          <div className="w-2 h-2 bg-mario-green" />
          <div className="w-2 h-2 bg-mario-blue" />
        </motion.div>

        {/* Role tag */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="font-retro text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.25em] mb-6"
        >
          Software Engineer &amp; Designer
        </motion.p>

        {/* Name — big, bold, with subtle retro glow */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-none"
          style={{
            textShadow: '0 0 30px rgba(229,37,33,0.15), 0 0 60px rgba(255,215,0,0.08)',
          }}
        >
          Tushar Kanti
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
          className="text-white/50 text-base sm:text-lg md:text-xl lg:text-2xl mt-8 max-w-2xl font-light tracking-wide leading-relaxed"
        >
          Building intelligent systems &amp; impactful digital experiences.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.75, ease }}
          className="mt-12 flex gap-1"
        >
          <div className="w-3 h-[2px] bg-mario-red" />
          <div className="w-3 h-[2px] bg-mario-gold" />
          <div className="w-3 h-[2px] bg-mario-green" />
          <div className="w-3 h-[2px] bg-mario-blue" />
        </motion.div>
      </main>
    </motion.section>
  );
}
