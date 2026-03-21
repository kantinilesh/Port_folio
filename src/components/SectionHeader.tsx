import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  title: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function SectionHeader({ number, title }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="mb-16 md:mb-20">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        className="flex items-center gap-4 mb-6"
      >
        <span className="text-accent/35 text-[10px] font-mono tracking-[0.2em]">
          {number}
        </span>
        <div className="w-12 h-[1px] bg-white/[0.06]" />
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white/95 leading-[1.1]"
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
