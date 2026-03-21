import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplitFlapProps {
  text: string;
  className?: string;
  delay?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';

export function SplitFlap({ text, className = '', delay = 0 }: SplitFlapProps) {
  const [displayed, setDisplayed] = useState<string[]>(Array(text.length).fill(' '));
  const [done, setDone] = useState(false);

  useEffect(() => {
    const target = text.toUpperCase().split('');
    const current = Array(text.length).fill(' ');
    const intervals: ReturnType<typeof setInterval>[] = [];

    target.forEach((char, i) => {
      let tick = 0;
      const totalTicks = 4 + Math.floor(Math.random() * 6); // 4-10 flips per char

      const interval = setInterval(() => {
        tick++;
        if (tick >= totalTicks) {
          current[i] = char;
          setDisplayed([...current]);
          clearInterval(interval);
          if (current.join('') === target.join('')) setDone(true);
        } else {
          current[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          setDisplayed([...current]);
        }
      }, 50 + Math.random() * 30);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className={`flex flex-wrap justify-center gap-[2px] ${className}`}
    >
      {displayed.map((char, i) => (
        <span
          key={i}
          className={`inline-block font-display tracking-tight transition-all duration-100 ${
            done ? 'text-white' : 'text-white/60'
          }`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </motion.div>
  );
}
