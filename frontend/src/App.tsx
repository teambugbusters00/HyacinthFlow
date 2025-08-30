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
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / totalHeight, 1);
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentActiveSection = 'home';
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentActiveSection = section.id;
        }
      });
      
      setActiveSection(currentActiveSection);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial call to set correct values
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-amber-50 overflow-x-hidden">
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