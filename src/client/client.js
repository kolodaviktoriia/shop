import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RoutesRender } from './routes/RoutesRender.js';

hydrateRoot(
    document.getElementById('root'),
    <BrowserRouter>
        <RoutesRender />
    </BrowserRouter>
);