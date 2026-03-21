import { useRef, useState, useEffect, type MouseEvent } from 'react';
import { motion, useInView } from 'framer-motion';

interface FloatingTagsProps {
  tags: string[];
}

interface TagState {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function FloatingTags({ tags }: FloatingTagsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [items, setItems] = useState<TagState[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef<number>(0);

  // Initialize tag positions
  useEffect(() => {
    if (!isInView) return;
    const initial = tags.map((text, i) => ({
      text,
      x: (i % 6) * 140 + Math.random() * 40,
      y: Math.floor(i / 6) * 60 + Math.random() * 30,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
    setItems(initial);
  }, [tags, isInView]);

  // Animation loop
  useEffect(() => {
    if (items.length === 0) return;

    const tick = () => {
      setItems(prev => prev.map(tag => {
        let { x, y, vx, vy } = tag;

        // Mouse repulsion
        if (mouseRef.current.active) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120 * 0.8;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }
        }

        // Damping
        vx *= 0.97;
        vy *= 0.97;

        // Boundary bounce
        const maxW = 800;
        const maxH = 200;
        if (x < 0 || x > maxW) vx *= -0.5;
        if (y < 0 || y > maxH) vy *= -0.5;

        x = Math.max(0, Math.min(maxW, x + vx));
        y = Math.max(0, Math.min(maxH, y + vy));

        return { ...tag, x, y, vx, vy };
      }));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items.length]);

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={() => { mouseRef.current.active = false; }}
      className="relative w-full h-[260px] overflow-hidden"
    >
      {items.map((tag, i) => (
        <motion.span
          key={tag.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.03, duration: 0.4 }}
          className="absolute px-3 py-1.5 text-xs font-mono text-white/40 border border-white/[0.06] bg-surface/80 backdrop-blur-sm hover:text-white/70 hover:border-accent/20 transition-colors duration-300 cursor-default select-none whitespace-nowrap"
          style={{
            left: tag.x,
            top: tag.y,
            transition: 'left 0.05s linear, top 0.05s linear',
          }}
        >
          {tag.text}
        </motion.span>
      ))}
    </div>
  );
}
