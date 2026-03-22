import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollScatterItem {
  src: string;
  alt: string;
  caption?: string;
}

interface ScrollScatterProps {
  items: ScrollScatterItem[];
  className?: string;
}

// Each card gets unique scatter transforms for a natural stacked → scattered feel
const SCATTER_CONFIGS = [
  { x: [-20, -280], y: [30, -120], rotate: [-2, -12], scale: [0.92, 1] },
  { x: [10, 60],    y: [20, -80],  rotate: [1, 6],    scale: [0.94, 1] },
  { x: [-10, -120], y: [40, 160],  rotate: [3, -8],   scale: [0.90, 1] },
  { x: [15, 310],   y: [25, -40],  rotate: [-1, 14],  scale: [0.93, 1] },
  { x: [5, 180],    y: [35, 180],  rotate: [2, -10],  scale: [0.91, 1] },
  { x: [-5, -200],  y: [20, 40],   rotate: [-3, 8],   scale: [0.95, 1] },
];

function ScatterCard({
  item,
  index,
  scrollYProgress,
}: {
  item: ScrollScatterItem;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const cfg = SCATTER_CONFIGS[index % SCATTER_CONFIGS.length];

  const x = useTransform(scrollYProgress, [0, 1], cfg.x);
  const y = useTransform(scrollYProgress, [0, 1], cfg.y);
  const rotate = useTransform(scrollYProgress, [0, 1], cfg.rotate);
  const scale = useTransform(scrollYProgress, [0, 1], cfg.scale);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.6]);

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity }}
      className="absolute w-48 sm:w-56 md:w-64 group cursor-pointer"
    >
      <div className="overflow-hidden border border-white/[0.06] bg-black/40 backdrop-blur-sm
        hover:border-cyan-DEFAULT/20 transition-all duration-500 shadow-2xl shadow-black/50">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {item.caption && (
          <div className="px-3 py-2 border-t border-white/[0.04]">
            <span className="text-white/25 text-[9px] font-mono tracking-wider">{item.caption}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function ScrollScatter({ items, className = '' }: ScrollScatterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: '70vh' }}>
      <div className="sticky top-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="relative w-full max-w-3xl h-[400px]">
          {items.map((item, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${20 + (i % 3) * 25}%`,
                top: `${10 + Math.floor(i / 3) * 40}%`,
                zIndex: items.length - i,
              }}
            >
              <ScatterCard item={item} index={i} scrollYProgress={scrollYProgress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
