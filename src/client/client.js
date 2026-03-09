import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RoutesRender } from './routes/RoutesRender.js';
import { productsReducer } from './slices/productsSlice.js';
import { cartReducer } from './slices/cartSlice.js';
import { userReducer } from './slices/userSlice.js';
import { ordersReducer } from './slices/ordersSlice.js';

import './styles/global.scss';

const store = configureStore({ reducer: { products: productsReducer, cart: cartReducer, user: userReducer, orders: ordersReducer }, preloadedState: window.INITIAL_STATE, })
hydrateRoot(
    document.getElementById('root'),
    <Provider store={store}>
        <BrowserRouter>
            <RoutesRender />
        </BrowserRouter>
    </Provider>
);