import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import FeaturedProducts from './FeaturedProducts';
import Categories from './Categories';
import SpecialOffers from './SpecialOffers';
import BestSellers from './BestSellers';
import CustomerReviews from './CustomerReviews';
import Newsletter from './Newsletter';
import Footer from './Footer';
import { Product } from './types';
import './App.module.css';

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('price');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from API or static data
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price >= minPrice &&
        product.price <= maxPrice,
    );

    switch (sortBy) {
      case 'price':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'popularity':
        filtered = filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy, minPrice, maxPrice]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="App">
      <Header cart={cart} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Hero />
      <FeaturedProducts products={filteredProducts} handleAddToCart={handleAddToCart} />
      <Categories />
      <SpecialOffers />
      <BestSellers products={filteredProducts} handleAddToCart={handleAddToCart} />
      <CustomerReviews />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default App;
