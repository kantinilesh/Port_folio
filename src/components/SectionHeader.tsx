import { motion } from 'framer-motion';
import { useSoundController } from '../hooks/useSoundController';

interface SectionHeaderProps {
  world: string;
  title: string;
  subtitle?: string;
  accent?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function SectionHeader({ world, title, subtitle, accent = '#E52521' }: SectionHeaderProps) {
  const { playTransition } = useSoundController();

  return (
    <div className="mb-12 md:mb-16">
      <motion.div

        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.6, ease }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5" style={{ backgroundColor: accent }} />
          <div className="w-1.5 h-1.5 bg-mario-gold" />
          <div className="w-1.5 h-1.5 bg-mario-green" />
        </div>
        <span className="font-retro text-[8px] sm:text-[9px] tracking-[0.3em] text-white/30 uppercase">
          {world}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        onViewportEnter={() => playTransition()}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-white/40 text-sm sm:text-base max-w-xl font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
