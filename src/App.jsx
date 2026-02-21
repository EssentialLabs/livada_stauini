import React, { useState } from 'react';
import Hero from './components/Hero';
import HorizontalAccordion from './components/HorizontalAccordion';
import CustomCursor from './components/CustomCursor';
import FruitSeasonGrid from './components/FruitSeasonGrid';
import AboutStory from './components/AboutStory';
import MediaReviews from './components/MediaReviews';
import BookingContact from './components/BookingContact';

function App() {
  const [useCustomCursor, setUseCustomCursor] = useState(true);

  return (
    <div className="relative w-full min-h-screen">
      <CustomCursor disabled={false} />

      <main>
        <Hero />
        <AboutStory />
        <FruitSeasonGrid />
        <HorizontalAccordion />
        <MediaReviews />
        <BookingContact />
      </main>

      {/* Basic Footer Scaffold */}
      <footer className="w-full bg-forest text-cream py-12 px-6 flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl font-heading font-bold mb-2">Livada Stăuini</h2>
        <p className="text-sm opacity-90 max-w-sm">
          Stăuini, Vințu de Jos, Alba<br />
          Cod Poștal 517875, România
        </p>

        <div className="flex gap-4 mt-4">
          <a href="#" className="hover:text-terracotta transition-colors">Instagram</a>
          <span className="opacity-30">|</span>
          <a href="#" className="hover:text-terracotta transition-colors">Facebook</a>
          <span className="opacity-30">|</span>
          <a href="#" className="hover:text-terracotta transition-colors">YouTube</a>
        </div>

        <p className="text-xs opacity-60 mt-8">
          Fotografii: Livada Stăuini / Unsplash<br />
          &copy; {new Date().getFullYear()} Livada Stăuini. Toate drepturile rezervate.
        </p>
      </footer>
    </div>
  );
}

export default App;
