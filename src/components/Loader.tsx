import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_SEQUENCE = [
  { text: 'Initializing Core Systems...', delay: 0 },
  { text: 'Loading Intelligence Modules...', delay: 700 },
  { text: 'Establishing Data Pipelines...', delay: 1400 },
  { text: 'Calibrating Neural Networks...', delay: 2000 },
  { text: 'System Ready.', delay: 2600, accent: true },
];

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    BOOT_SEQUENCE.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        setProgress(((i + 1) / BOOT_SEQUENCE.length) * 100);
      }, line.delay);
    });

    setTimeout(onComplete, 3200);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black grid-bg"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Corner decorations */}
      <div className="absolute top-6 left-6 text-cyan-DEFAULT/30 text-[10px] font-mono tracking-widest">SYS.INIT</div>
      <div className="absolute top-6 right-6 text-cyan-DEFAULT/30 text-[10px] font-mono tracking-widest">v2.0.26</div>
      <div className="absolute bottom-6 left-6 text-cyan-DEFAULT/20 text-[10px] font-mono">NK_SYSTEMS</div>

      {/* Main boot terminal */}
      <div className="w-full max-w-lg px-8">
        {/* Header bar */}
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-cyan-DEFAULT/10">
          <div className="w-2 h-2 rounded-full bg-cyan-DEFAULT/60 animate-pulse" />
          <span className="text-cyan-DEFAULT/50 text-[10px] font-mono tracking-[0.25em] uppercase">System Bootstrap Terminal</span>
        </div>

        {/* Boot lines */}
        <div className="space-y-2 min-h-[130px]">
          {BOOT_SEQUENCE.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines.includes(i) && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`font-mono text-sm ${
                    line.accent
                      ? 'text-cyan-DEFAULT text-glow'
                      : 'text-white/40'
                  }`}
                >
                  <span className="text-cyan-DEFAULT/30 mr-2">&gt;</span>
                  {line.text}
                  {i === visibleLines[visibleLines.length - 1] && !line.accent && (
                    <span className="cursor-blink text-cyan-DEFAULT/60 ml-0.5">▊</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="flex justify-between text-[9px] font-mono text-white/20 mb-2">
            <span>LOADING MODULES</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-[1px] bg-white/5 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-cyan-DEFAULT/60"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-DEFAULT/20 to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
