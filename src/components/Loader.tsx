import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  'Hello',
  'Hola',
  'Bonjour',
  'Hallo',
  'Ciao',
  'こんにちは',
  '안녕하세요',
  '你好',
  'Привет',
  'नमस्ते',
];

const WORD_DURATION = 400;
const FADE_DURATION = 0.12;

const PIXEL_COLORS = [
  '#E52521', // Mario Red
  '#FFD700', // Coin Gold
  '#049CD8', // Sky Blue
  '#43B047', // Luigi Green
  '#FFA500', // Fire Orange
  '#FFFFFF', // Star White
];

const GLOW_COLORS = [
  '#E5252160', '#FFD70060', '#049CD860', '#43B04760', '#FFA50060',
  '#E5252160', '#FFD70060', '#049CD860', '#43B04760', '#43B04760',
];

function generatePixels(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(Math.random() * 96 + 2).toFixed(1)}%`,
    size: Math.floor(Math.random() * 5) + 2,
    color: PIXEL_COLORS[i % PIXEL_COLORS.length],
    duration: `${(Math.random() * 5 + 4).toFixed(1)}s`,
    delay: `${(Math.random() * 4).toFixed(1)}s`,
    opacity: Math.random() * 0.35 + 0.1,
  }));
}

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const pixels = useMemo(() => generatePixels(40), []);

  const handleComplete = useCallback(() => {
    setDone(true);
    onComplete();
  }, [onComplete]);

  // Word cycling
  useEffect(() => {
    if (done) return;
    if (index >= greetings.length - 1) {
      const timeout = setTimeout(handleComplete, WORD_DURATION);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setIndex((p) => p + 1), WORD_DURATION);
    return () => clearTimeout(timeout);
  }, [index, done, handleComplete]);

  // Smooth progress bar driven by rAF
  useEffect(() => {
    const start = performance.now();
    const total = greetings.length * WORD_DURATION;
    let raf: number;
    const tick = () => {
      const elapsed = performance.now() - start;
      setProgress(Math.min(elapsed / total, 1));
      if (elapsed < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden scanlines screen-flicker"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* ── Floating Pixel Particles ── */}
      {pixels.map((p) => (
        <div
          key={p.id}
          className="pixel-float"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            '--pixel-opacity': p.opacity,
            '--float-duration': p.duration,
            '--float-delay': p.delay,
          } as React.CSSProperties}
        />
      ))}

      {/* ── CRT Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* ── Greeting Text ── */}
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.96, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.04, y: -6 }}
          transition={{ duration: FADE_DURATION, ease: 'easeInOut' }}
          className="font-retro text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white select-none glitch-text relative z-20"
          style={{
            textShadow: `0 0 20px ${GLOW_COLORS[index]}, 0 0 60px ${GLOW_COLORS[index]}`,
          }}
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>

      {/* ── Pixel Progress Bar ── */}
      <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
        <span className="font-retro text-[8px] sm:text-[10px] text-white/30 tracking-[0.3em]">
          LOADING
        </span>
        <div className="w-40 sm:w-52 h-2 pixel-progress-track bg-white/5 overflow-hidden">
          <div
            className="h-full pixel-progress-fill transition-none"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* ── Corner Pixel Accents ── */}
      <div className="absolute top-6 left-6 flex gap-1 z-20">
        <div className="w-2 h-2 bg-mario-red" />
        <div className="w-2 h-2 bg-mario-gold" />
        <div className="w-2 h-2 bg-mario-green" />
      </div>
      <div className="absolute top-6 right-6 flex gap-1 z-20">
        <div className="w-2 h-2 bg-mario-green" />
        <div className="w-2 h-2 bg-mario-gold" />
        <div className="w-2 h-2 bg-mario-red" />
      </div>
      <div className="absolute bottom-6 left-6 font-retro text-[7px] text-white/15 z-20 tracking-wider">
        © 2026
      </div>
      <div className="absolute bottom-6 right-6 font-retro text-[7px] text-white/15 z-20 tracking-wider">
        v1.0
      </div>
    </motion.div>
  );
}
