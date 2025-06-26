import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { BusListingPage } from './pages/BusListingPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { AuthModal } from './components/AuthModal';
import { BookingProvider } from './context/BookingContext';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <BookingProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Routes>
            <Route path="/" element={<HomePage onShowAuth={() => setShowAuthModal(true)} />} />
            <Route path="/buses" element={<BusListingPage onShowAuth={() => setShowAuthModal(true)} />} />
            <Route path="/seats/:busId" element={<SeatSelectionPage onShowAuth={() => setShowAuthModal(true)} />} />
          </Routes>
          {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;