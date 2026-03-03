import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import Landing from './pages/Landing.js';
import App from './App.js';

hydrateRoot(
    document.getElementById('root'),
    <App />
);