import { useRef } from 'react';

interface LogoItem {
  name: string;
  icon: string;
}

interface LogoLoopProps {
  items: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export function LogoLoop({ items, speed = 40, direction = 'left', className = '' }: LogoLoopProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  // Use RAF for smooth animation
  const animate = () => {
    const innerEl = innerRef.current;
    if (!innerEl) return;

    const halfWidth = innerEl.scrollWidth / 2;
    offsetRef.current += (direction === 'left' ? -1 : 1) * (speed / 60);

    if (direction === 'left' && Math.abs(offsetRef.current) >= halfWidth) {
      offsetRef.current = 0;
    } else if (direction === 'right' && offsetRef.current >= halfWidth) {
      offsetRef.current = 0;
    }

    innerEl.style.transform = `translateX(${offsetRef.current}px)`;
    requestAnimationFrame(animate);
  };

  // Start animation on mount
  const started = useRef(false);
  if (!started.current) {
    started.current = true;
    if (typeof window !== 'undefined') {
      requestAnimationFrame(animate);
    }
  }

  // Duplicate for seamless loop
  const loopItems = [...items, ...items];

  return (
    <div ref={scrollRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="flex items-center gap-8 whitespace-nowrap will-change-transform">
        {loopItems.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center
              border border-white/[0.04] bg-white/[0.01] hover:border-cyan-DEFAULT/20 hover:bg-cyan-DEFAULT/[0.03]
              transition-all duration-500 group"
            title={item.name}
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-6 h-6 opacity-35 group-hover:opacity-80 transition-opacity duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// SVG-only tech logos (no names displayed)
export const TECH_LOGOS: LogoItem[] = [
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/white' },
  { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/white' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/white' },
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonwebservices/white' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/white' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'Flask', icon: 'https://cdn.simpleicons.org/flask/white' },
  { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow/white' },
  { name: 'Spring', icon: 'https://cdn.simpleicons.org/spring/white' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/white' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/white' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/white' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/white' },
  { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/white' },
  { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/white' },
];
