import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollFloatProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down';
  offset?: number;
}

export function ScrollFloat({
  children,
  className = '',
  direction = 'up',
  offset = 60,
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === 'up' ? [offset, 0, -offset] : [-offset, 0, offset]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
