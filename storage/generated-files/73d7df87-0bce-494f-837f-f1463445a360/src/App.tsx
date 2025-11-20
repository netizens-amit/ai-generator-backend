import React from 'react';
// Main App.tsx
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Security from './components/Security';
import ProductComparison from './components/ProductComparison';
import Testimonials from './components/Testimonials';
import Calculators from './components/Calculators';
import Resources from './components/Resources';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Services />
        <Security />
        <ProductComparison />
        <Testimonials />
        <Calculators />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
