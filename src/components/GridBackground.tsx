import { useEffect, useRef } from 'react';

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let columns = 0;
    const fontSize = 14;
    const drops: number[] = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=~[]{}|;:,.<>/?ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ'.split('');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops.length = columns;
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100; // start offscreen
      }
    };

    window.addEventListener('resize', resize);
    resize();

    let raf: number;
    let lastTime = 0;
    const fps = 30; // Chops the animation slightly for a terminal effect
    const interval = 1000 / fps;

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      
      const deltaTime = time - lastTime;
      if (deltaTime < interval) return;
      lastTime = time - (deltaTime % interval);

      // Translucent black creates the trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Randomly make some characters brighter/whiter (the leading character)
        if (Math.random() > 0.95) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        } else {
          // Cyan color to match the JARVIS theme but give it a hacker matrix vibe
          ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to the top randomly to create varied rain lengths
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };
    
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
}
