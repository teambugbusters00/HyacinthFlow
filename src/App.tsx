import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { FloatingTree } from './components/FloatingTree';
import { BackgroundTree } from './components/BackgroundTree';
import { HomePage } from './pages/HomePage';
import { FarmerRegistration } from './pages/FarmerRegistration';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { GetStarted } from './pages/GetStarted';
import { ProductDetails } from './pages/ProductDetails';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(Math.min(progress, 1));

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'farmer', 'marketplace', 'rewards', 'impact', 'contact'];
      const currentSection = Math.floor(progress * sections.length);
      setActiveSection(sections[Math.min(currentSection, sections.length - 1)]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-emerald-50 overflow-x-hidden">
        <BackgroundTree mousePosition={mousePosition} scrollProgress={scrollProgress} />
        <Header activeSection={activeSection} />
        <FloatingTree progress={scrollProgress} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/farmer-registration" element={<FarmerRegistration />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;