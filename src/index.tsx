import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactGA from 'react-ga4';

// Google Analytics Measurement ID
const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || "G-73Q74LPY26";

// Initialize Google Analytics
if (MEASUREMENT_ID && process.env.NODE_ENV === 'production') {
  ReactGA.initialize(MEASUREMENT_ID, {
    gaOptions: {
      siteSpeedSampleRate: 100, // Track all page load times
    },
  });
  console.log('Google Analytics initialized:', MEASUREMENT_ID);
} else if (process.env.NODE_ENV === 'development') {
  console.log('Google Analytics (Development Mode):', MEASUREMENT_ID);
  // Development'ta da initialize et ama debug mode'da
  ReactGA.initialize(MEASUREMENT_ID, {
    gaOptions: {
      debug_mode: true,
    },
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
