import { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  scrambleChars?: string;
  trigger?: 'hover' | 'view' | 'mount';
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

export function ScrambleText({
  text,
  className = '',
  speed = 35,
  scrambleChars = DEFAULT_CHARS,
  trigger = 'view',
}: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(trigger === 'mount' ? '' : text);
  const ref = useRef<HTMLSpanElement>(null);
  const hasTriggered = useRef(false);
  const isRunning = useRef(false);

  const scramble = () => {
    if (isRunning.current) return;
    isRunning.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );

      iteration += 0.5;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayed(text);
        isRunning.current = false;
      }
    }, speed);
  };

  // Mount trigger — run once
  useEffect(() => {
    if (trigger === 'mount' && !hasTriggered.current) {
      hasTriggered.current = true;
      scramble();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // View trigger — intersection observer
  useEffect(() => {
    if (trigger !== 'view') return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          scramble();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      ref={ref}
      className={`${className} cursor-default`}
      onMouseEnter={trigger === 'hover' ? () => scramble() : undefined}
    >
      {displayed}
    </span>
  );
}
