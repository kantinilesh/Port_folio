import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface GalleryItem {
  src: string;
  caption?: string;
}

interface ScrollFadeGalleryProps {
  items: GalleryItem[];
  className?: string;
}

function GalleryCard({ item, index, total }: { item: GalleryItem; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Stagger the cards — each fades in at a different point
  const fadeStart = index / total;
  const fadePeak = fadeStart + 0.2;
  const fadeEnd = fadePeak + 0.3;

  const opacity = useTransform(scrollYProgress, [0, fadePeak - 0.1, fadePeak, fadeEnd, 1], [0, 0, 1, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0, fadePeak, fadeEnd], [60, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, fadePeak, fadeEnd], [0.92, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="group overflow-hidden border border-white/[0.04] bg-black/40 backdrop-blur-sm
        hover:border-cyan-DEFAULT/15 transition-all duration-500"
    >
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={item.src}
          alt={item.caption || `Photo ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      {item.caption && (
        <div className="px-3 py-2 border-t border-white/[0.04]">
          <span className="text-white/20 text-[9px] font-mono tracking-wider">{item.caption}</span>
        </div>
      )}
    </motion.div>
  );
}

export function ScrollFadeGallery({ items, className = '' }: ScrollFadeGalleryProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {items.map((item, i) => (
        <GalleryCard key={i} item={item} index={i} total={items.length} />
      ))}
    </div>
  );
}
