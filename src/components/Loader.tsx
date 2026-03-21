import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  'Hello', 'Hola', 'Bonjour', 'Hallo', 'Ciao',
  'こんにちは', '안녕하세요', '你好', 'Привет', 'नमस्ते',
];

const WORD_DURATION = 400;

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleComplete = useCallback(() => {
    setDone(true);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (done) return;
    if (index >= greetings.length - 1) {
      const timeout = setTimeout(handleComplete, WORD_DURATION);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setIndex(p => p + 1), WORD_DURATION);
    return () => clearTimeout(timeout);
  }, [index, done, handleComplete]);

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black dot-grid"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white/90 select-none italic tracking-tight"
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>

      {/* Progress */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-48 h-[1px] bg-white/[0.06] overflow-hidden">
          <div className="h-full bg-accent/40 transition-none" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <div className="absolute top-8 left-8 text-white/10 text-[10px] font-mono tracking-[0.15em]">
        nilesh.kanti
      </div>
      <div className="absolute top-8 right-8 text-white/10 text-[10px] font-mono tracking-[0.15em]">
        v2.0
      </div>
    </motion.div>
  );
}
