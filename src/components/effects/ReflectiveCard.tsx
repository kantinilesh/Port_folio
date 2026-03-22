import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ReflectiveCardProps {
  title: string;
  artist: string;
  albumArt: string;
  subtitle?: string;
  className?: string;
}

export function ReflectiveCard({
  title,
  artist,
  albumArt,
  subtitle,
  className = '',
}: ReflectiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = (e.clientX - cx) / (rect.width / 2);
    const py = (e.clientY - cy) / (rect.height / 2);

    setRotate({ x: -py * 12, y: px * 12 });
    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div className={`perspective-[800px] ${className}`}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setRotate({ x: 0, y: 0 }); }}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative overflow-hidden border border-white/[0.08] bg-black/60 backdrop-blur-xl rounded-lg cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Album art */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={albumArt}
            alt={`${title} by ${artist}`}
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Reflective glare */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.12) 0%, transparent 50%)`,
              }}
            />
          )}

          {/* Holographic rainbow reflection */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
              style={{
                background: `linear-gradient(${45 + rotate.y * 3}deg,
                  rgba(255,0,0,0.15),
                  rgba(255,165,0,0.15),
                  rgba(255,255,0,0.15),
                  rgba(0,255,0,0.15),
                  rgba(0,212,255,0.15),
                  rgba(128,0,255,0.15))`,
              }}
            />
          )}
        </div>

        {/* Song info */}
        <div className="p-5 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full border border-cyan-DEFAULT/20 flex items-center justify-center">
              <span className="text-cyan-DEFAULT text-[8px]">▶</span>
            </div>
            <span className="text-white/15 text-[8px] font-mono tracking-widest">NOW PLAYING</span>
          </div>
          <h3 className="text-lg font-bold text-white/90 mb-0.5">{title}</h3>
          <p className="text-white/40 text-sm mb-1">{artist}</p>
          {subtitle && (
            <p className="text-cyan-DEFAULT/30 text-[9px] font-mono mt-2 tracking-wider">{subtitle}</p>
          )}
        </div>

        {/* Edge glow */}
        <div className="absolute inset-0 pointer-events-none border border-white/[0.04] rounded-lg" />
      </motion.div>
    </div>
  );
}
