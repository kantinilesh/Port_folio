import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Loader } from './components/Loader';
import { GridBackground } from './components/GridBackground';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { CoreSystem } from './components/CoreSystem';
import { DataEngine } from './components/DataEngine';
import { DeploymentLogs } from './components/DeploymentLogs';
import { Simulations } from './components/Simulations';
import { SystemStatus } from './components/SystemStatus';
import { Terminal } from './components/Terminal';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden scanline">
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Animated node background */}
          <GridBackground />

          {/* Grid CSS background */}
          <div className="fixed inset-0 grid-bg pointer-events-none z-0" />

          {/* Navigation */}
          <Nav activeSection="hero" />

          {/* Sections */}
          <main className="relative z-10">
            <Hero />
            <CoreSystem />
            <DataEngine />
            <DeploymentLogs />
            <Simulations />
            <SystemStatus />
            <Terminal />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
