import React, { useState, useEffect } from 'react';

const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const totalScroll = documentHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', calculateScrollProgress);
    calculateScrollProgress(); // Calculate on mount

    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/50 z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-ocean-500 via-primary-500 to-secondary-500 shadow-lg transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      >
        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent to-white/30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ScrollProgressBar;

