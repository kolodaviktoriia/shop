import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RoutesRender } from './routes/RoutesRender.js';
import { productsReducer } from './slices/productsSlices.js';

const store = configureStore({ reducer: { products: productsReducer }, preloadedState: window.INITIAL_STATE, })
hydrateRoot(
    document.getElementById('root'),
    <Provider store={store}>
        <BrowserRouter>
            <RoutesRender />
        </BrowserRouter>
    </Provider>
);