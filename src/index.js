import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/App.css';
import App from './App'; // Updated path to App.js
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
