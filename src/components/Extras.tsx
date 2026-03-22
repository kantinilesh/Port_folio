import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PanelHeader } from './CoreSystem';
import { ReflectiveCard } from './effects/ReflectiveCard';
import { ScrollFadeGallery } from './effects/ScrollFadeGallery';
import { ScrollFloat } from './effects/ScrollFloat';
import { MagicBento } from './effects/MagicBento';
import { ScrambleText } from './effects/ScrambleText';

// 12 gallery items
const GALLERY_ITEMS = [
  { src: 'https://picsum.photos/seed/nk01/600/400', caption: 'HACKATHON_2024' },
  { src: 'https://picsum.photos/seed/nk02/600/400', caption: 'CODE_SESSION' },
  { src: 'https://picsum.photos/seed/nk03/600/400', caption: 'TEAM_COLLAB' },
  { src: 'https://picsum.photos/seed/nk04/600/400', caption: 'DEEP_WORK' },
  { src: 'https://picsum.photos/seed/nk05/600/400', caption: 'WORKSHOP' },
  { src: 'https://picsum.photos/seed/nk06/600/400', caption: 'DEPLOY_DAY' },
  { src: 'https://picsum.photos/seed/nk07/600/400', caption: 'BRAINSTORM' },
  { src: 'https://picsum.photos/seed/nk08/600/400', caption: 'LAUNCH_PREP' },
  { src: 'https://picsum.photos/seed/nk09/600/400', caption: 'RETROSPECTIVE' },
  { src: 'https://picsum.photos/seed/nk10/600/400', caption: 'CLOUD_INFRA' },
  { src: 'https://picsum.photos/seed/nk11/600/400', caption: 'DATA_VIZ' },
  { src: 'https://picsum.photos/seed/nk12/600/400', caption: 'DEMO_DAY' },
];

export function Extras() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/iris.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.onended = () => setIsPlaying(false);
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section id="extras" className="relative w-full px-6 py-28">
      <div className="max-w-5xl w-full mx-auto">
        <PanelHeader code="MODULE_07 / PERSONAL" title="Beyond Code" />

        <ScrollFloat offset={30}>
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Reflective Card — Iris with music player */}
            <div>
              <p className="text-white/15 text-[9px] font-mono tracking-widest mb-4">FAVOURITE_TRACK</p>

              {/* Clickable music player */}
              <div onClick={togglePlay} className="cursor-pointer">
                <ReflectiveCard
                  title="Iris"
                  artist="Disclosure"
                  albumArt="/iris-album.png"
                  subtitle={isPlaying ? '▶ PLAYING — CLICK TO PAUSE' : '// CLICK TO PLAY'}
                />
              </div>

              {/* Audio visualizer bar */}
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 glass p-3 flex items-center gap-3"
                >
                  <div className="flex items-center gap-[3px]">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[3px] bg-cyan-DEFAULT/60 rounded-full"
                        animate={{
                          height: [4, 12 + Math.random() * 12, 4],
                        }}
                        transition={{
                          duration: 0.5 + Math.random() * 0.4,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-cyan-DEFAULT/40 text-[8px] font-mono tracking-widest">IRIS — DISCLOSURE</span>
                </motion.div>
              )}
            </div>

            {/* Personal facts bento */}
            <div className="space-y-4">
              <p className="text-white/15 text-[9px] font-mono tracking-widest mb-4">QUICK_ACCESS</p>

              <MagicBento className="p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎧</span>
                  <div>
                    <p className="text-white/50 text-xs font-mono">CURRENT MOOD</p>
                    <p className="text-cyan-DEFAULT/70 text-sm font-mono">
                      <ScrambleText text="Coding + Music = Flow State" trigger="view" speed={30} />
                    </p>
                  </div>
                </div>
              </MagicBento>

              <MagicBento className="p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="text-white/50 text-xs font-mono">PHILOSOPHY</p>
                    <p className="text-cyan-DEFAULT/70 text-sm font-mono">
                      <ScrambleText text="Ship fast, learn faster." trigger="view" speed={30} />
                    </p>
                  </div>
                </div>
              </MagicBento>

              <MagicBento className="p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <p className="text-white/50 text-xs font-mono">TIMEZONE</p>
                    <p className="text-cyan-DEFAULT/70 text-sm font-mono">
                      <ScrambleText text="IST (UTC +5:30) — Always Online" trigger="view" speed={30} />
                    </p>
                  </div>
                </div>
              </MagicBento>

              <MagicBento className="p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="text-white/50 text-xs font-mono">FOCUS</p>
                    <p className="text-cyan-DEFAULT/70 text-sm font-mono">
                      <ScrambleText text="AI × Systems × Impact" trigger="view" speed={30} />
                    </p>
                  </div>
                </div>
              </MagicBento>
            </div>
          </div>
        </ScrollFloat>

        {/* Gallery — ScrollFadeGallery with 12 images */}
        <div className="mt-12">
          <p className="text-white/15 text-[9px] font-mono tracking-widest mb-6 text-center">MEMORY_FRAGMENTS</p>
          <ScrollFadeGallery items={GALLERY_ITEMS} />
        </div>
      </div>
    </section>
  );
}
