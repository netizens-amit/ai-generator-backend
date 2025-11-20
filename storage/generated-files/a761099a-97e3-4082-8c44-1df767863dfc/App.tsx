import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="App">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <Services />
      <Security />
      <ProductComparison />
      <Testimonials />
      <Calculators />
      <Resources />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
