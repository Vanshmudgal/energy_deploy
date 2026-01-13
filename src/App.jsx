import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ✅ Lazy load all page components
const LazyHome = lazy(() => import('./components/Home'));
const LazyAthletes = lazy(() => import('./components/Athletes'));
const LazyEvents = lazy(() => import('./components/Events')); // ✅ Added Events page

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ccff00] mx-auto mb-4"></div>
      <p className="text-[#ccff00] animate-pulse">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/athletes" element={<LazyAthletes />} />
          <Route path="/events" element={<LazyEvents />} /> {/* ✅ Added Events route */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;