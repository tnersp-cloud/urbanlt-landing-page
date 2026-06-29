import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SharedCore from './components/SharedCore';
import BentoEcosystem from './components/BentoEcosystem';
import MarketData from './components/MarketData';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans noise-overlay">
      <Header />
      <main className="flex-grow">
        <Hero />
        <SharedCore />
        <BentoEcosystem />
        <MarketData />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
