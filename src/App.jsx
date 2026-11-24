import React, { Suspense, lazy } from 'react';
import Hero from './components/Hero';
import AboutStory from './components/AboutStory';
import FruitSeasonGrid from './components/FruitSeasonGrid';
import BookingContact from './components/BookingContact';

const HorizontalAccordion = lazy(() => import('./components/HorizontalAccordion'));
const MediaReviews = lazy(() => import('./components/MediaReviews'));

function App() {
  return (
    <div className="relative w-full min-h-screen">
      <main>
        <Hero />
        <AboutStory />
        <FruitSeasonGrid />
        <Suspense fallback={<div className="w-full py-10 md:py-16 bg-stone min-h-[380px] md:min-h-[540px]" aria-hidden="true" />}>
          <HorizontalAccordion />
        </Suspense>
        <Suspense fallback={<div className="w-full py-16 md:py-24 bg-cream min-h-[320px]" aria-hidden="true" />}>
          <MediaReviews />
        </Suspense>
        <BookingContact />
      </main>

      {/* Footer */}
      <footer className="w-full bg-forest text-cream py-10 sm:py-12 px-6 flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl font-heading font-bold mb-1">Livada Stăuini</h2>
        <p className="text-sm opacity-90 max-w-sm">
          Stăuini, Vințu de Jos, Alba<br />
          Cod Poștal 517875, România
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <a href="#" className="py-1 px-2 hover:text-terracotta transition-colors">Instagram</a>
          <span className="opacity-30 py-1">|</span>
          <a href="#" className="py-1 px-2 hover:text-terracotta transition-colors">Facebook</a>
          <span className="opacity-30 py-1">|</span>
          <a href="#" className="py-1 px-2 hover:text-terracotta transition-colors">YouTube</a>
        </div>

        <p className="text-xs opacity-70 mt-6">
          Fotografii: Livada Stăuini / Unsplash<br />
          &copy; {new Date().getFullYear()} Livada Stăuini. Toate drepturile rezervate.
        </p>
      </footer>
    </div>
  );
}

export default App;
