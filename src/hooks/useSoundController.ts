import { useEffect, useRef, useState } from 'react';

// Generates a very short, low-volume "coin" synth sound
function playCoinSound(audioCtx: AudioContext) {
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(987.77, audioCtx.currentTime); // B5
  osc.frequency.exponentialRampToValueAtTime(1318.51, audioCtx.currentTime + 0.1); // E6

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.16);
}

// Generates a subtle "level up" transition sound
function playLevelSound(audioCtx: AudioContext) {
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc1.type = 'triangle';
  osc2.type = 'sine';
  
  // Power-up arpeggio
  const t = audioCtx.currentTime;
  osc1.frequency.setValueAtTime(329.63, t); // E4
  osc1.frequency.setValueAtTime(415.30, t + 0.05); // G#4
  osc1.frequency.setValueAtTime(523.25, t + 0.1); // C5
  
  osc2.frequency.setValueAtTime(329.63, t);
  osc2.frequency.setValueAtTime(415.30, t + 0.05);
  osc2.frequency.setValueAtTime(523.25, t + 0.1);

  gainNode.gain.setValueAtTime(0, t);
  gainNode.gain.linearRampToValueAtTime(0.06, t + 0.05);
  gainNode.gain.linearRampToValueAtTime(0, t + 0.25);

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc1.start(t);
  osc2.start(t);
  osc1.stop(t + 0.3);
  osc2.stop(t + 0.3);
}

export function useSoundController() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Initialize audio context only on user interaction to comply with autoplay policies
  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, []);

  const playHover = () => {
    if (isMuted || !audioCtxRef.current) return;
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    playCoinSound(audioCtxRef.current);
  };

  const playTransition = () => {
    if (isMuted || !audioCtxRef.current) return;
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    playLevelSound(audioCtxRef.current);
  };

  return { isMuted, setIsMuted, playHover, playTransition };
}
