import React, { useState } from 'react';
import Hero from './components/Hero';
import HorizontalAccordion from './components/HorizontalAccordion';
import CustomCursor from './components/CustomCursor';

function App() {
  const [useCustomCursor, setUseCustomCursor] = useState(true);

  return (
    <div className="relative w-full min-h-screen">
      <CustomCursor disabled={!useCustomCursor} />

      {/* Settings / Accessibility Toggles */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setUseCustomCursor(!useCustomCursor)}
          className="bg-stone/80 backdrop-blur-md text-text-main px-3 py-1.5 rounded-full text-xs md:text-sm shadow-sm hover:bg-cream transition-colors border border-text-main/10"
          aria-label="Toggle custom cursor"
        >
          {useCustomCursor ? 'Disable Cursor' : 'Enable Cursor'}
        </button>
      </div>

      <main>
        <Hero />
        <HorizontalAccordion />
      </main>

      {/* Basic Footer Scaffold */}
      <footer className="w-full bg-forest text-cream py-12 px-6 text-center">
        <p className="text-sm opacity-80 mb-2">Stăuini, Vințu de Jos, Alba</p>
        <p className="text-xs opacity-60">Fotografii: Livada Stăuini / Unsplash</p>
      </footer>
    </div>
  );
}

export default App;
