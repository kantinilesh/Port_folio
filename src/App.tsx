import { useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';

import { Loader } from './components/Loader';
import { Scene } from './components/Scene';

import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { useSoundController } from './hooks/useSoundController';

function App() {
  const [loading, setLoading] = useState(true);
  const { isMuted, setIsMuted } = useSoundController();

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden relative selection:bg-mario-red/30">
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Sound Toggle UI */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-black/50 border border-white/10 backdrop-blur-md rounded-full text-white/50 hover:text-white transition-colors"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
          >
            <Suspense fallback={null}>
              <ScrollControls pages={7} damping={0.25} maxSpeed={0.5}>
                {/* 3D World */}
                <Scene />

                {/* DOM Overlay */}
                <Scroll html style={{ width: '100%' }}>
                  <div className="flex flex-col w-full">
                    {/* Page 1 */}
                    <Hero />
                    {/* Page 2 */}
                    <About />
                    {/* Page 3 */}
                    <Skills />
                    {/* Page 4 */}
                    <Experience />
                    {/* Page 5 */}
                    <Projects />
                    {/* Page 6 */}
                    <Achievements />
                    {/* Page 7 */}
                    <Contact />
                  </div>
                </Scroll>
              </ScrollControls>
            </Suspense>
          </Canvas>
        </>
      )}
    </div>
  );
}

export default App;
